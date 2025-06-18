import { Page, Locator } from '@playwright/test';
import { BasePage } from './base/BasePage';
import { Selectors } from '../constants/Selectors';

export class Video extends BasePage {
    constructor(page: Page) {
        super(page);
        //Locators will come here 
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
        // Scroll down the page by some amount
        await this.page.evaluate(() => window.scrollBy(0, 500)); // scrolls down 500 pixels
        const locatorStr = Selectors.Video_Page.ThumbsUpButton;
        const locator = this.page.locator(locatorStr);
        await locator.scrollIntoViewIfNeeded(); // Ensure it's in view
        await this.clickElement(locator, 'Liking the video');
    }

    async Favoritevideo(): Promise<void> {
        const locatorStr = Selectors.Video_Page.HeartUpButton;
        const locator = this.page.locator(locatorStr);
        await locator.scrollIntoViewIfNeeded(); // Ensure it's in view
        await this.clickElement(locator, 'Favorite the video');
    }
}
