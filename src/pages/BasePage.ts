import { Page, Locator, expect } from '@playwright/test';
import { Logger } from '../utils/logger';

/**
 * Base page class that all page objects will inherit from
 * Contains common methods and properties for page interactions
 */
export class BasePage {
    protected page: Page;
    
    constructor(page: Page) {
        this.page = page;
    }
    
    /**
     * Navigate to a URL
     * @param url - The URL to navigate to
     */
    async navigateTo(url: string): Promise<void> {
        Logger.step(`Navigating to ${url}`);
        await this.page.goto(url);
        Logger.info(`Navigated to ${url}`);
    }
    
    /**
     * Click on an element
     * @param locator - The element locator
     * @param options - Click options
     */
    async click(locator: Locator | string, options = {}): Promise<void> {
        const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
        Logger.info(`Clicking on element: ${locator}`);
        await element.click(options);
    }
    
    /**
     * Fill a form field
     * @param locator - The field locator
     * @param value - The value to fill
     */
    async fill(locator: Locator | string, value: string): Promise<void> {
        const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
        Logger.info(`Filling element: ${locator} with value: ${value}`);
        await element.fill(value);
    }
    
    /**
     * Check if element is visible
     * @param locator - The element locator
     */
    async isVisible(locator: Locator | string): Promise<boolean> {
        const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
        Logger.info(`Checking if element is visible: ${locator}`);
        return await element.isVisible();
    }
    
    /**
     * Wait for element to be visible
     * @param locator - The element locator
     * @param timeout - Timeout in milliseconds
     */
    async waitForElement(locator: Locator | string, timeout?: number): Promise<Locator> {
        const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
        Logger.info(`Waiting for element to be visible: ${locator}`);
        await element.waitFor({ state: 'visible', timeout });
        return element;
    }
    
    /**
     * Get page title
     * @returns The page title
     */
    async getTitle(): Promise<string> {
        Logger.info('Getting page title');
        return await this.page.title();
    }
    
    /**
     * Assert page title
     * @param title - Expected title
     */
    async assertTitle(title: string): Promise<void> {
        const pageTitle = await this.getTitle();
        Logger.assertion(`Page title should be "${title}"`, pageTitle === title);
        expect(pageTitle).toEqual(title);
    }
    
    /**
     * Get text content of an element
     * @param locator - The element locator
     * @returns The text content
     */
    async getText(locator: Locator | string): Promise<string> {
        const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
        Logger.info(`Getting text from element: ${locator}`);
        return await element.textContent() || '';
    }
}