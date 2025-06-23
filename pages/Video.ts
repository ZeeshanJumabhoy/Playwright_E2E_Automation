import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base/BasePage';
import { Selectors } from '../constants/Selectors';
import { TestData } from '../data/TestData';

export class Video extends BasePage {

    private readonly thumbsUp: Locator;
    private readonly heartUp: Locator;
    private readonly commentting: Locator;
    private readonly buttonLocator: Locator;
    private readonly playvideo: Locator;

    constructor(page: Page) {
        super(page);
        this.thumbsUp = page.locator(Selectors.Video_Page.ThumbsUpButton);
        this.heartUp = page.locator(Selectors.Video_Page.HeartUpButton);
        this.commentting = page.locator(Selectors.Video_Page.comment).nth(1);
        this.buttonLocator = page.locator(Selectors.Video_Page.Comment_Button);
        this.playvideo = page.locator(Selectors.Video_Page.Play_Video);
    }

    async clickVideo(titlePart: string, index: number = 0): Promise<void> {
        const locatorStr = Selectors.Main_PAGE.Video_Link(titlePart);
        const locator = this.page.locator(locatorStr);
        await this.clickElement(locator, 'Playing video');
    }

    // async IsVideoHeadingVisible(titlePart: string): Promise<Boolean> {
    //     const video = Selectors.Video_Page.Video_Heading(titlePart);
    //     const locator = this.page.locator(video);
    //     return await this.isElementVisible(locator);
    // }

    async likevideo(): Promise<void> {
        await this.clickElement(this.thumbsUp, 'Liking the video');

    }

    async Favoritevideo(): Promise<void> {
        await this.clickElement(this.heartUp, 'Favorite the video');
    }

    async CommentingOnVideo(comment: string): Promise<void> {
        // const locatorStr = Selectors.Video_Page.comment;
        // const locator = this.page.locator(Selectors.Video_Page.comment).nth(1);
        await this.fillInput(this.commentting, comment, "Writing the comment");
        await this.clickElement(this.buttonLocator, 'Commenting on the video');
    }

    // async SearchComment_Visible(comment: string): Promise<void> {
    //     const commentSelector = Selectors.Video_Page.Comment_Text(comment);
    //     const commentLocator = this.page.locator(commentSelector);

    //     await expect(commentLocator.first(), `Comment "${comment}" not found on page`).toContainText(comment, { timeout: 10000 });

    //     this.logger.info(`Comment "${comment}" is visible on the page.`);
    // }

    // async SearchComment_VisibleAndEdit(oldComment: string, newComment: string): Promise<void> {
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
    //     await this.page.waitForTimeout(300); // Allow CSS to show edit button

    //     const editButton = targetCommentRow.locator('[data-e2e-link="editComment"]'); // Adjust selector if needed

    //     if (await editButton.isVisible()) {
    //         await editButton.click();
    //     } else {
    //         this.logger.warn('Edit button not visibly rendered; attempting force click.');
    //         await editButton.click({ force: true });
    //     }

    //     const textarea = targetCommentRow.locator(Selectors.Video_Page.comment).first();
    //     await expect(textarea).toBeVisible({ timeout: 5000 });
    //     await textarea.fill(newComment);

    //     const newCommentBlock = this.page.locator(`div[data-e2e-div="${newComment}"]`);
    //     const updateButton = newCommentBlock.locator('button[data-e2e-btn="Update"]');
    //     await updateButton.click();

    //     const updatedCommentLocator = this.page.locator(Selectors.Video_Page.Comment_Text(newComment));
    //     await expect(updatedCommentLocator.first(), `Updated comment "${newComment}" not found`).toContainText(newComment, { timeout: 10000 });

    //     this.logger.info(`Comment updated successfully from "${oldComment}" to "${newComment}".`);
    // }

    async SearchComment_VisibleAndEdit(oldComment: string, newComment: string): Promise<void> {
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

        const textarea = targetCommentRow.locator(Selectors.Video_Page.comment);
        await textarea.fill(newComment);

        const newCommentBlock = this.page.locator(`div[data-e2e-div="${newComment}"]`);
        const updateButton = newCommentBlock.locator('button[data-e2e-btn="Update"]');
        await updateButton.click();

        this.logger.info(`Comment updated from "${oldComment}" to "${newComment}".`);
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

    async SearchComment_VisibleAndDelete(oldComment: string): Promise<void> {
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

        this.logger.info(`Comment "${oldComment}" deleted.`);
    }

    async playVideo(): Promise<void> {
        await this.clickElement(this.playvideo, 'Clicking play button');
        await this.page.waitForTimeout(1000);
    }


}