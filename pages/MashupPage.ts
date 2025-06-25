import { Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';
import { SharedSelectors } from '../constants/SharedSelectors';

export class MashupPage {
    private readonly page: Page;
    private readonly basePage: BasePage;
    private mashupId: string;
    private title: string ;

    constructor(page: Page) {
        this.page = page;
        this.basePage = new BasePage(page);
    }

    async getId(): Promise<string> {
        return this.mashupId;
    }

    async getTitle(): Promise<string> {
        return this.title;
    }

    async setMashupId(id: string): Promise<void> {
        this.mashupId = id;
    }

    async setTitle(title: string): Promise<void> {
        this.title = title;
    }

    async initializeMashupInfo(): Promise<void> {
        const { mashupId, title } = await this.basePage.getMashupDetails(
            SharedSelectors.CONTROL_PANEL.upload_container,
            'data-e2e-mashupid'
        );
        await this.setMashupId(mashupId);
        await this.setTitle(title);
    }
}
