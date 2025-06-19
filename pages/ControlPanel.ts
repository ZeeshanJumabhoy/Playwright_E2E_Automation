import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base/BasePage';
import { Selectors } from '../constants/Selectors';

export class Control_Panel extends BasePage {
    constructor(page: Page) {
        super(page);
        //Locators will come here 
    }

    async clickControlPanel(): Promise<void> { 
        const Control_PanelButton = this.page.locator(Selectors.Main_PAGE.controlPanel_Button);
        await this.waitHelper.waitForElementToBeVisible(Control_PanelButton);
        await this.clickElement(Control_PanelButton, 'Control Panel Button');
    }

    async validateControlPageLoaded(expectedTitle: string): Promise<void> {
        await expect(this.page).toHaveTitle(expectedTitle);
        this.logger.info(`Control page loaded with correct title: ${expectedTitle}`);
    }

    async clickWorkflows(): Promise<void> {
        await this.page.evaluate(() => window.scrollBy(0, 500));
        const workflowsButton = this.page.locator(Selectors.Control_Panel.workflows_Button);
        await this.waitHelper.waitForElementToBeVisible(workflowsButton);
        await this.clickElement(workflowsButton, 'Workflows Button');
    }

    async validateWorkflowsPageLoaded(expectedTitle: string): Promise<void> {
        await expect(this.page).toHaveTitle(expectedTitle);
        this.logger.info(`Media page loaded with correct title: ${expectedTitle}`);
    }

    async waitForWorkflowToFinish(videoTitle: string): Promise<void> {
        this.logger.info(`Waiting for video "${videoTitle}" to finish processing...`);
    
        const pollingInterval = 15000; // 15 seconds
        const maxRetries = 1000;
    
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            await this.page.reload();
    
            const rowLocator = this.page.locator(`tr[data-e2e-tr-object-title="${videoTitle}"]`);
            const isRowVisible = await rowLocator.isVisible();
    
            if (!isRowVisible) {
                this.logger.warn(`Video "${videoTitle}" not found in table. Retrying in ${pollingInterval / 1000}s...`);
                await this.page.waitForTimeout(pollingInterval);
                continue;
            }
    
            const stateLocator = rowLocator.locator('[data-e2e-td="workflow-state"]');
            const percentageLocator = rowLocator.locator('[data-e2e-td="percentage"]');
    
            const stateText = await stateLocator.textContent();
            const percentageText = await percentageLocator.textContent();
    
            this.logger.info(`Check #${attempt} - State: "${stateText?.trim()}", Progress: ${percentageText?.trim()}`);
    
            if (stateText?.trim() === 'Finished') {
                this.logger.info(`Video "${videoTitle}" has finished processing.`);
                return;
            }
    
            await this.page.waitForTimeout(pollingInterval);
        }
    
        throw new Error(`Video "${videoTitle}" did not finish processing after ${maxRetries * (pollingInterval / 1000)} seconds`);
    }    

}


