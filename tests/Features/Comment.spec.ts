import { test, expect, Page } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { LoginPage } from '../../pages/LoginPage';
import { Video } from '../../pages/Video';
import { TestData } from '../../data/TestData';
import { Selectors } from '../../constants/Selectors';
import { AssertHelper } from '../../utils/AssertHelper';

test.describe('Searching and playing video with Authentication', () => {
    let page: Page;
    let homePage: HomePage;
    let loginPage: LoginPage;
    let videoPage: Video;
    let assert: AssertHelper;


    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        videoPage = new Video(page); // <-- FIXED
        assert = new AssertHelper(page);

        await homePage.open();
        await assert.toHaveTitle(TestData.USER.expectedTitle);

        await homePage.clickSignIn();
        await loginPage.login(TestData.USER.email, TestData.USER.password);
        await assert.toBeVisible(page.locator(Selectors.NAVIGATION.PROFILE_TOGGLE), 'Profile Toggle after login');

        await homePage.Search(TestData.Video.VideoTitle);

        const videoLocator = page.locator(Selectors.Main_PAGE.Video_Link(TestData.Video.VideoPartialtext));
        await assert.toBeVisible(videoLocator, 'Video link from search results');

        await videoPage.clickVideo(TestData.Video.VideoPartialtext);

        const headingLocator = page.locator(Selectors.Video_Page.Video_Heading(TestData.Video.VideoPartialtext));
        await assert.toBeVisible(headingLocator, 'Video heading after clicking');

        await videoPage.CommentingOnVideo(TestData.Video.Video_Comment);

        const commentSelector = Selectors.Video_Page.Comment_Text(TestData.Video.Video_Comment_Search);
        const commentLocator = page.locator(commentSelector);
        await assert.toBeVisible(commentLocator.nth(1), `Comment "${TestData.Video.Video_Comment_Search}"`);


        await videoPage.SearchComment_VisibleAndEdit(
            TestData.Video.Video_Comment_Search,
            TestData.Video.New_Comment
        );

        const updatedCommentLocator = page.locator(
            Selectors.Video_Page.Comment_Text(TestData.Video.New_Comment)
        );
        await assert.toBeVisible(updatedCommentLocator, `Updated comment: "${TestData.Video.New_Comment}"`);


        await videoPage.SearchComment_VisibleAndDelete(TestData.Video.Video_Comment_Delete);

        const deletedCommentLocator = page.locator(
            Selectors.Video_Page.Comment_Text(TestData.Video.Video_Comment_Delete)
        );
        await expect(deletedCommentLocator, `Deleted comment "${TestData.Video.Video_Comment_Delete}" should be gone`).toHaveCount(0);

        await homePage.logout();
    });
})