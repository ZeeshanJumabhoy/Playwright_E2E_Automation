import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';
import { LoginPageSelectors } from '../constants/LoginPageSelectors';
import { SharedSelectors } from '../constants/SharedSelectors';
import { HomePage } from './HomePage';

export class LoginPage extends BasePage {
    private readonly emailInput: Locator;
    private readonly passwordInput: Locator;
    private readonly signInButton: Locator;
    private readonly signInProfile: Locator;

    constructor(page: Page) {
        super(page);
        this.emailInput = this.page.locator(LoginPageSelectors.EMAIL_INPUT);
        this.passwordInput = this.page.locator(LoginPageSelectors.PASSWORD_INPUT);
        this.signInButton = this.page.locator(LoginPageSelectors.SIGNIN_BUTTON);
        this.signInProfile = this.page.locator(SharedSelectors.NAVIGATION.SIGN_IN_BUTTON);
    }

    async login(email: string, password: string): Promise<void> {
        await this.clickElement(this.signInProfile, 'Sign In Button');
        this.logger.info(`Logging in user: ${email}`);
        
        await this.fillInput(this.emailInput, email, 'Email Address');
        await this.fillInput(this.passwordInput, password, 'Password'); 
        await this.clickElement(this.signInButton, 'Sign In Button');
        
        this.logger.info('Login process completed');
    }
}
