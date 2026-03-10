import { Page, Locator } from '@playwright/test';

/**
 * Base Page class containing common functionality for all page objects
 */
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a specific URL
   */
  async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }

  /**
   * Get the page title
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Wait for page to load completely
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Click on an element
   */
  async click(locator: Locator): Promise<void> {
    await locator.click();
  }

  /**
   * Fill text in an input field
   */
  async fill(locator: Locator, text: string): Promise<void> {
    await locator.fill(text);
  }

  /**
   * Press a key
   */
  async press(locator: Locator, key: string): Promise<void> {
    await locator.press(key);
  }

  /**
   * Wait for an element to be visible
   */
  async waitForVisible(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
  }

  /**
   * Check if element is visible
   */
  async isVisible(locator: Locator): Promise<boolean> {
    return await locator.isVisible();
  }

  /**
   * Get text content of an element
   */
  async getTextContent(locator: Locator): Promise<string | null> {
    return await locator.textContent();
  }
}