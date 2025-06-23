import { test, expect } from '../../utils/fixtures'; 
import { TestData } from '../../data/TestData';
import { Selectors } from '../../constants/Selectors';

test.describe('Uploading Media, Searching and Playing it', () => {
  test.setTimeout(2 * 60 * 60 * 1000);

  test('should pass login and logout flow', async ({
    page,
    homePage,
    loginPage,
    mediaPage,
    videoPage,
    controlPanel,
    assert
  }) => {
    await homePage.clickSignIn();
    await loginPage.login(TestData.USER.email, TestData.USER.password);

    await homePage.clickMediaButton();
    await assert.toHaveTitle(TestData.Media.expectedTitleForAddMedia);

    await mediaPage.clickUploadButton();
    await assert.toHaveTitle(TestData.Media.expectedTitleForUploadMedia);
    await mediaPage.uploadVideo(TestData.Video.Video_Path);

    await homePage.clicktoggleButton();
    await controlPanel.clickControlPanel();
    await assert.toHaveTitle(TestData.ControlPanel.expectedTitleForSecurityPolicy);

    await controlPanel.clickWorkflows();
    await assert.toHaveTitle(TestData.ControlPanel.expectedTitleForWorkflows);

    await controlPanel.waitForWorkflowToFinish(TestData.ControlPanel.VideoTitle2);

    await homePage.Search(TestData.ControlPanel.VideoTitle2);

    const videoLocator = page.locator(Selectors.Main_PAGE.Video_Link(TestData.Video.VideoPartialtext));
    await assert.toBeVisible(videoLocator, 'Video link from search results');

    await videoPage.clickVideo(TestData.Video.VideoPartialtext2);

    const headingLocator = page.locator(Selectors.Video_Page.Video_Heading(TestData.Video.VideoPartialtext2));
    await assert.toBeVisible(headingLocator, 'Video heading after clicking');

    await homePage.logout();
  });
});
