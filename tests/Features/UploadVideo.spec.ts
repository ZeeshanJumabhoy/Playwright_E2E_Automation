import { test, Page } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { LoginPage } from '../../pages/LoginPage';
import { Video } from '../../pages/Video';
import { Media } from '../../pages/Media';
import { Control_Panel } from '../../pages/ControlPanel';
import { TestData } from '../../data/TestData';
import { Selectors } from '../../constants/Selectors';
import { AssertHelper } from '../../utils/AssertHelper';


test.describe('Uploading Media, Searching and Playing it', () => {
    let page: Page;
    let homePage: HomePage;
    let loginPage: LoginPage;
    let videoPage: Video;
    let mediaPage: Media;
    let controlPanel: Control_Panel;
    let assert: AssertHelper;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        videoPage = new Video(page);
        mediaPage = new Media(page);
        controlPanel = new Control_Panel(page);
        assert = new AssertHelper(page);

        await homePage.open();
        await assert.toHaveTitle(TestData.USER.expectedTitle);
    });

    test('Should login successfully', async () => {
        await homePage.clickSignIn();
        await loginPage.login(TestData.USER.email, TestData.USER.password);
        await assert.toBeVisible(page.locator(Selectors.NAVIGATION.PROFILE_TOGGLE), 'Profile toggle after login');
    });

    test('Upload video and validate processing', async () => {
        test.setTimeout(2 * 60 * 60 * 1000); // 2 hours max timeout (if needed)

        await test.step('Navigate to upload page', async () => {
            await homePage.clickMediaButton();
            await assert.toHaveTitle(TestData.Media.expectedTitleForAddMedia);
        });

        await test.step('Upload a video file', async () => {
            await mediaPage.clickUploadButton();
            await assert.toHaveTitle(TestData.Media.expectedTitleForUploadMedia);
            await mediaPage.uploadVideo(TestData.Video.Video_Path);
        });

        await test.step('Wait for video processing to finish in Control Panel', async () => {
            await homePage.clicktoggleButton();
            await controlPanel.clickControlPanel();
            await assert.toHaveTitle(TestData.ControlPanel.expectedTitleForSecurityPolicy);

            await controlPanel.clickWorkflows();
            await assert.toHaveTitle(TestData.ControlPanel.expectedTitleForWorkflows);

            await controlPanel.waitForWorkflowToFinish(TestData.ControlPanel.VideoTitle2);
        });
    });

    test('Searching the Video And Playing it', async () => {
        await homePage.Search(TestData.ControlPanel.VideoTitle2);

        const videoLocator = page.locator(Selectors.Main_PAGE.Video_Link(TestData.Video.VideoPartialtext));
        await assert.toBeVisible(videoLocator, 'Video link from search results');

        await videoPage.clickVideo(TestData.Video.VideoPartialtext2);

        const headingLocator = page.locator(Selectors.Video_Page.Video_Heading(TestData.Video.VideoPartialtext2));
        await assert.toBeVisible(headingLocator, 'Video heading after clicking');
    });

    test('Should logout successfully', async () => {
        await homePage.logout();
        await assert.toBeVisible(page.locator(Selectors.NAVIGATION.SIGN_IN_BUTTON).first(), 'Sign In button after logout');
    });
});
