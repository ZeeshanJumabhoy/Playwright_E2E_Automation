import { Page, expect } from '@playwright/test';
import { IPage } from '../interfaces/IPage';
import { Logger } from '../utils/Logger';
import { WaitHelper } from '../utils/WaitHelper';

export abstract class BasePage implements IPage {
  protected logger: Logger;
  protected waitHelper: WaitHelper;

  constructor(public page: Page) {
    this.logger = Logger.getInstance();
    this.waitHelper = new WaitHelper(page);
  }
    takeScreenshot(name: string): Promise<void> {
        throw new Error('Method not implemented.');
    }

  async navigate(url?: string): Promise<void> {
    const targetUrl = url || this.getPageUrl();
    this.logger.info(`Navigating to: ${targetUrl}`);
    await this.page.goto(targetUrl);
    await this.waitForPageLoad();
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
    await this.waitHelper.waitForElement(this.getPageLoadedIndicator());
  }

  protected abstract getPageUrl(): string;
  protected abstract getPageLoadedIndicator(): string;

  protected async clickElement(selector: string, options?: { timeout?: number }): Promise<void> {
    this.logger.info(`Clicking element: ${selector}`);
    await this.waitHelper.waitForElement(selector, options?.timeout);
    await this.page.click(selector);
  }

  protected async fillInput(selector: string, value: string): Promise<void> {
    this.logger.info(`Filling input ${selector} with value: ${value}`);
    await this.waitHelper.waitForElement(selector);
    await this.page.fill(selector, value);
  }

  protected async getText(selector: string): Promise<string> {
    await this.waitHelper.waitForElement(selector);
    return await this.page.textContent(selector) || '';
  }

  protected async isVisible(selector: string): Promise<boolean> {
    try {
      return await this.page.isVisible(selector);
    } catch {
      return false;
    }
  }
}
