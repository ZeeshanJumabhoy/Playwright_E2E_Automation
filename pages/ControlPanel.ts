import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../base/BasePage';
import { SharedSelectors } from '../constants/SharedSelectors';
import { HomePageSelectors } from '../constants/HomePageSelectors';

export class Control_Panel {
    private readonly page: Page;
    private readonly basePage: BasePage;
    // Locators
    private readonly controlPanelButton: Locator;
    private readonly workflowsButton: Locator;
    private readonly statelocator: Locator;
    private readonly percentageLocator: Locator;
    private readonly refreshbutton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.basePage = new BasePage(page);

        // Control Panel Elements
        this.controlPanelButton = this.page.locator(HomePageSelectors.controlPanel_Button);
        this.workflowsButton = this.page.locator(SharedSelectors.CONTROL_PANEL.workflows_Button);
        this.statelocator = this.page.locator(SharedSelectors.CONTROL_PANEL.state_locator);
        this.percentageLocator = this.page.locator(SharedSelectors.CONTROL_PANEL.percentage_locator);
        this.refreshbutton= this.page.locator(SharedSelectors.CONTROL_PANEL.refresh_button);
    }

    async clickControlPanel(): Promise<void> { 
        await this.basePage.clickElement(this.controlPanelButton, 'Control Panel Button');
    }

    async validateControlPageLoaded(expectedTitle: string): Promise<void> {
        await expect(this.page).toHaveTitle(expectedTitle);
        this.basePage.logger.info(`Control page loaded with correct title: ${expectedTitle}`);
    }

    async clickWorkflows(): Promise<void> {
        await this.basePage.clickElement(this.workflowsButton, 'Workflows Button');
    }

    async validateWorkflowsPageLoaded(expectedTitle: string): Promise<void> {
        await expect(this.page).toHaveTitle(expectedTitle);
        this.basePage.logger.info(`Media page loaded with correct title: ${expectedTitle}`);
    }

    //Chnage to made in thsi as well
    async waitForWorkflowToFinish(objectid: string): Promise<void> {
        await this.basePage.clickElement(this.controlPanelButton, 'Control Panel Button');
        await this.basePage.clickElement(this.workflowsButton, 'Workflows Button');

        this.basePage.logger.info(`Waiting for video "${objectid}" to finish processing...`);
    
        const pollingInterval = 5000; // 5 seconds
        const maxRetries = 1000;
    
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            await this.refreshbutton.click(); 
            await this.page.waitForTimeout(1000);
    
            const rowLocator = this.page.locator(SharedSelectors.CONTROL_PANEL.Video_row_locator(objectid));
            const isRowVisible = await rowLocator.isVisible();
    
            if (!isRowVisible) {
                this.basePage.logger.warn(`Video "${objectid}" not found in table. Retrying in ${pollingInterval / 1000}s...`);
                await this.page.waitForTimeout(pollingInterval);
                continue;
            }
    
            const stateLocator = rowLocator.locator(this.statelocator);
            const percentageLocator = rowLocator.locator(this.percentageLocator);
    
            const stateText = await stateLocator.textContent();
            const percentageText = await percentageLocator.textContent();
    
            this.basePage.logger.info(`Check #${attempt} - State: "${stateText?.trim()}", Progress: ${percentageText?.trim()}`);
    
            if (stateText?.trim() === 'Finished') {
                this.basePage.logger.info(`Video "${objectid}" has finished processing.`);
                return;
            }
    
            if (stateText?.trim() === 'Failed') {
                throw new Error(`Video "${objectid}" failed to process.`);
            }
    
            await this.page.waitForTimeout(pollingInterval);
        }
    
        throw new Error(`Video "${objectid}" did not finish processing after ${maxRetries * (pollingInterval / 1000)} seconds`);
    }
    
}
