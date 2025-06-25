import { test, expect } from '../../utils/fixtures';
import { TestData } from '../../data/TestData';

test.describe('Uploading Media, Searching and Playing it', () => {
  test.setTimeout(2 * 60 * 60 * 1000);

  test('Should Upload the video and searching the video', async ({
    page,
    homePage,
    loginPage,
    mediaPage,
    videoPage,
    controlPanel,
    mashupPage,
    assert
  }) => {

    await loginPage.login(TestData.USER.email, TestData.USER.password);


    //Uploading Video with Seperate Steps and assertions
    await homePage.clickMediaButton();
    // await assert.toHaveTitle(TestData.Media.expectedTitleForAddMedia);

    // await mediaPage.clickUploadButton();
    // await assert.toHaveTitle(TestData.Media.expectedTitleForUploadMedia);

    const { mashupId, title } = await mediaPage.uploadVideo(TestData.Video.Video_Path);


    //#endregion

    await homePage.clicktoggleButton();

    // Verifying through the Workflow process in seperate steps
    // await controlPanel.clickControlPanel();
    // await assert.toHaveTitle(TestData.ControlPanel.expectedTitleForSecurityPolicy);

    // await controlPanel.clickWorkflows();
    // await assert.toHaveTitle(TestData.ControlPanel.expectedTitleForWorkflows);


    await controlPanel.waitForWorkflowToFinish(mashupId);
    // Make the assert for this as well

    // Searcing and Validating that Video Found or not
    await homePage.Search(title);
    //const videoLocator = page.locator(HomePageSelectors.Video_Link(TestData.Video.VideoPartialtext));
    // await assert.toBeVisible(videoLocator, 'Video link from search results');

    // If found then going on the video page
    await videoPage.clickVideoByMashupId(mashupId);

    // Then play the video and verify it is playing
    //await videoPage.playVideo();
    //await assert.videoShouldBePlaying('Main video');

    await homePage.logout();
  });
});
