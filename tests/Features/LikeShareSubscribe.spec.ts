import { test, expect } from '../../utils/fixtures'; // uses all globalized page objects
import { TestData } from '../../data/TestData';
import { Selectors } from '../../constants/Selectors';

test.describe('Search and Like/Favorite Video with Authentication', () => {
  test('should search, play, like, and favorite a video', async ({ page, homePage, loginPage, videoPage, assert }) => {
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
});
