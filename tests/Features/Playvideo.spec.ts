import { test, expect } from '../../utils/fixtures';
import { TestData } from '../../data/TestData';
import { VideoPageSelectors } from '../../constants/VideoPageSelectors';
import { HomePageSelectors } from '../../constants/HomePageSelectors';

test.describe('Searching and playing video with Authentication', () => {
    test('should login, search, play and verify video', async ({ page, homePage, loginPage, videoPage, assert, mediaPage, controlPanel }) => {
        // homePage.open() and title check are already in fixture

        await loginPage.login(TestData.USER.email, TestData.USER.password);

                //uploadFile
        //Uploading Video with Seperate Steps and assertions
        await homePage.clickMediaButton();
        await mediaPage.uploadVideo(TestData.Video.Video_Path);
        //#endregion
    
        await homePage.clicktoggleButton();  
        await controlPanel.waitForWorkflowToFinish(TestData.ControlPanel.VideoTitle2);

        // Searcing and Validating that Video Founf or not
        await homePage.Search(TestData.Video.VideoTitle);

        const videoLocator = page.locator(HomePageSelectors.Video_Link(TestData.Video.VideoPartialtext));
        await assert.toBeVisible(videoLocator, 'Video link from search results');

        // If found then going on the video page
        await videoPage.clickVideo(TestData.Video.VideoPartialtext);

        const headingLocator = page.locator(VideoPageSelectors.Video_Heading(TestData.Video.VideoPartialtext));
        await assert.toBeVisible(headingLocator, 'Video heading after clicking');

        // Then play the video and verify it is playing
        //await videoPage.playVideo();
        //await assert.videoShouldBePlaying('Main video');

        await homePage.logout();
    });
});
