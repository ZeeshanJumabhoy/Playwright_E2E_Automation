import { test, expect } from '../../utils/fixtures';
import { TestData } from '../../data/TestData';
import { HomePageSelectors } from '../../constants/HomePageSelectors';
import { VideoPageSelectors } from '../../constants/VideoPageSelectors';

test.describe('Search and Like/Favorite Video with Authentication', () => {
  test('should search, play, like, and favorite a video', async ({ page, homePage, loginPage, videoPage, assert, mediaPage, controlPanel }) => {

    await loginPage.login(TestData.USER.email, TestData.USER.password);

        //uploadFile
        //Uploading Video with Seperate Steps and assertions
        await homePage.clickMediaButton();
        await mediaPage.uploadVideo(TestData.Video.Video_Path);
        //#endregion
    
        await homePage.clicktoggleButton();  
        await controlPanel.waitForWorkflowToFinish(TestData.ControlPanel.VideoTitle2);


    await homePage.Search(TestData.Video.VideoTitle);

    // const videoLocator = page.locator(HomePageSelectors.Video_Link(TestData.Video.VideoPartialtext));
    // await assert.toBeVisible(videoLocator, 'Video search result');

    await videoPage.clickVideo(TestData.Video.VideoPartialtext);

    // const headingLocator = page.locator(VideoPageSelectors.Video_Heading(TestData.Video.VideoPartialtext));
    // await assert.toBeVisible(headingLocator, 'Video heading after click');


    const likeBeforeLocator = page.locator(VideoPageSelectors.Like_Count_Before);
    const beforeLikeCount = Number(await likeBeforeLocator.getAttribute('data-count') || '0');
    console.log(beforeLikeCount);


    await videoPage.likevideo();

    const likeAfterLocator = page.locator(VideoPageSelectors.Like_Count_After);
    await assert.toBeVisible(likeAfterLocator, 'Like span updated');

    const afterLikeCount = Number(await likeAfterLocator.getAttribute('data-count') || '0');
    console.log(afterLikeCount);

    expect(afterLikeCount).toBeGreaterThan(beforeLikeCount);

    await videoPage.Favoritevideo();
    const HeartUpButton= page.locator(VideoPageSelectors.HeartUpButton);
    await assert.toHaveAttribute(HeartUpButton.locator('span'), 'title', TestData.Video.Add_To_Favorite, 'Favorite button before click');

    await homePage.logout();
  });
});
