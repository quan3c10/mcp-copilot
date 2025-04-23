import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { Logger } from '../utils/logger';

/**
 * Login page object for OrangeHRM
 * Handles login functionality and related assertions
 */
export class LoginPage extends BasePage {
    // Locators
    private readonly usernameInput = 'input[name="username"]';
    private readonly passwordInput = 'input[name="password"]';
    private readonly loginButton = 'button[type="submit"]';
    private readonly errorMessage = '.oxd-alert-content-text';
    private readonly loginForm = '.orangehrm-login-form';

    constructor(page: Page) {
        super(page);
    }

    /**
     * Navigate to the login page
     * @param url - The base URL of the application
     */
    async navigateToLoginPage(url: string): Promise<void> {
        Logger.step('Navigating to the login page');
        await this.navigateTo(url);
        await this.waitForElement(this.loginForm);
        Logger.info('Login page loaded successfully');
    }

    /**
     * Login with username and password
     * @param username - The username to login with
     * @param password - The password to login with
     */
    async login(username: string, password: string): Promise<void> {
        Logger.step(`Logging in with username: ${username}`);
        await this.fill(this.usernameInput, username);
        await this.fill(this.passwordInput, password);
        await this.click(this.loginButton);
    }

    /**
     * Assert that login was successful
     * Waits for the dashboard page to load
     */
    async assertLoginSuccessful(): Promise<void> {
        Logger.step('Verifying successful login');
        // Dashboard header is visible after successful login
        const dashboardHeader = '.oxd-topbar-header-title';
        await this.waitForElement(dashboardHeader);
        const isVisible = await this.isVisible(dashboardHeader);
        Logger.assertion('Dashboard should be visible after login', isVisible);
        expect(isVisible).toBeTruthy();
    }

    /**
     * Assert that login failed with error message
     */
    async assertLoginFailed(): Promise<void> {
        Logger.step('Verifying failed login');
        await this.waitForElement(this.errorMessage);
        const errorText = await this.getText(this.errorMessage);
        Logger.assertion('Error message should be displayed', errorText.includes('Invalid'));
        expect(errorText).toContain('Invalid credentials');
    }
}