# Playwright Test Framework

A clean and simple Playwright test automation framework demonstrating best practices.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm 8+

### Installation
```bash
# Install dependencies
npm install

# Install Playwright browsers
npm run install:browsers
```

### Running Tests
```bash
# Run all tests
npm test

# Run tests with browser UI
npm run test:headed

# Run tests in debug mode
npm run test:debug

# Run tests in UI mode
npm run test:ui

# Run smoke tests only
npm run test:smoke

# Run tests on specific browsers
npm run test:chromium
npm run test:firefox
npm run test:webkit

# View test report
npm run report

# Clean test results
npm run clean

# Environment-specific test execution
npm run test:production     # Test against production environment
npm run test:staging        # Test against staging environment
npm run test:development    # Test against development environment
npm run test:local          # Test against local environment

# Environment-specific smoke tests
npm run test:smoke:staging     # Smoke tests on staging
npm run test:smoke:development # Smoke tests on development

# Custom URL testing
BASE_URL=https://custom-domain.com npm run test:custom
```

## 🌍 Environment Configuration

The framework supports multiple environments with dynamic configuration based on environment variables.

### Environment Variables

#### Primary Configuration
- **`TEST_ENV`** - Specifies the test environment (overrides NODE_ENV)
- **`BASE_URL`** - Direct URL override (takes precedence over environment config)
- **`NODE_ENV`** - Fallback environment if TEST_ENV is not set
- **`CI`** - Automatically detected CI environment

#### Available Environments
- **`production`** - Default production environment (https://playwright.dev)
- **`staging`** - Staging environment (https://staging.playwright.dev)
- **`development`** - Development environment (https://dev.playwright.dev)
- **`local`** - Local development (http://localhost:3000)
- **`ci`** - CI-specific configuration (auto-detected)

### Environment Configuration File
[`src/config/environment.ts`](src/config/environment.ts) defines environment-specific settings:

```typescript
export const environments = {
  production: {
    baseURL: 'https://playwright.dev',
    timeout: 30000,
    retries: 2,
    headless: true,
  },
  development: {
    baseURL: 'https://dev.playwright.dev',
    timeout: 60000,
    retries: 0,
    headless: false,
    slowMo: 100,
  },
  local: {
    baseURL: 'http://localhost:3000',
    timeout: 60000,
    retries: 0,
    headless: false,
    slowMo: 500,
  }
};
```

### Usage Examples

#### Using Environment Variables
```bash
# Test against staging
TEST_ENV=staging npm test

# Test against custom URL
BASE_URL=https://my-app.com npm test

# Local development with slow motion
TEST_ENV=local npm test
```

#### Using npm Scripts
```bash
# Predefined environment scripts
npm run test:staging
npm run test:development
npm run test:local

# Environment-specific smoke tests
npm run test:smoke:staging
```

#### Direct Environment Variables
```bash
# Set environment variables directly
TEST_ENV=development npm test
BASE_URL=https://my-custom-domain.com npm test

# Or export for multiple commands
export TEST_ENV=development
export BASE_URL=https://my-custom-domain.com
npm test
```

### Dynamic Configuration Benefits
- **Easy Environment Switching** - Change environments without code modifications
- **Environment-Specific Settings** - Different timeouts, retries, and behaviors per environment
- **CI/CD Integration** - Automatic environment detection and configuration
- **Local Development** - Optimized settings for debugging (headless: false, slowMo)
- **URL Override** - Direct BASE_URL override for ad-hoc testing

## 📁 Project Structure

```
playwright-tests/
├── src/
│   ├── config/              # Environment configuration
│   │   ├── index.ts         # Config exports
│   │   └── environment.ts   # Environment-specific settings
│   ├── pages/               # Page Object Models
│   │   ├── index.ts         # Page exports
│   │   ├── base-page.ts     # Base page class
│   │   └── playwright-website-page.ts  # Playwright website page object
│   ├── test-data/           # Externalized test data
│   │   ├── index.ts         # Test data exports
│   │   └── playwright-website-data.ts  # Test data constants
│   └── utils/               # Common utilities
│       └── common-utils.ts  # Reusable utility functions
├── tests/                   # Test files
│   ├── example.spec.ts      # Basic example tests
│   └── playwright-website.spec.ts  # Playwright website tests
├── playwright.config.ts     # Dynamic Playwright configuration
├── package.json            # Dependencies and scripts
└── README.md               # This file
```

## 🏗️ Page Object Model

This framework implements the **Page Object Model (POM)** design pattern for better maintainability and reusability.

### Base Page Class
[`src/pages/base-page.ts`](src/pages/base-page.ts) provides common functionality:

```typescript
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  // ... other common methods
}
```

### Page-Specific Classes
[`src/pages/playwright-website-page.ts`](src/pages/playwright-website-page.ts) extends the base class:

```typescript
export class PlaywrightWebsitePage extends BasePage {
  readonly docsLink: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    super(page);
    this.docsLink = page.getByRole('link', { name: 'Docs' });
    this.searchButton = page.getByRole('button', { name: 'Search' });
  }

  async navigateToHomepage(): Promise<void> {
    await this.goto('/');
    await this.waitForPageLoad();
  }

  async navigateToDocs(): Promise<void> {
    await this.click(this.docsLink);
    await this.waitForPageLoad();
  }
}
```

## 🛠️ Common Utilities

The framework includes reusable utility functions to eliminate code duplication and improve maintainability.

### Assertion Utils
[`src/utils/common-utils.ts`](src/utils/common-utils.ts) provides common assertion methods:

```typescript
import { AssertionUtils } from '../src/utils/common-utils';

// Assert title contains text
await AssertionUtils.assertTitleContains(page, 'Playwright');

// Assert URL contains pattern
await AssertionUtils.assertUrlContains(page, 'docs');

// Assert heading is visible
await AssertionUtils.assertHeadingVisible(page, /Installation|Getting started/i);
```

### Navigation Utils
Common navigation patterns:

```typescript
import { NavigationUtils } from '../src/utils/common-utils';

// Navigate to homepage
await NavigationUtils.goToHomepage(page);

// Navigate to specific path
await NavigationUtils.goToPath(page, '/docs');
```

### Interaction Utils
Reusable interaction methods:

```typescript
import { InteractionUtils } from '../src/utils/common-utils';

// Click link by text
await InteractionUtils.clickLinkByText(page, 'Get started');

// Perform search
await InteractionUtils.performSearch(page, 'test query');
```

### Validation Utils
Common validation helpers:

```typescript
import { ValidationUtils } from '../src/utils/common-utils';

// Check if URL contains text
const isOnDocsPage = await ValidationUtils.isUrlContaining(page, '/docs');

// Wait for any selector to be visible
const isVisible = await ValidationUtils.waitForAnySelector(page, ['.search-results', '.search-input']);
```

## 📊 Test Data Management

The framework uses externalized test data for better maintainability and reusability.

### Centralized Test Data
[`src/test-data/playwright-website-data.ts`](src/test-data/playwright-website-data.ts) contains all test constants:

```typescript
export const TestData = {
  titles: {
    expectedTitleText: 'Playwright',
    titlePattern: /Playwright/
  },
  search: {
    searchTerm: 'test',
    searchQuery: 'test'
  },
  headings: {
    installationHeading: 'Installation',
    installationOrGettingStarted: /Installation|Getting started/i
  },
  links: {
    docsLinkText: 'Docs',
    getStartedLinkText: 'Get started'
  },
  expectations: {
    titleShouldContainPlaywright: true,
    shouldBeOnDocsPage: true,
    searchResultsShouldBeVisible: true
  }
} as const;
```

### Usage in Tests
```typescript
import { TestData } from '../src/test-data';

test(TestData.testNames.titleTest, async ({ page }) => {
  const playwrightPage = new PlaywrightWebsitePage(page);
  
  await playwrightPage.navigateToHomepage();
  
  const titleContains = await playwrightPage.verifyTitleContains(TestData.titles.expectedTitleText);
  expect(titleContains).toBe(TestData.expectations.titleShouldContainPlaywright);
});
```

### Benefits of Externalized Test Data
- **Maintainability**: Update test data in one place
- **Reusability**: Share data across multiple tests
- **Type Safety**: Full TypeScript support with `as const`
- **Consistency**: Standardized data across the framework
- **Easy Updates**: Change test scenarios without touching test logic

## 🧪 Test Examples

### Using Page Object Model
```typescript
import { test, expect } from '@playwright/test';
import { PlaywrightWebsitePage } from '../src/pages';

test('should have correct title', async ({ page }) => {
  const playwrightPage = new PlaywrightWebsitePage(page);
  
  await playwrightPage.navigateToHomepage();
  
  const titleContainsPlaywright = await playwrightPage.verifyTitleContains('Playwright');
  expect(titleContainsPlaywright).toBe(true);
});
```

### Navigation Test with POM
```typescript
test('should navigate to docs page', async ({ page }) => {
  const playwrightPage = new PlaywrightWebsitePage(page);
  
  await playwrightPage.navigateToHomepage();
  await playwrightPage.navigateToDocs();
  
  const isOnDocsPage = await playwrightPage.isOnDocsPage();
  expect(isOnDocsPage).toBe(true);
});
```

## ⚙️ Configuration

The framework is configured in [`playwright.config.ts`](playwright.config.ts) with:

- **Multi-browser support**: Chrome, Firefox, Safari
- **Parallel execution**: Tests run in parallel for faster feedback
- **Retry mechanism**: Automatic retries on CI
- **Rich reporting**: HTML reports with traces and screenshots
- **Base URL**: Configured for https://playwright.dev

## 🎯 Features

- ✅ **Page Object Model**: Clean, maintainable test architecture
- ✅ **Dynamic Environment Configuration**: Easy switching between environments
- ✅ **Externalized Test Data**: Centralized data management for better maintainability
- ✅ **Common Utilities**: Reusable functions to eliminate code duplication
- ✅ **Simple Setup**: Minimal configuration, maximum functionality
- ✅ **Cross-browser Testing**: Chrome, Firefox, Safari support
- ✅ **Parallel Execution**: Fast test execution
- ✅ **Rich Reporting**: HTML reports with screenshots and traces
- ✅ **CI/CD Ready**: Optimized for continuous integration with auto-detection
- ✅ **TypeScript Support**: Full type safety with const assertions
- ✅ **DRY Principles**: No duplicate code, maximum reusability

## 📊 Test Results

All tests are currently passing:
- ✅ Basic title verification
- ✅ Navigation functionality
- ✅ Search functionality
- ✅ Cross-browser compatibility

## 🔧 Customization

To adapt this framework for your application:

1. Update the `baseURL` in [`playwright.config.ts`](playwright.config.ts)
2. Add your test files in the `tests/` directory
3. Customize browser configurations as needed
4. Add additional scripts in [`package.json`](package.json)

## 📚 Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Test Configuration](https://playwright.dev/docs/test-configuration)
- [Writing Tests](https://playwright.dev/docs/writing-tests)
- [Best Practices](https://playwright.dev/docs/best-practices)

---

**This framework provides a solid foundation for Playwright test automation with clean, maintainable code and industry best practices.**