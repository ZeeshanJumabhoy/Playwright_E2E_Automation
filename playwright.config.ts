import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    timeout: 60000,
    expect: {
        timeout: 20000
    },
    fullyParallel: true, // Keep false for now since you're using beforeAll
    retries: 0,
    //workers: 1,
    reporter: [
        ['html', { outputFolder: 'reports/html-report' }],
        ['list']
    ],
    use: {
        baseURL: 'https://20250618-44-gcajqykf.automation.beta.vidizmo.com/home',
        trace: 'retain-on-failure',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        headless: false, // Set to true for CI/CD
        actionTimeout: 20000,
        navigationTimeout: 60000 ,
        launchOptions:{
            slowMo: 1000
        }
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'],
            viewport: { width: 1820, height:900 }, }
        },
        // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
    ],
    outputDir: 'test-results/',
});
