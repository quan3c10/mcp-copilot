# OrangeHRM Playwright Automation Framework

This project is a structured Playwright test automation framework for OrangeHRM using TypeScript and Page Object Model design pattern.

## Features

- Page Object Model (POM) architecture
- TypeScript for type safety and better code organization
- Custom logging utility for detailed test execution logs
- Cross-browser testing support
- CI/CD integration via GitHub Actions
- Screenshots and videos on test failure
- HTML test reports

## Folder Structure

```
├── src/
│   ├── config/         # Test configuration and environment variables
│   ├── data/           # Test data files
│   ├── pages/          # Page Objects
│   │   ├── BasePage.ts # Base page with common functionality
│   │   └── ...         # Other page objects
│   ├── tests/          # Test files
│   └── utils/          # Utility functions and helpers
├── temp_codegen/       # Generated code from Playwright CodeGen (not version controlled)
├── test-results/       # Test execution results and artifacts
├── playwright.config.ts # Playwright configuration
├── .github/workflows/   # CI/CD configuration
└── package.json        # Project dependencies
```

## Prerequisites

- Node.js 14 or higher
- npm or yarn package manager

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd <repository-folder>
```

2. Install dependencies:

```bash
npm install
```

3. Install Playwright browsers:

```bash
npx playwright install
```

## Running Tests

### Headless Mode

To run tests in headless mode (for CI/CD):

```bash
npx playwright test --project=chromium --headed=false
```

### Headed Mode

To run tests in headed mode (with browser UI visible):

```bash
npx playwright test --project=chromium --headed
```

### Running Specific Test Files

```bash
npx playwright test src/tests/login.spec.ts
```

### Run Tests on All Browsers

```bash
npx playwright test
```

### Generate and View HTML Report

```bash
npx playwright show-report
```

## Design Pattern: Page Object Model

This framework implements the Page Object Model (POM) design pattern, which:

- Separates page interactions from test logic
- Improves test maintenance and reusability
- Reduces code duplication
- Enhances readability of test code

Each page in the application has a corresponding Page Object class that encapsulates:

- Page-specific locators
- Methods to interact with the page
- Assertions for page state verification

### Benefits of POM in this Framework

1. **Maintainability**: When UI elements change, only the page object needs to be updated, not the tests.
2. **Reusability**: Page methods can be reused across multiple tests.
3. **Readability**: Tests become more concise and focused on business logic rather than element interactions.
4. **Scalability**: Easy to add new pages and tests without modifying existing code.

## Logging Utility

The framework includes a custom logging utility that provides detailed logs for:

- Test steps
- Actions performed
- Assertions and their results
- General test flow information

Logs are output to the console with color coding for better visibility.

## Maintaining and Scaling the Framework

To maintain and scale this framework:

1. **Adding new page objects**:
   - Create a new file in `src/pages/` directory
   - Extend the `BasePage` class
   - Define page-specific locators and methods

2. **Adding new tests**:
   - Create a new file in `src/tests/` directory
   - Import required page objects
   - Implement test scenarios using page object methods

3. **Adding test data**:
   - Store reusable test data in `src/data/` directory
   - For sensitive data, use environment variables

4. **Configuration updates**:
   - Modify `playwright.config.ts` for any framework-level changes
   - Update environment-specific settings in `.env` files (not versioned)

## CI/CD Integration

This project includes GitHub Actions workflows for continuous integration:

- Automatically runs tests on push to the `master` branch
- Installs dependencies and browsers
- Executes tests in headless mode
- Uploads test results as artifacts