import { test, Page } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { LoginPage } from '../../pages/LoginPage';
import { TestData } from '../../data/TestData';
import { Selectors } from '../../constants/Selectors';
import { AssertHelper } from '../../utils/AssertHelper';

test.describe('Authentication Flow', () => {
    let page: Page;
    let homePage: HomePage;
    let loginPage: LoginPage;
    let assert: AssertHelper;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        assert = new AssertHelper(page);

        await homePage.open();
        await assert.toHaveTitle(TestData.USER.expectedTitle);
    });

    test('Should login to the account successfully', async () => {
        await homePage.clickSignIn();
        await loginPage.login(TestData.USER.email, TestData.USER.password);
        await assert.toBeVisible(page.locator(Selectors.NAVIGATION.PROFILE_TOGGLE), 'Profile Toggle after login');
    });

    test('Should logout from the account successfully', async () => {
        await homePage.logout();
        await assert.toBeVisible(page.locator(Selectors.NAVIGATION.SIGN_IN_BUTTON).first(), 'Sign In Button after logout');
    });
});
