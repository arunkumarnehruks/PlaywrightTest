import { test, expect } from '@playwright/test';
import { PlaywrightWebsitePage } from '../src/pages';
import { AssertionUtils } from '../src/utils/common-utils';
import { TestData } from '../src/test-data';

test.describe('Playwright Website Tests', () => {
  test(`${TestData.testNames.titleTest} ${TestData.tags.smoke}`, async ({ page }) => {
    const playwrightPage = new PlaywrightWebsitePage(page);
    
    await playwrightPage.navigateToHomepage();
    
    // Verify title contains expected text using utility
    const titleContainsPlaywright = await playwrightPage.verifyTitleContains(TestData.titles.expectedTitleText);
    expect(titleContainsPlaywright).toBe(TestData.expectations.titleShouldContainPlaywright);
    
    // Alternative assertion using common utility
    await AssertionUtils.assertTitleContains(page, TestData.titles.expectedTitleText);
  });

  test(TestData.testNames.navigationTest, async ({ page }) => {
    const playwrightPage = new PlaywrightWebsitePage(page);
    
    await playwrightPage.navigateToHomepage();
    await playwrightPage.navigateToDocs();
    
    // Verify we're on the docs page
    const isOnDocsPage = await playwrightPage.isOnDocsPage();
    expect(isOnDocsPage).toBe(TestData.expectations.shouldBeOnDocsPage);
    
    // Use common utility for heading assertion
    await AssertionUtils.assertHeadingVisible(page, TestData.headings.installationOrGettingStarted);
    
    // Use common utility for URL assertion
    await AssertionUtils.assertUrlContains(page, TestData.navigation.docsUrlPattern);
  });

  test(TestData.testNames.searchTest, async ({ page }) => {
    const playwrightPage = new PlaywrightWebsitePage(page);
    
    await playwrightPage.navigateToHomepage();
    
    // Perform search using page object
    await playwrightPage.search(TestData.search.searchTerm);
    
    // Verify search results are visible
    const searchResultsVisible = await playwrightPage.areSearchResultsVisible();
    expect(searchResultsVisible).toBe(TestData.expectations.searchResultsShouldBeVisible);
  });
});