/**
 * Environment configuration for different testing environments
 */

export interface EnvironmentConfig {
  baseURL: string;
  timeout: number;
  retries: number;
  workers?: number;
  headless: boolean;
  slowMo?: number;
}

/**
 * Environment configurations
 */
export const environments: Record<string, EnvironmentConfig> = {
  // Production environment (default)
  production: {
    baseURL: 'https://playwright.dev',
    timeout: 30000,
    retries: 2,
    workers: undefined,
    headless: true,
  },

  // Staging environment
  staging: {
    baseURL: 'https://playwright.dev',
    timeout: 30000,
    retries: 1,
    workers: undefined,
    headless: true,
  },

  // Development environment
  development: {
    baseURL: 'https://playwright.dev',
    timeout: 60000,
    retries: 0,
    workers: 1,
    headless: false,
    slowMo: 100,
  },

  // Local development
  local: {
    baseURL: 'https://playwright.dev',
    timeout: 60000,
    retries: 0,
    workers: 1,
    headless: false,
    slowMo: 500,
  },

  // CI environment
  ci: {
    baseURL: 'https://playwright.dev',
    timeout: 45000,
    retries: 3,
    workers: 1,
    headless: true,
  }
};

/**
 * Get environment configuration based on NODE_ENV or TEST_ENV
 */
export function getEnvironmentConfig(): EnvironmentConfig {
  // Priority: TEST_ENV > NODE_ENV > 'production'
  const envName = process.env.TEST_ENV || process.env.NODE_ENV || 'production';
  
  // Check if running in CI
  if (process.env.CI) {
    return environments.ci;
  }
  
  const config = environments[envName];
  
  if (!config) {
    console.warn(`Environment '${envName}' not found, falling back to 'production'`);
    return environments.production;
  }
  
  return config;
}

/**
 * Get base URL with environment variable override
 */
export function getBaseURL(): string {
  // Allow direct override via BASE_URL environment variable
  if (process.env.BASE_URL) {
    return process.env.BASE_URL;
  }
  
  const config = getEnvironmentConfig();
  return config.baseURL;
}

/**
 * Get all available environment names
 */
export function getAvailableEnvironments(): string[] {
  return Object.keys(environments);
}

/**
 * Validate environment configuration
 */
export function validateEnvironmentConfig(config: EnvironmentConfig): boolean {
  if (!config.baseURL) {
    throw new Error('baseURL is required in environment configuration');
  }
  
  if (!config.baseURL.startsWith('http')) {
    throw new Error('baseURL must be a valid HTTP/HTTPS URL');
  }
  
  if (config.timeout <= 0) {
    throw new Error('timeout must be a positive number');
  }
  
  if (config.retries < 0) {
    throw new Error('retries must be a non-negative number');
  }
  
  return true;
}