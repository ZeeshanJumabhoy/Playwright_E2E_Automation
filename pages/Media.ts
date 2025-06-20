import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base/BasePage';
import { Selectors } from '../constants/Selectors';

export class Media extends BasePage {
    // Locators
    private readonly addVideoButton: Locator;
    private readonly uploadInputField: Locator;
    private readonly uploadVideoButton: Locator;

    constructor(page: Page) {
        super(page);
        this.uploadVideoButton = page.locator(Selectors.Main_PAGE.UploadVideo);
        this.addVideoButton = page.locator(Selectors.Main_PAGE.AddVideo);
        this.uploadInputField = page.locator(Selectors.Main_PAGE.uploadInput);
    }

    async clickUploadButton(): Promise<void> { 
        await this.clickElement(this.uploadVideoButton, 'Media Button');
    }

    async validateUploadPageLoaded(expectedTitle: string): Promise<void> {
        await expect(this.page).toHaveTitle(expectedTitle);
        this.logger.info(`Media page loaded with correct title: ${expectedTitle}`);
    }

    async uploadVideo(filePath: string): Promise<void> {
        await this.waitHelper.waitForElementToBeVisible(this.addVideoButton);
       // await this.clickElement(uploadInput, 'Click here to upload video file');
        //const uploadInput2 = this.page.locator(Selectors.Main_PAGE.uploadInput);
       // await this.waitHelper.waitForElementToBeVisible(uploadInput2);
        await this.uploadInputField.setInputFiles(filePath);
        this.logger.info(`Video file uploaded: ${filePath}`);
    }
}






