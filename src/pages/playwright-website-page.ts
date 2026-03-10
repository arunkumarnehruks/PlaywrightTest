import { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';
import { NavigationUtils, InteractionUtils, ValidationUtils } from '../utils/common-utils';
import { TestData } from '../test-data';

/**
 * Page Object Model for Playwright.dev website
 */
export class PlaywrightWebsitePage extends BasePage {
  // Locators
  readonly docsLink: Locator;
  readonly searchButton: Locator;
  readonly searchInput: Locator;
  readonly searchResults: Locator;
  readonly heading: Locator;
  readonly getStartedLink: Locator;

  constructor(page: Page) {
    super(page);
    
    // Initialize locators using test data
    this.docsLink = page.getByRole('link', { name: TestData.links.docsLinkText });
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.searchInput = page.getByPlaceholder('Search docs');
    this.searchResults = page.locator('[data-testid="search-results"]');
    this.heading = page.locator('h1');
    this.getStartedLink = page.getByRole('link', { name: TestData.links.getStartedLinkText });
  }

  /**
   * Navigate to the Playwright homepage
   */
  async navigateToHomepage(): Promise<void> {
    await NavigationUtils.goToHomepage(this.page);
  }

  /**
   * Navigate to the docs page
   */
  async navigateToDocs(): Promise<void> {
    await InteractionUtils.clickLinkByText(this.page, TestData.links.docsLinkText);
  }

  /**
   * Perform a search on the website
   */
  async search(searchTerm: string): Promise<void> {
    await this.click(this.searchButton);
    await this.waitForVisible(this.searchInput);
    await this.fill(this.searchInput, searchTerm);
    await this.press(this.searchInput, 'Enter');
  }

  /**
   * Get the main heading text
   */
  async getMainHeading(): Promise<string | null> {
    return await this.getTextContent(this.heading);
  }

  /**
   * Check if we're on the docs page
   */
  async isOnDocsPage(): Promise<boolean> {
    return await ValidationUtils.isUrlContaining(this.page, TestData.navigation.docsUrlPattern);
  }

  /**
   * Check if search results are visible
   */
  async areSearchResultsVisible(): Promise<boolean> {
    return await ValidationUtils.waitForAnySelector(
      this.page,
      ['[data-testid="search-results"]', '.DocSearch-Input', 'input[placeholder*="search" i]'],
      5000
    );
  }

  /**
   * Verify the page title contains expected text
   */
  async verifyTitleContains(expectedText: string): Promise<boolean> {
    return await ValidationUtils.isTitleContaining(this.page, expectedText);
  }

  /**
   * Click on Get Started link
   */
  async clickGetStarted(): Promise<void> {
    await InteractionUtils.clickLinkByText(this.page, TestData.links.getStartedLinkText);
  }
}