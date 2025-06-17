import { Page } from '@playwright/test';
import { HomePage } from './HomePage';
import { LoginPage } from './LoginPage';

export class PageFactory {
    constructor(private page: Page) {}

    createHomePage(): HomePage {
        return new HomePage(this.page);
    }

    createLoginPage(): LoginPage {
        return new LoginPage(this.page);
    }
}
