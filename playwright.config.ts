import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    timeout: 60000,
    expect: {
        timeout: 10000
    },
    fullyParallel: false, // Keep false for now since you're using beforeAll
    retries: 1,
    workers: 1,
    reporter: [
        ['html', { outputFolder: 'reports/html-report' }],
        ['list']
    ],
    use: {
        baseURL: 'http://20250611-6-scmwvahh.t6.beta.vidizmo.com/home',
        trace: 'retain-on-failure',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        headless: false, // Set to true for CI/CD
        actionTimeout: 15000,
        navigationTimeout: 30000 ,
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
