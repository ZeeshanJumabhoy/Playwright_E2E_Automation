import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../base/BasePage';
import { VideoPageSelectors } from '../Locators/VideoPageSelectors';
import { TestData } from '../data/TestData';
import { HomePage } from './HomePageService';
import { AssertHelper } from '../utils/AssertHelper';
import { timeStamp } from 'console';

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
    private readonly editButton: Locator;
    private readonly updateButton: Locator;
    private readonly deleteButton: Locator;

    constructor(page: Page) {

        this.page = page;
        this.basePage = new BasePage(page);
        this.homepage = new HomePage(page);
        this.assert =  new AssertHelper(page);
        this.thumbsUp = page.locator(VideoPageSelectors.ThumbsUpButton);
        this.heartUp = page.locator(VideoPageSelectors.HeartUpButton);
        this.commentting = page.locator(VideoPageSelectors.comment).nth(1); // Becuase of the Updation time it make issue if we done in the variable only
        this.buttonLocator = page.locator(VideoPageSelectors.Comment_Button);
        this.playvideo = page.locator(VideoPageSelectors.Play_Video);
        this.videohyperlink = page.locator(VideoPageSelectors.Video_Hyper);
        this.likeCountLocator = page.locator(VideoPageSelectors.Like_Count_After);
        this.editButton = page.locator(VideoPageSelectors.Edit_Button);
        this.updateButton = page.locator(VideoPageSelectors.Update_Button);
        this.deleteButton = page.locator(VideoPageSelectors.Delete_Button);
    }

    async clickPlaybackByMashupId(mashupId: string, title: string): Promise<void> {
        await this.homepage.Search(title);
        const container = this.page.locator(VideoPageSelectors.Click_Video(mashupId));
        const anchor = container.locator(this.videohyperlink);
        await this.basePage.clickElement(anchor, `Clicking on video with mashupId ${mashupId}`);
    }
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
        await this.assert.toHaveTitle(TestData.Video.Video_Page_Title(title));
    }

    async EditComment(oldComment: string, newComment: string, mashupId: string, title: string): Promise<void> {
        await this.CommentingOnVideo(oldComment, mashupId, title);
    
        // Get the first comment block inside the comment section
        const firstCommentBlock = this.page.locator('div[data-e2e-div="allComments"] div.media-body >>nth=1');
        const commentTextLocator = firstCommentBlock.locator('[data-e2e-span="comment"]');
    
        // Wait for comment visibility
        await this.basePage.waitHelper.waitForElementToBeVisible(commentTextLocator, 5000);
        const currentText = (await commentTextLocator.textContent())?.trim();
    
        if (currentText !== oldComment.trim()) {
            throw new Error(`First comment does not match expected text. Found: "${currentText}"`);
        }
    
        await firstCommentBlock.scrollIntoViewIfNeeded();
        await firstCommentBlock.hover();
    
        const editButton = firstCommentBlock.locator(this.editButton);
        await editButton.click({ force: true });
    
        const textarea = firstCommentBlock.locator(VideoPageSelectors.comment);
        await this.basePage.waitHelper.waitForElementToBeVisible(textarea);
        await textarea.fill(newComment);
    
        //await this.basePage.waitHelper.waitForElementToBeVisible(this.updateButton);
        await this.basePage.clickElement(this.updateButton, "Updating the comment")
    
        this.basePage.logger.info(`Comment updated to: "${newComment}"`);
    }

    async DeleteComment(oldComment: string, mashupId: string, title: string): Promise<void> {
        await this.CommentingOnVideo(oldComment, mashupId, title);
    
        // Get the first comment block inside the comment section
        const firstCommentBlock = this.page.locator('div[data-e2e-div="allComments"] div.media-body >>nth=2');
        const commentTextLocator = firstCommentBlock.locator('[data-e2e-span="comment"]');
    
        // Wait for comment visibility
        await this.basePage.waitHelper.waitForElementToBeVisible(commentTextLocator, 5000);
        const currentText = (await commentTextLocator.textContent())?.trim();
    
        if (currentText !== oldComment.trim()) {
            throw new Error(`First comment does not match expected text. Found: "${currentText}"`);
        }
    
        await firstCommentBlock.scrollIntoViewIfNeeded();
        await firstCommentBlock.hover();

        const deleteButton = firstCommentBlock.locator(this.deleteButton);
        await deleteButton.click({ force: true });

        this.basePage.logger.info(`Comment "${oldComment}" deleted.`);
    }

    async playVideo(): Promise<void> {
        await this.basePage.clickElement(this.playvideo, 'Clicking play button');
        await this.page.waitForTimeout(1000);
    }


}