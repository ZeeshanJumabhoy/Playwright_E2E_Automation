import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';
import { LoginPageSelectors } from '../Locators/LoginPageSelectors';
import { SharedSelectors } from '../Locators/SharedSelectors';

export class LoginPage {
    private readonly page: Page;
    private readonly basePage: BasePage;

    private readonly emailInput: Locator;
    private readonly passwordInput: Locator;
    private readonly signInButton: Locator;
    private readonly signInProfile: Locator;

    constructor(page: Page) {
        this.page = page;
        this.basePage = new BasePage(page);

        this.emailInput = page.locator(LoginPageSelectors.EMAIL_INPUT);
        this.passwordInput = page.locator(LoginPageSelectors.PASSWORD_INPUT);
        this.signInButton = page.locator(LoginPageSelectors.SIGNIN_BUTTON);
        this.signInProfile = page.locator(SharedSelectors.NAVIGATION.SIGN_IN_BUTTON);
    }

    async login(email: string, password: string): Promise<void> {
        await this.basePage.clickElement(this.signInProfile, 'Sign In Button');
        this.basePage.logger.info(`Logging in user: ${email}`);
        
        await this.basePage.fillInput(this.emailInput, email, 'Email Address');
        await this.basePage.fillInput(this.passwordInput, password, 'Password');
        await this.basePage.clickElement(this.signInButton, 'Sign In Button');

        this.basePage.logger.info('Login process completed');
    }
}
