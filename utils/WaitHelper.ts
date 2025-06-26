import { Page, Locator, expect } from '@playwright/test';

export class WaitHelper {
    constructor(private page: Page) {}

    async waitForElementToBeVisible(locator: Locator, timeout: number = 20000): Promise<void> {
        try {
            await locator.scrollIntoViewIfNeeded();
            await expect(locator).toBeVisible({ timeout });
        } catch (error) {
            const isHidden = await locator.isHidden();
            throw new Error(`Element is hidden even after ${timeout}ms. isHidden: ${isHidden}`);
        }
    }
    
    async waitForElementToBeHidden(locator: Locator, timeout: number = 20000): Promise<void> {
        await locator.waitFor({ state: 'hidden', timeout });
    }


    // Is it to remove
    async waitWithTimeout(ms: number): Promise<void> {
        await this.page.waitForTimeout(ms);
    }
}
