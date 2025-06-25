import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../base/BasePage';
import { HomePageSelectors } from '../constants/HomePageSelectors';
import { SharedSelectors } from '../constants/SharedSelectors';
import { WaitHelper } from '../utils/WaitHelper';
import { MashupPage } from './MashupPage';
import { HomePage } from './HomePage';

export class Media {

    private readonly page: Page;
    private readonly basePage: BasePage;
    private readonly waitHelper: WaitHelper

    // Locators
    private readonly addVideoButton: Locator;
    private readonly uploadInputField: Locator;
    private readonly uploadVideoButton: Locator;
    private readonly mediaButton: Locator;
    private readonly keepButton: Locator;
    private readonly fileExistsWarning: Locator;
    private readonly alertWarning: Locator
    private readonly toast_locator: Locator;
    private readonly homepage: HomePage;


    constructor(page: Page) {
        this.page = page;
        this.basePage = new BasePage(page);
        this.waitHelper = new WaitHelper(page);
        this.homepage = new HomePage(page);

        this.uploadVideoButton = page.locator(HomePageSelectors.UploadVideo);
        this.addVideoButton = page.locator(HomePageSelectors.AddVideo);
        this.uploadInputField = page.locator(HomePageSelectors.uploadInput);
        this.mediaButton = page.locator(HomePageSelectors.Add_Media);
        this.keepButton = page.locator(SharedSelectors.CONTROL_PANEL.keep_File);
        this.fileExistsWarning = page.locator(SharedSelectors.CONTROL_PANEL.FileExistWarn);
        this.toast_locator = page.locator(SharedSelectors.CONTROL_PANEL.Toast_Locator);
        this.alertWarning = page.locator(SharedSelectors.CONTROL_PANEL.FileExistAlertWarn);
    }

    async clickUploadButton(): Promise<void> {
        await this.basePage.clickElement(this.uploadVideoButton, 'Media Button');
    }

    // If you want to use this:
    // async validateUploadPageLoaded(expectedTitle: string): Promise<void> {
    //     await expect(this.page).toHaveTitle(expectedTitle);
    //     this.basePage.logger.info(`Media page loaded with correct title: ${expectedTitle}`);
    // }

    async uploadVideo(filePath: string): Promise<{ mashupId: string; title: string }> {

        //Uploading Video with Sarching and going onto Video Page
        await this.homepage.clickMediaButton();
        await this.basePage.clickElement(this.uploadVideoButton, 'Media Button');
        await this.basePage.waitHelper.waitForElementToBeVisible(this.addVideoButton);
        await this.uploadInputField.setInputFiles(filePath);
        this.basePage.logger.info(`Video file uploaded: ${filePath}`);

        try {
            await this.waitHelper.waitForElementToBeVisible(this.toast_locator, 5000);
        } catch (error) {
            // Combine both possible warning locators
            const warningLocator = this.fileExistsWarning.or(this.alertWarning);

            try {
                await expect(warningLocator.first()).toBeHidden({ timeout: 20000 });
                this.basePage.logger.info('File already exists. Clicking Keep button...');
                await this.basePage.clickElement(this.keepButton, "Clicking the keep button");
                await this.waitHelper.waitWithTimeout(500);
                await this.waitHelper.waitForElementToBeVisible(this.toast_locator);
            } catch (expectError) {
                throw new Error(
                    `Upload failed: Toast not found, and duplicate warning not visible.\n` +
                    `Original toast error: ${error}\n` +
                    `Warning visibility error: ${expectError}`
                );
            }
        }

        const mashupPage = new MashupPage(this.page);
        await mashupPage.initializeMashupInfo();

        const mashupId = await mashupPage.getId();
        const title = await mashupPage.getTitle();

        return { mashupId, title };
    }


}