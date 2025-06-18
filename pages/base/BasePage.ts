import { Page, Locator } from '@playwright/test';
import { Logger } from '../../utils/Logger';
import { WaitHelper } from '../../utils/WaitHelper';
import { AppConstants } from '../../constants/AppConstants';

export abstract class BasePage {
    protected readonly page: Page;
    protected readonly logger: Logger;
    protected readonly waitHelper: WaitHelper;

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

    protected async clickElement(locator: Locator, description: string): Promise<void> {
        this.logger.info(`Clicking: ${description}`);
        await this.waitHelper.waitForElementToBeVisible(locator);
        await locator.click();
        this.logger.info(`Successfully clicked: ${description}`);
    }

    protected async fillInput(locator: Locator, value: string, description: string): Promise<void> {
        this.logger.info(`Filling ${description} with: ${value}`);
        await this.waitHelper.waitForElementToBeVisible(locator);
        await locator.fill(value);
        this.logger.info(`Successfully filled: ${description}`);
    }

    async getPageTitle(): Promise<string> {
        return await this.page.title();
    }

    protected async isElementVisible(locator: Locator, timeout: number = 3000): Promise<boolean> {
        try {
            await locator.waitFor({ state: 'visible', timeout });
            return true;
        } catch {
            return false;
        }
    }
}
