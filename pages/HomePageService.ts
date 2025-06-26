import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../base/BasePage';
import { AppConstants } from '../Locators/AppConstants';
import { SharedSelectors } from '../Locators/SharedSelectors';
import { HomePageSelectors } from '../Locators/HomePageSelectors';
import { TestData } from '../data/TestData';

export class HomePage {

    private readonly page: Page;
    private readonly basePage: BasePage;
    // Navigation Elements
    private readonly signInButton: Locator;
    private readonly profileToggle: Locator;
    private readonly signOutButton: Locator;

    // Main Page Elements
    private readonly inputSearchbar: Locator;
    private readonly clickSearchbutton: Locator;
    private readonly mediaButton: Locator;
    private readonly toggleButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.basePage = new BasePage(page);

        // Navigation
        this.signInButton = this.page.locator(SharedSelectors.NAVIGATION.SIGN_IN_BUTTON);
        this.profileToggle = this.page.locator(SharedSelectors.NAVIGATION.PROFILE_TOGGLE);
        this.signOutButton = this.page.locator(SharedSelectors.NAVIGATION.SIGN_OUT_BUTTON);

        // Main Page
        this.inputSearchbar = this.page.locator(HomePageSelectors.Search_INPUT);
        this.clickSearchbutton = this.page.locator(HomePageSelectors.Search_Button).nth(0);
        this.mediaButton = this.page.locator(HomePageSelectors.Add_Media);
        this.toggleButton = this.page.locator(HomePageSelectors.toggle_Button);
    }

    async open(): Promise<void> {
        await this.basePage.navigateTo(AppConstants.BASE_URL);
    }

    async clickSignIn(): Promise<void> {
        await this.basePage.clickElement(this.signInButton, 'Sign In Button');
    }

    async Search(search: string): Promise<Locator> {
        await this.basePage.fillInput(this.inputSearchbar, search, 'Entering the input to search the video');
        await this.basePage.clickElement(this.clickSearchbutton, 'Clicking the search button');
        return this.page.locator(HomePageSelectors.Video_Link(search));
    }

    async clickMediaButton(): Promise<void> {
        await this.basePage.waitHelper.waitForElementToBeVisible(this.mediaButton);
        await this.basePage.clickElement(this.mediaButton, 'Media Button');
    }

    async logout(): Promise<void> {
        this.basePage.logger.info('Starting logout process');
        await this.basePage.clickElement(this.profileToggle, 'Profile Toggle Button');
        await this.basePage.clickElement(this.signOutButton, 'Sign Out Button');
        this.basePage.logger.info('Logout completed');
    }

    async clicktoggleButton(): Promise<void> {
        await this.basePage.waitHelper.waitForElementToBeVisible(this.toggleButton);
        await this.basePage.clickElement(this.toggleButton, 'Toggle Button');
    }
}
