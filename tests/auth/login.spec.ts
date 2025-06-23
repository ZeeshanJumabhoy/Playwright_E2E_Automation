import { test, expect } from '../../utils/fixtures'; 
import { TestData } from '../../data/TestData';
import { Selectors } from '../../constants/Selectors';

test.describe('Authentication Flow', () => {
  test('should pass login and logout flow', async ({ page, homePage, loginPage, assert }) => {
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
