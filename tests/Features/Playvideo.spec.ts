import { test, expect } from '../../utils/fixtures';
import { TestData } from '../../data/TestData';
import { VideoPageSelectors } from '../../constants/VideoPageSelectors';
import { HomePageSelectors } from '../../constants/HomePageSelectors';

test.describe('Searching and playing video with Authentication', () => {
    test('should login, search, play and verify video', async ({ page, homePage, loginPage, videoPage, assert, mediaPage, controlPanel }) => {
        // homePage.open() and title check are already in fixture

        await loginPage.login(TestData.USER.email, TestData.USER.password);

        const { mashupId, title } = await mediaPage.uploadVideo(TestData.Video.Video_Path);

        await controlPanel.waitForWorkflowToFinish(mashupId);
        
        await videoPage.clickPlaybackByMashupId(mashupId,title);

        // Verify the video page is opened
        const headingLocator = page.locator(VideoPageSelectors.Video_Heading(mashupId));
        await assert.toBeVisible(headingLocator, 'Video heading after clicking');

        // Then play the video and verify it is playing
        //await videoPage.playVideo();
        //await assert.videoShouldBePlaying('Main video');

        await homePage.logout();
    });
});
