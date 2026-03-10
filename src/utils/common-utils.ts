import { expect, Page } from '@playwright/test';

/**
 * Common assertion utilities to reduce duplication in tests
 */
export class AssertionUtils {
  
  /**
   * Assert that page title contains expected text
   * @param page - Playwright page object
   * @param expectedText - Text that should be in the title
   */
  static async assertTitleContains(page: Page, expectedText: string): Promise<void> {
    await expect(page).toHaveTitle(new RegExp(expectedText, 'i'));
  }

  /**
   * Assert that URL contains expected pattern
   * @param page - Playwright page object
   * @param urlPattern - Pattern that should be in the URL
   */
  static async assertUrlContains(page: Page, urlPattern: string): Promise<void> {
    await expect(page).toHaveURL(new RegExp(urlPattern));
  }

  /**
   * Assert that a heading with specific text is visible
   * @param page - Playwright page object
   * @param headingText - Text or pattern for the heading
   */
  static async assertHeadingVisible(page: Page, headingText: string | RegExp): Promise<void> {
    await expect(page.getByRole('heading', { name: headingText })).toBeVisible();
  }

  /**
   * Assert that an element is visible with timeout
   * @param page - Playwright page object
   * @param selector - Element selector
   * @param timeout - Optional timeout in milliseconds
   */
  static async assertElementVisible(page: Page, selector: string, timeout: number = 5000): Promise<void> {
    await expect(page.locator(selector)).toBeVisible({ timeout });
  }

  /**
   * Assert that page contains specific text
   * @param page - Playwright page object
   * @param text - Text that should be present on the page
   */
  static async assertPageContainsText(page: Page, text: string): Promise<void> {
    await expect(page.locator(`text=${text}`)).toBeVisible();
  }
}

/**
 * Common navigation utilities
 */
export class NavigationUtils {
  
  /**
   * Navigate to homepage and wait for load
   * @param page - Playwright page object
   */
  static async goToHomepage(page: Page): Promise<void> {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  }

  /**
   * Navigate to a specific path and wait for load
   * @param page - Playwright page object
   * @param path - Path to navigate to
   */
  static async goToPath(page: Page, path: string): Promise<void> {
    await page.goto(path);
    await page.waitForLoadState('networkidle');
  }

  /**
   * Wait for page to be fully loaded
   * @param page - Playwright page object
   */
  static async waitForPageLoad(page: Page): Promise<void> {
    await page.waitForLoadState('networkidle');
    await page.waitForLoadState('domcontentloaded');
  }
}

/**
 * Common interaction utilities
 */
export class InteractionUtils {
  
  /**
   * Click on a link by text and wait for navigation
   * @param page - Playwright page object
   * @param linkText - Text of the link to click
   */
  static async clickLinkByText(page: Page, linkText: string): Promise<void> {
    await page.getByRole('link', { name: linkText }).click();
    await NavigationUtils.waitForPageLoad(page);
  }

  /**
   * Click on a button by text
   * @param page - Playwright page object
   * @param buttonText - Text of the button to click
   */
  static async clickButtonByText(page: Page, buttonText: string): Promise<void> {
    await page.getByRole('button', { name: buttonText }).click();
  }

  /**
   * Fill input field and optionally press Enter
   * @param page - Playwright page object
   * @param selector - Input field selector
   * @param text - Text to fill
   * @param pressEnter - Whether to press Enter after filling
   */
  static async fillInput(page: Page, selector: string, text: string, pressEnter: boolean = false): Promise<void> {
    const input = page.locator(selector);
    await input.fill(text);
    if (pressEnter) {
      await input.press('Enter');
    }
  }

  /**
   * Search functionality - click search button, fill input, and submit
   * @param page - Playwright page object
   * @param searchTerm - Term to search for
   * @param searchButtonSelector - Selector for search button
   * @param searchInputSelector - Selector for search input
   */
  static async performSearch(
    page: Page, 
    searchTerm: string, 
    searchButtonSelector: string = '[role="button"][name*="search" i]',
    searchInputSelector: string = 'input[placeholder*="search" i]'
  ): Promise<void> {
    await page.locator(searchButtonSelector).click();
    await page.locator(searchInputSelector).waitFor({ state: 'visible' });
    await page.locator(searchInputSelector).fill(searchTerm);
    await page.locator(searchInputSelector).press('Enter');
  }
}

/**
 * Common validation utilities
 */
export class ValidationUtils {
  
  /**
   * Check if current URL contains specific text
   * @param page - Playwright page object
   * @param urlText - Text that should be in the URL
   * @returns Promise<boolean>
   */
  static async isUrlContaining(page: Page, urlText: string): Promise<boolean> {
    const currentUrl = page.url();
    return currentUrl.includes(urlText);
  }

  /**
   * Check if page title contains specific text
   * @param page - Playwright page object
   * @param titleText - Text that should be in the title
   * @returns Promise<boolean>
   */
  static async isTitleContaining(page: Page, titleText: string): Promise<boolean> {
    const title = await page.title();
    return title.toLowerCase().includes(titleText.toLowerCase());
  }

  /**
   * Check if element is visible
   * @param page - Playwright page object
   * @param selector - Element selector
   * @returns Promise<boolean>
   */
  static async isElementVisible(page: Page, selector: string): Promise<boolean> {
    try {
      await page.locator(selector).waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Wait for any of multiple selectors to be visible
   * @param page - Playwright page object
   * @param selectors - Array of selectors to wait for
   * @param timeout - Timeout in milliseconds
   * @returns Promise<boolean>
   */
  static async waitForAnySelector(page: Page, selectors: string[], timeout: number = 5000): Promise<boolean> {
    try {
      const promises = selectors.map(selector => 
        page.locator(selector).waitFor({ state: 'visible', timeout })
      );
      await Promise.race(promises);
      return true;
    } catch {
      return false;
    }
  }
}