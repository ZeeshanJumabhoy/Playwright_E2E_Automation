import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base/BasePage';
import { Selectors } from '../constants/Selectors';
import { TestData } from '../data/TestData';

export class Video extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async clickVideo(titlePart: string, index: number = 0): Promise<void> {
        const locatorStr = Selectors.Main_PAGE.Video_Link(titlePart);
        const locator = this.page.locator(locatorStr);
        await this.clickElement(locator, 'Playing video');
    }

    async IsVideoHeadingVisible(titlePart: string): Promise<Boolean> {
        const video = Selectors.Video_Page.Video_Heading(titlePart);
        const locator = this.page.locator(video);
        return await this.isElementVisible(locator);
    }

    async likevideo(): Promise<void> {
        await this.page.evaluate(() => window.scrollBy(0, 500));
        const locatorStr = Selectors.Video_Page.ThumbsUpButton;
        const locator = this.page.locator(locatorStr);
        await locator.scrollIntoViewIfNeeded();
        await this.clickElement(locator, 'Liking the video');
    }

    async Favoritevideo(): Promise<void> {
        const locatorStr = Selectors.Video_Page.HeartUpButton;
        const locator = this.page.locator(locatorStr);
        await locator.scrollIntoViewIfNeeded();
        await this.clickElement(locator, 'Favorite the video');
    }

    async CommentingOnVideo(comment: string): Promise<void> {
        const locatorStr = Selectors.Video_Page.comment;
        const locator = this.page.locator(Selectors.Video_Page.comment).nth(1);
        await locator.fill(comment);
        const buttonlocator = Selectors.Video_Page.Comment_Button;
        const buttonLocator = this.page.locator(buttonlocator);
        await this.clickElement(buttonLocator, 'Commenting on the video');
    }

    async SearchComment_Visible(comment: string): Promise<void> {
        const commentSelector = Selectors.Video_Page.Comment_Text(comment);
        const commentLocator = this.page.locator(commentSelector);

        // Wait for the comment to appear with a timeout
        await expect(commentLocator.first(), `Comment "${comment}" not found on page`).toContainText(comment, { timeout: 10000 });

        this.logger.info(`Comment "${comment}" is visible on the page.`);
    }

    async SearchComment_VisibleAndEdit(oldComment: string, newComment: string): Promise<void> {
        const commentSelector = Selectors.Video_Page.Comment_Text(oldComment);
        const commentLocator = this.page.locator(commentSelector);

        await expect(commentLocator.first(), `Comment "${oldComment}" not found on page`).toContainText(oldComment, { timeout: 10000 });

        this.logger.info(`Comment "${oldComment}" is visible on the page.`);

        // 2. Go to parent container (assumed media-body or grandparent)
        const fullCommentRow = commentLocator.locator('..').locator('..').nth(1);
        await fullCommentRow.scrollIntoViewIfNeeded();
        await fullCommentRow.hover();

        // // 3. Click Edit button
        const editButton = fullCommentRow.locator(Selectors.Video_Page.Edit_Button).nth(1);
        await editButton.click({ force: true });


        // // 4. Wait for textarea to appear and type the new comment
        const textarea = fullCommentRow.locator(Selectors.Video_Page.comment).nth(1);
        await expect(textarea).toBeVisible({ timeout: 5000 });
        await textarea.fill(newComment);

        const newCommentBlock = this.page.locator(`div[data-e2e-div="${newComment}"]`);

        // 5. Click the Update button inside the updated comment block
        const updateButton = newCommentBlock.locator('button[data-e2e-btn="Update"]');
        await updateButton.click();

        // // 6. Wait for the new comment to appear and verify
        const updatedCommentLocator = this.page.locator(Selectors.Video_Page.Comment_Text(newComment));
        await expect(updatedCommentLocator.first(), `Updated comment "${newComment}" not found`).toContainText(newComment, { timeout: 10000 });

        this.logger.info(`Comment updated successfully from "${oldComment}" to "${newComment}".`);
    }

   async DeleteComment(comment: string): Promise<void> {
        const commentSelector = Selectors.Video_Page.Comment_Text(comment);
        const commentLocator = this.page.locator(commentSelector);

        await expect(commentLocator.first(), `Comment "${comment}" not found on page`).toContainText(comment, { timeout: 10000 });

        this.logger.info(`Comment "${comment}" is visible on the page.`);

        // 2. Go to parent container (assumed media-body or grandparent)
        const fullCommentRow = commentLocator.locator('..').locator('..').nth(1);
        await fullCommentRow.scrollIntoViewIfNeeded();
        await fullCommentRow.hover();

        // 3. Click Delete button
        const deleteButton = fullCommentRow.locator(Selectors.Video_Page.Delete_Button).nth(1);
        await deleteButton.click();

        // 5. Verify comment is deleted
        await expect(commentLocator.first()).not.toBeVisible({ timeout: 10000 });

        this.logger.info(`Comment "${comment}" deleted successfully.`);
    } 
}