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
    });

    test('Should login to the account successfully', async () => {
        await homePage.clickSignIn();
        await loginPage.login(TestData.USER.email, TestData.USER.password);
        await assert.toBeVisible(page.locator(Selectors.NAVIGATION.PROFILE_TOGGLE), 'Profile Toggle after login');
    });

    test('Should search, play, like and favorite the video', async () => {
        await test.step('Search video', async () => {
            await homePage.Search(TestData.Video.VideoTitle);
            const videoLocator = page.locator(Selectors.Main_PAGE.Video_Link(TestData.Video.VideoPartialtext));
            await assert.toBeVisible(videoLocator, 'Video search result');
        });

        await test.step('Play video and validate heading', async () => {
            await videoPage.clickVideo(TestData.Video.VideoPartialtext);
            const headingLocator = page.locator(Selectors.Video_Page.Video_Heading(TestData.Video.VideoPartialtext));
            await assert.toBeVisible(headingLocator, 'Video heading after click');
        });

        await test.step('Like and favorite the video', async () => {
            await videoPage.likevideo();
            await videoPage.Favoritevideo();
        });
    });

    test('Should logout from the account successfully', async () => {
        await homePage.logout();
        await assert.toBeVisible(page.locator(Selectors.NAVIGATION.SIGN_IN_BUTTON).first(), 'Sign In Button after logout');
    });
});
