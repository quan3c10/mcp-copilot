import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { TestConfig } from '../config/testConfig';
import { Logger } from '../utils/logger';

test.describe('OrangeHRM Login Tests', () => {
  test.beforeEach(async ({ page }) => {
    Logger.info('Starting test');
  });

  test('Scenario 1: Valid Login', async ({ page }) => {
    Logger.step('SCENARIO: Valid Login');
    
    // Initialize page objects
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    
    // Navigate to login page
    await loginPage.navigateToLoginPage(TestConfig.baseUrl);
    
    // Login with valid credentials
    await loginPage.login(
      TestConfig.credentials.valid.username,
      TestConfig.credentials.valid.password
    );
    
    // Verify successful login
    await loginPage.assertLoginSuccessful();
    await dashboardPage.verifyPageLoaded();
    
    // Log out to reset state for next test
    await dashboardPage.logout();
    
    Logger.success('Valid login test completed successfully');
  });

  test('Scenario 2: Invalid Login', async ({ page }) => {
    Logger.step('SCENARIO: Invalid Login');
    
    // Initialize page objects
    const loginPage = new LoginPage(page);
    
    // Navigate to login page
    await loginPage.navigateToLoginPage(TestConfig.baseUrl);
    
    // Login with invalid credentials
    await loginPage.login(
      TestConfig.credentials.invalid.username,
      TestConfig.credentials.invalid.password
    );
    
    // Verify login failed
    await loginPage.assertLoginFailed();
    
    Logger.success('Invalid login test completed successfully');
  });
});