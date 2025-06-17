import { test, expect } from '@playwright/test';

test('Goto google',   async ({page}) =>{
    await page.goto('https://testabc12.automation.beta.vidizmo.com/');
    await expect(page).toHaveTitle('Home - testabc12@sharklasers.com');
})
