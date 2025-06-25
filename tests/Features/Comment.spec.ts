import { test, expect } from '../../utils/fixtures'; // includes homePage, loginPage, videoPage, assert
import { TestData } from '../../data/TestData';
import { SharedSelectors } from '../../Locators/SharedSelectors';
import { HomePageSelectors } from '../../Locators/HomePageSelectors';
import { VideoPageSelectors } from '../../Locators/VideoPageSelectors';

test.describe('Searching, commenting and editing/deleting comment on video', () => {
    test('should play video, add/edit/delete comment', async ({ page, homePage, loginPage, videoPage, assert, mediaPage, controlPanel }) => {


        await loginPage.login(TestData.USER.email, TestData.USER.password);

        const MashupPage = await mediaPage.uploadVideo(TestData.Video.Video_Path);

        await controlPanel.waitForWorkflowToFinish(await MashupPage.getId());
        //#endregion

        // Add comment
        await videoPage.CommentingOnVideo(TestData.Video.Video_Comment, await MashupPage.getId(), await MashupPage.getTitle());
        const commentLocator = page.locator(VideoPageSelectors.Comment_Text(TestData.Video.Video_Comment));
        await assert.toBeHidden(commentLocator, `Comment "${TestData.Video.Video_Comment}"`);

        // Edit comment
        await videoPage.SearchComment_VisibleAndEdit(TestData.Video.Video_Comment_Edit, TestData.Video.New_Comment, await MashupPage.getId(), await MashupPage.getTitle());
        const updatedCommentLocator = page.locator(VideoPageSelectors.Comment_Text(TestData.Video.New_Comment));
        await assert.toBeVisible(updatedCommentLocator, `Updated comment: "${TestData.Video.New_Comment}"`);

        // Delete comment
        await videoPage.SearchComment_VisibleAndDelete(TestData.Video.Video_Comment_To_Delete,  await MashupPage.getId(), await MashupPage.getTitle());
        const deletedCommentLocator = page.locator(VideoPageSelectors.Comment_Text(TestData.Video.Video_Comment_To_Delete));
        await expect(deletedCommentLocator, `Deleted comment "${TestData.Video.Video_Comment_To_Delete}" should be gone`).toHaveCount(1);

        await homePage.logout();
    });
});
