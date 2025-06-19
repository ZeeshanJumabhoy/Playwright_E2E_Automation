import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base/BasePage';
import { Selectors } from '../constants/Selectors';

export class Media extends BasePage {
    constructor(page: Page) {
        super(page);
        //Locators will come here 
    }

    async clickUploadButton(): Promise<void> { 
        const mediaButton = this.page.locator(Selectors.Main_PAGE.UploadVideo);
        await this.waitHelper.waitForElementToBeVisible(mediaButton);
        await this.clickElement(mediaButton, 'Media Button');
    }

    async validateUploadPageLoaded(expectedTitle: string): Promise<void> {
        await expect(this.page).toHaveTitle(expectedTitle);
        this.logger.info(`Media page loaded with correct title: ${expectedTitle}`);
    }

    async uploadVideo(filePath: string): Promise<void> {
        const uploadInput = this.page.locator(Selectors.Main_PAGE.AddVideo);
        await this.waitHelper.waitForElementToBeVisible(uploadInput);
       // await this.clickElement(uploadInput, 'Click here to upload video file');
        const uploadInput2 = this.page.locator(Selectors.Main_PAGE.uploadInput);
       // await this.waitHelper.waitForElementToBeVisible(uploadInput2);
        await uploadInput2.setInputFiles(filePath);
        this.logger.info(`Video file uploaded: ${filePath}`);
    }
}