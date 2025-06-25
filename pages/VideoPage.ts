import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../base/BasePage';
import { VideoPageSelectors } from '../constants/VideoPageSelectors';
import { TestData } from '../data/TestData';
import { HomePage } from './HomePage';
import { AssertHelper } from '../utils/AssertHelper';

export class Video {
    private readonly page: Page;
    private readonly basePage: BasePage;
    private readonly homepage: HomePage;
    private readonly assert:AssertHelper;

    private readonly thumbsUp: Locator;
    private readonly heartUp: Locator;
    private readonly commentting: Locator;
    private readonly buttonLocator: Locator;
    private readonly playvideo: Locator;
    private readonly videohyperlink: Locator;
    private readonly likeCountLocator: Locator;

    constructor(page: Page) {

        this.page = page;
        this.basePage = new BasePage(page);
        this.homepage = new HomePage(page);
        this.assert =  new AssertHelper(page);
        this.thumbsUp = page.locator(VideoPageSelectors.ThumbsUpButton);
        this.heartUp = page.locator(VideoPageSelectors.HeartUpButton);
        this.commentting = page.locator(VideoPageSelectors.comment).nth(1);
        this.buttonLocator = page.locator(VideoPageSelectors.Comment_Button);
        this.playvideo = page.locator(VideoPageSelectors.Play_Video);
        this.videohyperlink = page.locator(VideoPageSelectors.Video_Hyper);
        this.likeCountLocator = page.locator(VideoPageSelectors.Like_Count_After);
    }

    async clickPlaybackByMashupId(mashupId: string, title: string): Promise<void> {
        await this.homepage.Search(title);
        const container = this.page.locator(VideoPageSelectors.Click_Video(mashupId));
        const anchor = container.locator(this.videohyperlink);
        await this.basePage.clickElement(anchor, `Clicking on video with mashupId ${mashupId}`);
    }


    // async IsVideoHeadingVisible(titlePart: string): Promise<Boolean> {
    //     const video = Selectors.Video_Page.Video_Heading(titlePart);
    //     const locator = this.page.locator(video);
    //     return await this.isElementVisible(locator);
    // }

    async likevideo(): Promise<[Locator, number]> {
        await this.basePage.clickElement(this.thumbsUp, 'Liking the video');
        const countStr = await this.likeCountLocator.getAttribute('data-count') || '0';
        const count = Number(countStr);
        return [this.likeCountLocator, count];
    }

    async Favoritevideo(): Promise<Locator> {
        await this.basePage.clickElement(this.heartUp, 'Favorite the video');
        return this.page.locator(VideoPageSelectors.HeartUpButton);
    }

    async CommentingOnVideo(comment: string , mashupId: string, title: string): Promise<void> {
        await this.clickPlaybackByMashupId(mashupId,title);
        await this.basePage.fillInput(this.commentting, comment, "Writing the comment");
        await this.basePage.clickElement(this.buttonLocator, 'Commenting on the video');
        await this.page.reload();
        await this.assert.toHaveTitle(TestData.Video.Video_Page_Title(title));
    }

    async SearchComment_VisibleAndEdit(oldComment: string, newComment: string, mashupId: string, title: string): Promise<void> {
        await this.CommentingOnVideo(oldComment, mashupId, title);

        const allCommentContainers = this.page.locator('div.media-body');
        const count = await allCommentContainers.count();

        let targetCommentRow: Locator | null = null;

        for (let i = 0; i < count; i++) {
            const container = allCommentContainers.nth(i);
            const commentTextLocator = container.locator('[data-e2e-span="comment"]');

            if (await commentTextLocator.count() === 0) continue;
            if (!(await commentTextLocator.isVisible())) continue;

            const text = await commentTextLocator.textContent();
            if (text?.trim() === oldComment.trim()) {
                targetCommentRow = container;
                break;
            }
        }

        if (!targetCommentRow) {
            throw new Error(`Comment with text "${oldComment}" not found`);
        }

        await targetCommentRow.scrollIntoViewIfNeeded();
        await targetCommentRow.hover();
        await this.page.waitForTimeout(300);

        const editButton = targetCommentRow.locator('[data-e2e-link="editComment"]');
        await editButton.click({ force: true });

        const textarea = targetCommentRow.locator(VideoPageSelectors.comment);
        await textarea.fill(newComment);

        const newCommentBlock = this.page.locator(`div[data-e2e-div="${newComment}"]`);
        const updateButton = newCommentBlock.locator('button[data-e2e-btn="Update"]');
        await updateButton.click();

        this.basePage.logger.info(`Comment updated from "${oldComment}" to "${newComment}".`);
    }


    // async SearchComment_VisibleAndDelete(oldComment: string): Promise<void> {
    //     const allCommentContainers = this.page.locator('div.media-body');
    //     const count = await allCommentContainers.count();

    //     let targetCommentRow: Locator | null = null;

    //     for (let i = 0; i < count; i++) {
    //         const container = allCommentContainers.nth(i);
    //         const commentTextLocator = container.locator('[data-e2e-span="comment"]');

    //         if (await commentTextLocator.count() === 0) continue;
    //         if (!(await commentTextLocator.isVisible())) continue;

    //         const text = await commentTextLocator.textContent();
    //         if (text?.trim() === oldComment.trim()) {
    //             targetCommentRow = container;
    //             break;
    //         }
    //     }


    //     if (!targetCommentRow) {
    //         throw new Error(`Comment with text "${oldComment}" not found`);
    //     }

    //     await targetCommentRow.scrollIntoViewIfNeeded();
    //     await targetCommentRow.hover();

    //     // Optional: wait a little to let visibility CSS take effect
    //     await this.page.waitForTimeout(500); // adjust if needed

    //     const deleteButton = targetCommentRow.locator('[data-e2e-link="deleteComment"]');

    //     // Try clicking even if visibility check fails by using force as a fallback
    //     if (await deleteButton.isVisible()) {
    //         await deleteButton.click();
    //     } else {
    //         this.logger.warn('Delete button not visibly rendered; attempting force click.');
    //         await deleteButton.click({ force: true });
    //     }

    //     // Final verification: ensure comment is gone
    //     const deletedCommentLocator = this.page.locator(Selectors.Video_Page.Comment_Text(oldComment));
    //     await expect(deletedCommentLocator).toHaveCount(0);

    //     this.logger.info(`Comment "${oldComment}" deleted successfully.`);
    // }

    async SearchComment_VisibleAndDelete(oldComment: string, mashupId: string, title: string): Promise<void> {
        await this.CommentingOnVideo(oldComment, mashupId, title);
        const allCommentContainers = this.page.locator('div.media-body');
        const count = await allCommentContainers.count();

        let targetCommentRow: Locator | null = null;

        for (let i = 0; i < count; i++) {
            const container = allCommentContainers.nth(i);
            const commentTextLocator = container.locator('[data-e2e-span="comment"]');

            if (await commentTextLocator.count() === 0) continue;
            if (!(await commentTextLocator.isVisible())) continue;

            const text = await commentTextLocator.textContent();
            if (text?.trim() === oldComment.trim()) {
                targetCommentRow = container;
                break;
            }
        }

        if (!targetCommentRow) {
            throw new Error(`Comment with text "${oldComment}" not found`);
        }

        await targetCommentRow.scrollIntoViewIfNeeded();
        await targetCommentRow.hover();
        await this.page.waitForTimeout(500);

        const deleteButton = targetCommentRow.locator('[data-e2e-link="deleteComment"]');
        await deleteButton.click({ force: true });

        this.basePage.logger.info(`Comment "${oldComment}" deleted.`);
    }

    async playVideo(): Promise<void> {
        await this.basePage.clickElement(this.playvideo, 'Clicking play button');
        await this.page.waitForTimeout(1000);
    }


}