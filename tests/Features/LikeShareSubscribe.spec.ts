import { test, expect } from '../../utils/fixtures';
import { TestData } from '../../data/TestData';

test.describe('Search and Like/Favorite Video with Authentication', () => {
  test('should search, play, like, and favorite a video', async ({ homePage, loginPage, videoPage, assert, mediaPage, controlPanel }) => {

    await loginPage.login(TestData.USER.email, TestData.USER.password);

    const { mashupId, title } = await mediaPage.uploadVideo(TestData.Video.Video_Path);

    await controlPanel.waitForWorkflowToFinish(mashupId);

    await videoPage.clickPlaybackByMashupId(mashupId, title);
    //#endregion

    const [likeAfterLocator, afterLikeCount] = await videoPage.likevideo();
    await assert.toBeVisible(likeAfterLocator, 'Like span updated');
    expect(afterLikeCount).toBeGreaterThan(0);

    const HeartUpButton = await videoPage.Favoritevideo();
    await assert.toHaveAttribute(HeartUpButton.locator('span'), 'title', TestData.Video.Add_To_Favorite, 'Favorite button before click');

    await homePage.logout();
  });
});
