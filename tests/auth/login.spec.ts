import { test, expect, Page } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { LoginPage } from '../../pages//LoginPage';
import { UserCredentials } from '../../data/UserCredentials';

test.describe('Authentication Flow', () => {
    let page: Page;
    let homePage: HomePage;
    let loginPage: LoginPage;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        
        // Navigate to home page and validate
        await homePage.navigateToHomePage();
        await homePage.validateHomePageLoaded(UserCredentials.TEST_USER);
    });

    test('Should login to the account successfully', async () => {
        await test.step('Navigate to login page', async () => {
            const navigation = homePage.getNavigation();
            await navigation.clickSignIn();
        });

        await test.step('Perform login', async () => {
            await loginPage.login(UserCredentials.TEST_USER);
        });

        await test.step('Validate login success', async () => {
            const navigation = homePage.getNavigation();
            const isLoggedIn = await navigation.isUserLoggedIn();
            expect(isLoggedIn).toBeTruthy();
        });
    });

    test('Should logout from the account successfully', async () => {
        await test.step('Perform logout', async () => {
            const navigation = homePage.getNavigation();
            await navigation.logout();
        });

        await test.step('Validate logout success', async () => {
            const navigation = homePage.getNavigation();
            await navigation.validateLogoutSuccess();
        });
    });

    test.afterAll(async () => {
        await page.close();
    });
});
