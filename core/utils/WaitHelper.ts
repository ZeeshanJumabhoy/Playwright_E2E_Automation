import { Page, Locator } from '@playwright/test';

export class WaitHelper {
  constructor(private page: Page) {}

  async waitForElement(selector: string, timeout: number = 30000): Promise<Locator> {
    const element = this.page.locator(selector);
    await element.waitFor({ state: 'visible', timeout });
    return element;
  }

  async waitForElementToBeHidden(selector: string, timeout: number = 30000): Promise<void> {
    await this.page.locator(selector).waitFor({ state: 'hidden', timeout });
  }

  async waitForText(selector: string, text: string, timeout: number = 30000): Promise<void> {
    await this.page.waitForFunction(
      (args) => {
        const element = document.querySelector(args.selector);
        return element && element.textContent?.includes(args.text);
      },
      { selector, text },
      { timeout }
    );
  }

  async waitForVideoToPlay(videoSelector: string, timeout: number = 10000): Promise<void> {
    await this.page.waitForFunction(
      (selector) => {
        const video = document.querySelector(selector) as HTMLVideoElement;
        return video && !video.paused && video.currentTime > 0;
      },
      videoSelector,
      { timeout }
    );
  }
}
