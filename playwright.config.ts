import { defineConfig, devices } from '@playwright/test';
import { getEnvironmentConfig, getBaseURL, validateEnvironmentConfig } from './src/config';

// Get environment configuration
const envConfig = getEnvironmentConfig();

// Validate configuration
validateEnvironmentConfig(envConfig);

// Log current environment info
console.log(`🌍 Running tests against: ${getBaseURL()}`);
console.log(`📊 Environment: ${process.env.TEST_ENV || process.env.NODE_ENV || 'production'}`);

/**
 * Dynamic Playwright Configuration
 * Supports multiple environments via TEST_ENV or NODE_ENV environment variables
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  
  /* Global timeout for each test */
  timeout: envConfig.timeout,
  
  /* Run tests in files in parallel */
  fullyParallel: true,
  
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  
  /* Environment-driven retry configuration */
  retries: envConfig.retries,
  
  /* Environment-driven worker configuration */
  workers: envConfig.workers,
  
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Dynamic base URL from environment configuration */
    baseURL: getBaseURL(),

    /* Environment-driven headless mode */
    headless: envConfig.headless,

    /* Environment-driven slow motion (for debugging) */
    ...(envConfig.slowMo && { slowMo: envConfig.slowMo }),

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
