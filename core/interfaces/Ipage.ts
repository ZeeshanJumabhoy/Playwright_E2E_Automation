import { Page } from '@playwright/test';

export interface IPage {
  page: Page;
  navigate(url?: string): Promise<void>;
  waitForPageLoad(): Promise<void>;
  takeScreenshot(name: string): Promise<void>;
}
