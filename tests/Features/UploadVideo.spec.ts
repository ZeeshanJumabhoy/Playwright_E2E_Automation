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
  }) => {

    await loginPage.login(TestData.USER.email, TestData.USER.password);

    const MashupPage = await mediaPage.uploadVideo(TestData.Video.Video_Path);

    await controlPanel.waitForWorkflowToFinish(await MashupPage.getId());

    await videoPage.clickPlaybackByMashupId( await MashupPage.getId(), await MashupPage.getTitle());

    // Then play the video and verify it is playing
    //await videoPage.playVideo();
    //await assert.videoShouldBePlaying('Main video');

    await homePage.logout();
  });
});
