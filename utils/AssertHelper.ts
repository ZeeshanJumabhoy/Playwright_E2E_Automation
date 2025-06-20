import { expect, Locator, Page } from '@playwright/test';
import { Logger } from './Logger';

export class AssertHelper {
    private readonly logger: Logger;
    private readonly defaultTimeout = 10000; // 10 seconds

    constructor(private readonly page: Page) {
        this.logger = new Logger('AssertHelper');
    }

    async toBeVisible(locator: Locator, description?: string, timeout?: number) {
        await expect(locator, `${description || 'Element'} should be visible`).toBeVisible({ timeout: timeout || this.defaultTimeout });
        this.logger.info(`${description || 'Element'} is visible.`);
    }

    async toHaveTitle(expectedTitle: string, timeout?: number) {
        await expect(this.page).toHaveTitle(expectedTitle, { timeout: timeout || this.defaultTimeout });
        this.logger.info(`Title matched: ${expectedTitle}`);
    }

    async toHaveText(locator: Locator, expected: string, description?: string, timeout?: number) {
        await expect(locator, `${description || 'Element'} text mismatch`).toHaveText(expected, { timeout: timeout || this.defaultTimeout });
        this.logger.info(`${description || 'Text'} matched: ${expected}`);
    }

    async toContainText(locator: Locator, expected: string, description?: string, timeout?: number) {
        await expect(locator, `${description || 'Element'} should contain: ${expected}`).toContainText(expected, { timeout: timeout || this.defaultTimeout });
        this.logger.info(`${description || 'Text'} contains: ${expected}`);
    }

    async toHaveCount(locator: Locator, expectedCount: number, description?: string, timeout?: number) {
        await expect(locator, `${description || 'Element'} count mismatch`).toHaveCount(expectedCount, { timeout: timeout || this.defaultTimeout });
        this.logger.info(`${description || 'Count'} matched: ${expectedCount}`);
    }

    async toBeHidden(locator: Locator, description?: string, timeout?: number) {
        await expect(locator, `${description || 'Element'} should be hidden`).toBeHidden({ timeout: timeout || this.defaultTimeout });
        this.logger.info(`${description || 'Element'} is hidden.`);
    }

    async toBeEnabled(locator: Locator, description?: string, timeout?: number) {
        await expect(locator, `${description || 'Element'} should be enabled`).toBeEnabled({ timeout: timeout || this.defaultTimeout });
        this.logger.info(`${description || 'Element'} is enabled.`);
    }

    async toBeDisabled(locator: Locator, description?: string, timeout?: number) {
        await expect(locator, `${description || 'Element'} should be disabled`).toBeDisabled({ timeout: timeout || this.defaultTimeout });
        this.logger.info(`${description || 'Element'} is disabled.`);
    }
}
