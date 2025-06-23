import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../base/BasePage';
import { HomePageSelectors } from '../constants/HomePageSelectors';

export class Media extends BasePage {
    // Locators
    private readonly addVideoButton: Locator;
    private readonly uploadInputField: Locator;
    private readonly uploadVideoButton: Locator;
    private readonly mediaButton: Locator;

    constructor(page: Page) {
        super(page);
        this.uploadVideoButton = page.locator(HomePageSelectors.UploadVideo);
        this.addVideoButton = page.locator(HomePageSelectors.AddVideo);
        this.uploadInputField = page.locator(HomePageSelectors.uploadInput);
        this.mediaButton = this.page.locator(HomePageSelectors.Add_Media);
        
    }

    async clickUploadButton(): Promise<void> { 
        await this.clickElement(this.uploadVideoButton, 'Media Button');
    }

    // async validateUploadPageLoaded(expectedTitle: string): Promise<void> {
    //     await expect(this.page).toHaveTitle(expectedTitle);
    //     this.logger.info(`Media page loaded with correct title: ${expectedTitle}`);
    // }

    async uploadVideo(filePath: string): Promise<void> {
        await this.clickElement(this.uploadVideoButton, 'Media Button');
        await this.waitHelper.waitForElementToBeVisible(this.addVideoButton);
        await this.uploadInputField.setInputFiles(filePath);
        this.logger.info(`Video file uploaded: ${filePath}`);
    }
}


