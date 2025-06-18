import { test, expect, Page } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { LoginPage } from '../../pages/LoginPage';
import { TestData } from '../../data/TestData';

test.describe('Authentication Flow', () => {
    let page: Page;
    let homePage: HomePage;
    let loginPage: LoginPage;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        
        // Navigate to home page and validate
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

    test('Should logout from the account successfully', async () => {
        await test.step('Perform logout', async () => {
            await homePage.logout();
        });

        await test.step('Validate logout success', async () => {
            await homePage.validateLogoutSuccess();
        });
    });

    test.afterAll(async () => {
        await page.close();
    });
});
