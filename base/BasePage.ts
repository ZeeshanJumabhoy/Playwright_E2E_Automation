import { Page, Locator } from '@playwright/test';
import { Logger } from '../utils/Logger';
import { WaitHelper } from '../utils/WaitHelper';
import { AppConstants } from '../constants/AppConstants';

export class BasePage {
    protected readonly page: Page;
    public readonly logger: Logger;
    public readonly waitHelper: WaitHelper;

    constructor(page: Page) {
        this.page = page;
        this.logger = new Logger(this.constructor.name);
        this.waitHelper = new WaitHelper(page);
    }

    async navigateTo(url: string): Promise<void> {
        this.logger.info(`Navigating to: ${url}`);
        await this.page.goto(url);
        await this.page.waitForLoadState('domcontentloaded');
        this.logger.info(`Successfully navigated to: ${url}`);
    }

    public async clickElement(locator: Locator, description: string): Promise<void> {
        this.logger.info(`Clicking: ${description}`);
        await this.waitHelper.waitForElementToBeVisible(locator);
        await locator.click();
        this.logger.info(`Successfully clicked: ${description}`);
    }

    public async fillInput(locator: Locator, value: string, description: string): Promise<void> {
        this.logger.info(`Filling ${description} with: ${value}`);
        await this.waitHelper.waitForElementToBeVisible(locator);
        await locator.fill(value);
        this.logger.info(`Successfully filled: ${description}`);
    }

    async getPageTitle(): Promise<string> {
        return await this.page.title();
    }

    public async isElementVisible(locator: Locator, timeout: number = 3000): Promise<boolean> {
        try {
            await locator.waitFor({ state: 'visible', timeout });
            return true;
        } catch {
            return false;
        }
    }

    public async getMashupDetails(parentSelector: string, attributeName: string, toastSelector: string = '#toast-container'): Promise<{ mashupId: string; title: string }> {
        const toastLocator = this.page.locator(toastSelector);
        await this.waitHelper.waitForElementToBeVisible(toastLocator);
        await this.waitHelper.waitWithTimeout(1000);

        const parentLocator = this.page.locator(parentSelector).first();
        //await this.waitHelper.waitForElementToBeVisible(parentLocator);

        // Retry getting mashupId attribute
        const maxRetries = 5;
        let mashupId: string | null = null;

        for (let i = 0; i < maxRetries; i++) {
            mashupId = await parentLocator.getAttribute(attributeName);
            if (mashupId) break;
            await this.waitHelper.waitWithTimeout(500);
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