import { test, expect } from '../../utils/fixtures';
import { TestData } from '../../data/TestData';

test.describe('Uploading Media, Searching and Playing it', () => {

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

    const { mashupId, title } = await mediaPage.uploadVideo(TestData.Video.Video_Path);

    await controlPanel.waitForWorkflowToFinish(mashupId);

    await videoPage.clickPlaybackByMashupId(mashupId, title);

    // Then play the video and verify it is playing
    //await videoPage.playVideo();
    //await assert.videoShouldBePlaying('Main video');

    await homePage.logout();
  });
});
