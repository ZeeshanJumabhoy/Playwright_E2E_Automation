import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../base/BasePage';
import { HomePageSelectors } from '../constants/HomePageSelectors';

export class Media {
    private readonly page: Page;
    private readonly basePage: BasePage;

    // Locators
    private readonly addVideoButton: Locator;
    private readonly uploadInputField: Locator;
    private readonly uploadVideoButton: Locator;
    private readonly mediaButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.basePage = new BasePage(page);

        this.uploadVideoButton = page.locator(HomePageSelectors.UploadVideo);
        this.addVideoButton = page.locator(HomePageSelectors.AddVideo);
        this.uploadInputField = page.locator(HomePageSelectors.uploadInput);
        this.mediaButton = page.locator(HomePageSelectors.Add_Media);
    }

    async clickUploadButton(): Promise<void> {
        await this.basePage.clickElement(this.uploadVideoButton, 'Media Button');
    }

    // If you want to use this:
    // async validateUploadPageLoaded(expectedTitle: string): Promise<void> {
    //     await expect(this.page).toHaveTitle(expectedTitle);
    //     this.basePage.logger.info(`Media page loaded with correct title: ${expectedTitle}`);
    // }

    async uploadVideo(filePath: string): Promise<void> {
        await this.basePage.clickElement(this.uploadVideoButton, 'Media Button');
        await this.basePage.waitHelper.waitForElementToBeVisible(this.addVideoButton);
        await this.uploadInputField.setInputFiles(filePath);
        this.basePage.logger.info(`Video file uploaded: ${filePath}`);
    }
}
