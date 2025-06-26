import { Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';
import { SharedSelectors } from '../Locators/SharedSelectors';
import { WaitHelper } from '../utils/WaitHelper';

export class MashupPage {
    private readonly page: Page;
    private readonly basePage: BasePage;
    private mashupId: string;
    private title: string ;
    private waitHelper: WaitHelper;

    constructor(page: Page) {
        this.page = page;
        this.basePage = new BasePage(page);
        this.waitHelper = new WaitHelper(page);
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

    async initializeMashupInfo(): Promise<this> {
        const { mashupId, title } = await this.getMashupDetails(
            SharedSelectors.CONTROL_PANEL.upload_container,
            'data-e2e-mashupid'
        );
        await this.setMashupId(mashupId);
        await this.setTitle(title);
        return this;
    }

    
    public async getMashupDetails(parentSelector: string, attributeName: string): Promise<{ mashupId: string; title: string }> {
        const parentLocator = this.page.locator(parentSelector).first();

        // Retry getting mashupId attribute
        const maxRetries = 5;
        let mashupId: string | null = null;

        for (let i = 0; i < maxRetries; i++) {
            mashupId = await parentLocator.getAttribute(attributeName);
            if (mashupId) break;
        }

        // Get the title from the child anchor element inside the parent container
        const titleLocator = parentLocator.locator('[data-e2e-link="fileTitle"]');
       // await this.waitHelper.waitForElementToBeVisible(titleLocator);
        const title = (await titleLocator.textContent())?.trim() ?? 'Unknown Title';

        return {
            mashupId: mashupId ?? '012',
            title
        };
    }
}
