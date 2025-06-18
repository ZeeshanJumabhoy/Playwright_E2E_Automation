import { Page, Locator } from '@playwright/test';
import { BasePage } from './base/BasePage';
import { Selectors } from '../constants/Selectors';

export class LoginPage extends BasePage {
    private readonly emailInput: Locator;
    private readonly passwordInput: Locator;
    private readonly signInButton: Locator;

    constructor(page: Page) {
        super(page);
        this.emailInput = this.page.locator(Selectors.LOGIN_PAGE.EMAIL_INPUT);
        this.passwordInput = this.page.locator(Selectors.LOGIN_PAGE.PASSWORD_INPUT);
        this.signInButton = this.page.locator(Selectors.LOGIN_PAGE.SIGNIN_BUTTON);
    }

    async login(email: string, password: string): Promise<void> {
        this.logger.info(`Logging in user: ${email}`);
        
        await this.fillInput(this.emailInput, email, 'Email Address');
        await this.fillInput(this.passwordInput, password, 'Password');
        await this.clickElement(this.signInButton, 'Sign In Button');
        
        this.logger.info('Login process completed');
    }
}
