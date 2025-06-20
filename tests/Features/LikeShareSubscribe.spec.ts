import { test, Page } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { LoginPage } from '../../pages/LoginPage';
import { Video } from '../../pages/Video';
import { TestData } from '../../data/TestData';
import { Selectors } from '../../constants/Selectors';
import { AssertHelper } from '../../utils/AssertHelper';

test.describe('Search and Like/Favorite Video with Authentication', () => {
    let page: Page;
    let homePage: HomePage;
    let loginPage: LoginPage;
    let videoPage: Video;
    let assert: AssertHelper;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        videoPage = new Video(page);
        assert = new AssertHelper(page);

        await homePage.open();
        await assert.toHaveTitle(TestData.USER.expectedTitle);

        await homePage.clickSignIn();
        await loginPage.login(TestData.USER.email, TestData.USER.password);

        await homePage.Search(TestData.Video.VideoTitle);
        const videoLocator = page.locator(Selectors.Main_PAGE.Video_Link(TestData.Video.VideoPartialtext));
        await assert.toBeVisible(videoLocator, 'Video search result');

        await videoPage.clickVideo(TestData.Video.VideoPartialtext);
        const headingLocator = page.locator(Selectors.Video_Page.Video_Heading(TestData.Video.VideoPartialtext));
        await assert.toBeVisible(headingLocator, 'Video heading after click');

        await videoPage.likevideo();
        await videoPage.Favoritevideo();

        await homePage.logout();
    });
})
