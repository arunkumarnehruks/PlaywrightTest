import { test, expect } from '@playwright/test';
import { PlaywrightWebsitePage } from '../src/pages';
import { AssertionUtils } from '../src/utils/common-utils';
import { TestData } from '../src/test-data';

test.describe('Playwright Website - Example Tests', () => {
  test(TestData.testNames.exampleTitleTest, async ({ page }) => {
    const playwrightPage = new PlaywrightWebsitePage(page);
    
    await playwrightPage.navigateToHomepage();

    // Verify title contains expected text using page object method
    const titleContainsPlaywright = await playwrightPage.verifyTitleContains(TestData.titles.expectedTitleText);
    expect(titleContainsPlaywright).toBe(TestData.expectations.titleShouldContainPlaywright);
    
    // Alternative assertion using common utility
    await AssertionUtils.assertTitleContains(page, TestData.titles.expectedTitleText);
  });

  test(TestData.testNames.exampleGetStartedTest, async ({ page }) => {
    const playwrightPage = new PlaywrightWebsitePage(page);
    
    await playwrightPage.navigateToHomepage();

    // Click the get started link using page object
    await playwrightPage.clickGetStarted();

    // Use common utility for heading assertion
    await AssertionUtils.assertHeadingVisible(page, TestData.headings.installationHeading);
  });
});
