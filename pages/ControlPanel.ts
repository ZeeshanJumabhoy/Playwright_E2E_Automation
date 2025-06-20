import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base/BasePage';
import { Selectors } from '../constants/Selectors';

export class Control_Panel extends BasePage {
    // Locators
    private readonly controlPanelButton: Locator;
    private readonly workflowsButton: Locator;
    private readonly statelocator: Locator;
    private readonly percentageLocator: Locator;

    constructor(page: Page) {
        super(page);

        // Control Panel Elements
        this.controlPanelButton = this.page.locator(Selectors.Main_PAGE.controlPanel_Button);
        this.workflowsButton = this.page.locator(Selectors.Control_Panel.workflows_Button);
        this.statelocator= this.page.locator(Selectors.Control_Panel.state_locator);
        this.percentageLocator = this.page.locator(Selectors.Control_Panel.percentage_locator);
    }

    async clickControlPanel(): Promise<void> { 
        await this.clickElement(this.controlPanelButton, 'Control Panel Button');
    }

    async validateControlPageLoaded(expectedTitle: string): Promise<void> {
        await expect(this.page).toHaveTitle(expectedTitle);
        this.logger.info(`Control page loaded with correct title: ${expectedTitle}`);
    }

    async clickWorkflows(): Promise<void> {
        await this.clickElement(this.workflowsButton, 'Workflows Button');
    }

    async validateWorkflowsPageLoaded(expectedTitle: string): Promise<void> {
        await expect(this.page).toHaveTitle(expectedTitle);
        this.logger.info(`Media page loaded with correct title: ${expectedTitle}`);
    }

    async waitForWorkflowToFinish(videoTitle: string): Promise<void> {
        this.logger.info(`Waiting for video "${videoTitle}" to finish processing...`);

        const pollingInterval = 15000;
        const maxRetries = 1000;

        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            await this.page.reload();

            const rowLocator = this.page.locator(Selectors.Control_Panel.Video_row_locator(videoTitle));
            const isRowVisible = await rowLocator.isVisible();

            if (!isRowVisible) {
                this.logger.warn(`Video "${videoTitle}" not found in table. Retrying in ${pollingInterval / 1000}s...`);
                await this.page.waitForTimeout(pollingInterval);
                continue;
            }

            const stateLocator = rowLocator.locator( this.statelocator);
            const percentageLocator = rowLocator.locator(this.percentageLocator);

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
