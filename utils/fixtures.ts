import { test as base, expect, Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { AssertHelper } from '../utils/AssertHelper';
import { TestData } from '../data/TestData';

type MyFixtures = {
  homePage: HomePage;
  assert: AssertHelper;
};

export const test = base.extend<MyFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.open(); // Uses Playwright-managed `page`
    await expect(page).toHaveTitle(TestData.USER.expectedTitle);
    await use(homePage);
  },
  assert: async ({ page }, use) => {
    const assert = new AssertHelper(page);
    await use(assert);
  }
});

export { expect };
