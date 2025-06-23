import { test, expect } from '../../utils/fixtures'; // includes homePage, loginPage, videoPage, assert
import { TestData } from '../../data/TestData';
import { SharedSelectors } from '../../constants/SharedSelectors';
import { HomePageSelectors } from '../../constants/HomePageSelectors';
import { VideoPageSelectors } from '../../constants/VideoPageSelectors';

test.describe('Searching, commenting and editing/deleting comment on video', () => {
  test('should play video, add/edit/delete comment', async ({ page, homePage, loginPage, videoPage, assert,mediaPage,controlPanel }) => {


    await loginPage.login(TestData.USER.email, TestData.USER.password);
    await assert.toBeVisible(page.locator(SharedSelectors.NAVIGATION.PROFILE_TOGGLE), 'Profile Toggle after login');


    //uploadFile
        //Uploading Video with Seperate Steps and assertions
        await homePage.clickMediaButton();
        await mediaPage.uploadVideo(TestData.Video.Video_Path);
        //#endregion
    
        await homePage.clicktoggleButton();  
        await controlPanel.waitForWorkflowToFinish(TestData.ControlPanel.VideoTitle2);


    await homePage.Search(TestData.Video.VideoTitle);

    // const videoLocator = page.locator(HomePageSelectors.Video_Link(TestData.Video.VideoPartialtext));
    // await assert.toBeVisible(videoLocator, 'Video link from search results');

    await videoPage.clickVideo(TestData.Video.VideoPartialtext);

    // const headingLocator = page.locator(VideoPageSelectors.Video_Heading(TestData.Video.VideoPartialtext));
    // await assert.toBeVisible(headingLocator, 'Video heading after clicking');

    // Add comment
    await videoPage.CommentingOnVideo(TestData.Video.Video_Comment);

    const commentLocator = page.locator(VideoPageSelectors.Comment_Text(TestData.Video.Video_Comment_Search));
    await assert.toBeVisible(commentLocator.nth(1), `Comment "${TestData.Video.Video_Comment_Search}"`);

    // Edit comment
    await videoPage.SearchComment_VisibleAndEdit(
      TestData.Video.Video_Comment_Search,
      TestData.Video.New_Comment
    );

    const updatedCommentLocator = page.locator(
        VideoPageSelectors.Comment_Text(TestData.Video.New_Comment)
    );
    await assert.toBeVisible(updatedCommentLocator, `Updated comment: "${TestData.Video.New_Comment}"`);

    // Delete comment
    await videoPage.SearchComment_VisibleAndDelete(TestData.Video.Video_Comment_Delete);

    const deletedCommentLocator = page.locator(
        VideoPageSelectors.Comment_Text(TestData.Video.Video_Comment_Delete)
    );
    await expect(deletedCommentLocator, `Deleted comment "${TestData.Video.Video_Comment_Delete}" should be gone`).toHaveCount(0);

    await homePage.logout();
  });
});
