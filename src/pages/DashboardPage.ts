import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { Logger } from '../utils/logger';

/**
 * Dashboard page object for OrangeHRM
 * Handles dashboard related functionality including logout
 */
export class DashboardPage extends BasePage {
    // Locators
    private readonly dashboardHeader = '.oxd-topbar-header-title';
    private readonly userDropdown = '.oxd-userdropdown-tab';
    private readonly logoutButton = 'a:has-text("Logout")';

    constructor(page: Page) {
        super(page);
    }

    /**
     * Verify that the dashboard page is loaded
     */
    async verifyPageLoaded(): Promise<void> {
        Logger.step('Verifying dashboard page is loaded');
        await this.waitForElement(this.dashboardHeader);
        const headerText = await this.getText(this.dashboardHeader);
        Logger.assertion('Dashboard header should be present', headerText.length > 0);
        expect(headerText).toBeTruthy();
    }

    /**
     * Logout from the application
     */
    async logout(): Promise<void> {
        Logger.step('Logging out from the application');
        await this.click(this.userDropdown);
        await this.waitForElement(this.logoutButton);
        await this.click(this.logoutButton);
        
        // Verify returned to login page
        const loginPage = '.orangehrm-login-form';
        await this.waitForElement(loginPage);
        const isLoginVisible = await this.isVisible(loginPage);
        Logger.assertion('Should be redirected to login page', isLoginVisible);
        expect(isLoginVisible).toBeTruthy();
        Logger.success('Successfully logged out');
    }
}