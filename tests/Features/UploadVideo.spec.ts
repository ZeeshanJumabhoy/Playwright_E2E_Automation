import { test, expect, Page } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { LoginPage } from '../../pages/LoginPage';
import { Video } from '../../pages/Video';
import {Media} from '../../pages/Media';
import { TestData } from '../../data/TestData';
import ts from 'typescript';

test.describe('Uploading Media and Search and then Playing it', () => {
    let page: Page;
    let homePage: HomePage;
    let loginPage: LoginPage;
    let videoPage: Video;
    let mediaPage: Media; 

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        videoPage = new Video(page); 
        mediaPage = new Media(page); 

        await homePage.open();
        await homePage.validateHomePageLoaded(TestData.USER.expectedTitle);
    });

    test('Should login to the account successfully', async () => {
        await test.step('Navigate to login page', async () => {
            await homePage.clickSignIn();
        });

        await test.step('Perform login', async () => {
            await loginPage.login(TestData.USER.email, TestData.USER.password);
        });

        await test.step('Validate login success', async () => {
            const isLoggedIn = await homePage.isUserLoggedIn();
            expect(isLoggedIn).toBeTruthy();
        });
    });

    test('Uploading the Video', async () => {
        await test.step('Navigate to upload page', async () => {
            await homePage.clickMediaButton();
            await homePage.validateMediaPageLoaded(TestData.Media.expectedTitleForAddMedia);
        })

        await test.step('Navigate to Media Upload page', async () => {
            await mediaPage.clickUploadButton();
            await mediaPage.validateUploadPageLoaded(TestData.Media.expectedTitleForUploadMedia);
        })

    });

    test('Should logout from the account successfully', async () => {
        await test.step('Perform logout', async () => {
            await homePage.logout();
        });

        await test.step('Validate logout success', async () => {
            await homePage.validateLogoutSuccess();
        });
    })


    test.afterAll(async () => {
        await page.close();
    });
});
