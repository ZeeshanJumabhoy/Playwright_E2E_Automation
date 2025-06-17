import { Page } from '@playwright/test';
import { Logger } from '../../utils/Logger';
import { WaitHelper } from '../../utils/WaitHelper';

export abstract class BaseComponent {
    protected readonly page: Page;
    protected readonly logger: Logger;
    protected readonly waitHelper: WaitHelper;

    constructor(page: Page) {
        this.page = page;
        this.logger = new Logger(this.constructor.name);
        this.waitHelper = new WaitHelper(page);
    }

    protected async clickElement(locator: any, description: string): Promise<void> {
        this.logger.info(`Clicking: ${description}`);
        await this.waitHelper.waitForElementToBeVisible(locator);
        await locator.click();
        this.logger.info(`Successfully clicked: ${description}`);
    }
}
