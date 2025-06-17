import { Page, expect } from '@playwright/test';
import { BasePage } from './base/BasePage';
import { NavigationComponent } from '../components/NavigationComponent';
import { AppConstants } from '../constants/AppConstants';
import { IUser } from '../interfaces/IUser';

export class HomePage extends BasePage {
    private readonly navigation: NavigationComponent;

    constructor(page: Page) {
        super(page);
        this.navigation = new NavigationComponent(page);
    }

    async navigateToHomePage(): Promise<void> {
        await this.navigateTo(AppConstants.BASE_URL);
    }

    async validateHomePageLoaded(user: IUser): Promise<void> {
        if (user.expectedTitle) {
            await expect(this.page).toHaveTitle(user.expectedTitle);
            this.logger.info(`Home page loaded with correct title: ${user.expectedTitle}`);
        }
    }

    getNavigation(): NavigationComponent {
        return this.navigation;
    }
}
