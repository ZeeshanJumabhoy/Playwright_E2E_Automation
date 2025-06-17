import { test, expect, Page } from '@playwright/test';
test.describe('Authentication Flow', () => {
    let page: Page;
    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        await page.goto('https://testabc12.automation.beta.vidizmo.com/');
        await expect(page).toHaveTitle('Home - testabc12@sharklasers.com');
    });
    test('Login to the account', async () => {
        await page.click('[title="Sign In"]');
        await page.fill('#EmailAddress', 'testabc12@sharklasers.com');
        await page.fill('#Password', 'Admin@123');
        await page.click('#Signin');
    });
    test('Logout from the account', async () => {
        const buttonSelector = 'button[data-e2e-link="toggleProfilePane"]';
        await page.waitForSelector(buttonSelector, { state: 'visible' });
        await page.click(buttonSelector);
        await page.waitForTimeout(2000);
        const signOutButton = page.locator('[title="Sign Out"]');
        await signOutButton.waitFor({ state: 'visible' }); // Optional, but good practice
        await page.waitForTimeout(2000);
        await signOutButton.click();
        await page.waitForTimeout(2000);
        const signInButtons = page.locator('[title="Sign In"]');
        if (await signInButtons.count() > 0) {
            const signInBtn = signInButtons.nth(0);
            await expect(signInBtn).toBeVisible();
        } else {
            console.log('Sign In button not found after logout.');
        }
    });

    test.afterAll(async () => {
        await page.close();
    });
});