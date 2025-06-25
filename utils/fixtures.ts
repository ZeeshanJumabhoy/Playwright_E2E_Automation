import { test as base, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { Video } from '../pages/VideoPage';
import { Media } from '../pages/MediaPage';
import { Control_Panel } from '../pages/ControlPanel';
import { AssertHelper } from '../utils/AssertHelper';
import { TestData } from '../data/TestData';
import { MashupPage } from '../pages/MashupPage';

type MyFixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
  videoPage: Video;
  mediaPage: Media;
  controlPanel: Control_Panel;
  mashupPage:MashupPage
  assert: AssertHelper;
};

export const test = base.extend<MyFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.open();
    await expect(page).toHaveTitle(TestData.USER.expectedTitle);
    await use(homePage);
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  videoPage: async ({ page }, use) => {
    await use(new Video(page));
  },
  mediaPage: async ({ page }, use) => {
    await use(new Media(page));
  },
  controlPanel: async ({ page }, use) => {
    await use(new Control_Panel(page));
  },
  mashupPage: async ({ page }, use) => {
    await use(new MashupPage(page));
  },
  assert: async ({ page }, use) => {
    await use(new AssertHelper(page));
  },
});

export { expect };
