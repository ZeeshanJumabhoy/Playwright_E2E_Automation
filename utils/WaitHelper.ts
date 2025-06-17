import { Page, Locator } from '@playwright/test';

export class WaitHelper {
    constructor(private page: Page) {}

    async waitForElementToBeVisible(locator: Locator, timeout: number = 10000): Promise<void> {
        await locator.waitFor({ state: 'visible', timeout });
    }

    async waitForElementToBeHidden(locator: Locator, timeout: number = 10000): Promise<void> {
        await locator.waitFor({ state: 'hidden', timeout });
    }

    async waitWithTimeout(ms: number): Promise<void> {
        await this.page.waitForTimeout(ms);
    }
}
