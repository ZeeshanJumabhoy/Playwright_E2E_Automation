import { test, expect, Page } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { LoginPage } from '../../pages/LoginPage';
import { Video } from '../../pages/Video';
import { TestData } from '../../data/TestData';

test.describe('Searching and playing video with Authentication', () => {
    let page: Page;
    let homePage: HomePage;
    let loginPage: LoginPage;
    let videoPage: Video;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        videoPage = new Video(page); // <-- FIXED

        await homePage.open();
        await homePage.validateHomePageLoaded(TestData.USER.expectedTitle);
    });

    test('Should login to the account successfully', async () => {
        await test.step('Navigate to login page', async () => {
            await homePage.clickSignIn();
        });

        // await test.step('Perform login', async () => {
            await loginPage.login(TestData.USER.email, TestData.USER.password);
        // });
        await test.step('Validate login success', async () => {
            const isLoggedIn = await homePage.isUserLoggedIn();
            expect(isLoggedIn).toBeTruthy();
        });
    });

    test('Searching the Video And Playing it ', async () => {
        await test.step('Searching the video to play', async () => {
            await homePage.Search(TestData.Video.VideoTitle);
        });

        await test.step('Now Verifying whether searched video is displayed', async () => {
            const isVisible = await homePage.isVideoVisible(TestData.Video.VideoPartialtext);

            if (isVisible) {
                console.log("Video is visible. Proceeding to play it.");
                await videoPage.clickVideo(TestData.Video.VideoPartialtext);
                await test.step('Verifying that Video opens or not', async () => {
                    const isVisible = await videoPage.IsVideoHeadingVisible(TestData.Video.VideoPartialtext);

                    if (isVisible) {
                        console.log('Video is opened successfully.');
                    } else {
                        console.error('Video did not open.');
                        throw new Error('Video did not open.');
                    }
                });
            } else {
                console.warn("Searched video is NOT visible. Skipping video play step.");
            }
        });


    });

    test('Comment, Edit, Delete on Video/Post', async()=>{

        await test.step('commenting on the video', async () => {
            await videoPage.CommentingOnVideo(TestData.Video.Video_Comment);
        });

        await test.step('Searching the comment whether is or not', async () => {
            await videoPage.SearchComment_Visible(TestData.Video.Video_Comment_Search);
        });

        //await videoPage.SearchComment_VisibleAndEdit(TestData.Video.Video_Comment_Search,TestData.Video.New_Comment);

        await videoPage.DeleteComment(TestData.Video.Video_Comment_Search);

    })


    // test('Should logout from the account successfully', async () => {
    //     await test.step('Perform logout', async () => {
    //         await homePage.logout();
    //     });

    //     await test.step('Validate logout success', async () => {
    //         await homePage.validateLogoutSuccess();
    //     });
    // })

    test.afterAll(async () => {
        await page.close();
    });
});
