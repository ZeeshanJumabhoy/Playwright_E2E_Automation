import { test, expect } from '../../utils/fixtures'; // Your custom fixture file
import { LoginPage } from '../../pages/LoginPage';
import { TestData } from '../../data/TestData';
import { Selectors } from '../../constants/Selectors';

test.describe('Authentication Flow', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page, homePage, assert }) => {
        loginPage = new LoginPage(page);

    });

    test('should pass login and logout flow', async ({ page, homePage, assert }) => {

        await homePage.clickSignIn();
        await loginPage.login(TestData.USER.email, TestData.USER.password);
        await assert.toBeVisible(page.locator(Selectors.NAVIGATION.PROFILE_TOGGLE), 'Profile Toggle after login');

        await homePage.logout();
        await assert.toBeVisible(
            page.locator(Selectors.NAVIGATION.SIGN_IN_BUTTON).first(),
            'Sign In Button after logout'
        );
    });
});
