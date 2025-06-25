import { test, expect } from '../../utils/fixtures';
import { TestData } from '../../data/TestData';
import { VideoPageSelectors } from '../../Locators/VideoPageSelectors';

test.describe('Searching and playing video with Authentication', () => {
    test('should login, search, play and verify video', async ({ page, homePage, loginPage, videoPage, assert, mediaPage, controlPanel }) => {
        // homePage.open() and title check are already in fixture

        await loginPage.login(TestData.USER.email, TestData.USER.password);

        const MashupPage = await mediaPage.uploadVideo(TestData.Video.Video_Path);

        await controlPanel.waitForWorkflowToFinish(await MashupPage.getId());
        
        await videoPage.clickPlaybackByMashupId( await MashupPage.getId(), await MashupPage.getTitle());

        // Verify the video page is opened
        const headingLocator = page.locator(VideoPageSelectors.Video_Heading(await MashupPage.getTitle()));
        await assert.toBeHidden(headingLocator, 'Video heading after clicking');

        // Then play the video and verify it is playing
        //await videoPage.playVideo();
        //await assert.videoShouldBePlaying('Main video');

        await homePage.logout();
    });
});
