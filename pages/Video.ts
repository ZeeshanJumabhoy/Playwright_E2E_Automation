import { Page, Locator } from '@playwright/test';
import { BasePage } from './base/BasePage';
import { Selectors } from '../constants/Selectors';

export class Video extends BasePage {
    constructor(page: Page) {
        super(page);
        //Locators will come here 
    }

    async clickVideo(titlePart: string, index: number = 0): Promise<void>{
        const locatorStr = Selectors.Main_PAGE.Video_Link(titlePart);
        const locator = this.page.locator(locatorStr);
        await this.clickElement(locator,'Playing video');
    }

    async IsVideoHeadingVisible(titlePart:string): Promise<Boolean>{
        const video=Selectors.Video_Page.Video_Heading(titlePart);
        const locator= this.page.locator(video);
        return await this.isElementVisible(locator);

    }
}
