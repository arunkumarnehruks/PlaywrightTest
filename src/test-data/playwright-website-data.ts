/**
 * Test data for Playwright website tests
 * Centralized location for all test data to improve maintainability
 */

export const TestData = {
  // Page titles and text content
  titles: {
    expectedTitleText: 'Playwright',
    titlePattern: /Playwright/
  },

  // Search functionality
  search: {
    searchTerm: 'test',
    searchQuery: 'test'
  },

  // Navigation and URLs
  navigation: {
    docsUrlPattern: 'docs',
    docsUrlRegex: /.*docs.*/
  },

  // Page headings and content
  headings: {
    installationHeading: 'Installation',
    installationOrGettingStarted: /Installation|Getting started/i,
    installationPattern: /Installation/i
  },

  // Link text
  links: {
    docsLinkText: 'Docs',
    getStartedLinkText: 'Get started'
  },

  // Test descriptions and names
  testNames: {
    titleTest: 'should have correct title',
    navigationTest: 'should navigate to docs page',
    searchTest: 'should search for content',
    exampleTitleTest: 'has title',
    exampleGetStartedTest: 'get started link'
  },

  // Test tags
  tags: {
    smoke: '@smoke'
  },

  // Expected results and validations
  expectations: {
    titleShouldContainPlaywright: true,
    shouldBeOnDocsPage: true,
    searchResultsShouldBeVisible: true
  }
} as const;

/**
 * Type definitions for test data
 */
export type TestDataType = typeof TestData;