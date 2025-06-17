import { Page, Locator, expect } from '@playwright/test';
import { BaseComponent } from '../pages/base/BaseComponent';
import { Selectors } from '../constants/Selectors';
import { AppConstants } from '../constants/AppConstants';

export class NavigationComponent extends BaseComponent {
    private readonly signInButton: Locator;
    private readonly profileToggle: Locator;
    private readonly signOutButton: Locator;

    constructor(page: Page) {
        super(page);
        this.signInButton = this.page.locator(Selectors.NAVIGATION.SIGN_IN_BUTTON);
        this.profileToggle = this.page.locator(Selectors.NAVIGATION.PROFILE_TOGGLE);
        this.signOutButton = this.page.locator(Selectors.NAVIGATION.SIGN_OUT_BUTTON);
    }

    async clickSignIn(): Promise<void> {
        await this.clickElement(this.signInButton.nth(0), 'Sign In Button');
    }

    async isUserLoggedIn(): Promise<boolean> {
        try {
            await this.waitHelper.waitForElementToBeVisible(this.profileToggle, 3000);
            return true;
        } catch {
            return false;
        }
    }

    async logout(): Promise<void> {
        this.logger.info('Starting logout process');
        
        // Click profile toggle
        await this.clickElement(this.profileToggle, 'Profile Toggle Button');
        
        // Wait for dropdown to appear
        await this.waitHelper.waitWithTimeout(AppConstants.SHORT_WAIT);
        
        // Click sign out
        await this.waitHelper.waitForElementToBeVisible(this.signOutButton);
        await this.waitHelper.waitWithTimeout(AppConstants.SHORT_WAIT);
        await this.clickElement(this.signOutButton, 'Sign Out Button');
        
        // Wait for logout to complete
        await this.waitHelper.waitWithTimeout(AppConstants.SHORT_WAIT);
        
        this.logger.info('Logout completed');
    }

    async validateLogoutSuccess(): Promise<void> {
        // Check if sign in button is visible after logout
        const signInButtons = this.page.locator(Selectors.NAVIGATION.SIGN_IN_BUTTON);
        const count = await signInButtons.count();
        
        if (count > 0) {
            const signInBtn = signInButtons.nth(0);
            await expect(signInBtn).toBeVisible();
            this.logger.info('Logout validation successful - Sign In button visible');
        } else {
            this.logger.warn('Sign In button not found after logout');
            throw new Error('Logout validation failed - Sign In button not visible');
        }
    }


    
}
