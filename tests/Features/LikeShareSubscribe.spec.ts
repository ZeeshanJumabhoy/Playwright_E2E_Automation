import { test, expect } from '../../utils/fixtures';
import { TestData } from '../../data/TestData';

test.describe('Search and Like/Favorite Video with Authentication', () => {
  test('should search, play, like, and favorite a video', async ({ homePage, loginPage, videoPage, assert, mediaPage, controlPanel }) => {

    await loginPage.login(TestData.USER.email, TestData.USER.password);

    const MashupPage = await mediaPage.uploadVideo(TestData.Video.Video_Path);

    await controlPanel.waitForWorkflowToFinish(await MashupPage.getId());

    await videoPage.clickPlaybackByMashupId( await MashupPage.getId(), await MashupPage.getTitle());
    //#endregion

    const [likeAfterLocator, afterLikeCount] = await videoPage.likevideo();
    await assert.toBeVisible(likeAfterLocator, 'Like span updated');
    expect(afterLikeCount).toBeGreaterThan(0);

    const HeartUpButton = await videoPage.Favoritevideo();
    await assert.toHaveAttribute(HeartUpButton.locator('span'), 'title', TestData.Video.Add_To_Favorite, 'Favorite button before click');

    await homePage.logout();
  });
});
