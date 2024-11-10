# playwright_bdd_framework
Playwright TypeScript BDD Cucumber Framework with Page Object Model (POM)
This repository provides an end-to-end test automation framework using Playwright, TypeScript, Cucumber (BDD), and Page Object Model (POM). The framework follows best practices for scalable, maintainable, and reusable test code.

Tech Stack
Node.js: JavaScript runtime required to run the tests.
Visual Studio Code (VS Code): Recommended editor for TypeScript and JavaScript development.
TypeScript: Statically typed superset of JavaScript for better tooling and error checking.
ts-node: Executes TypeScript code directly in Node.js.
Cucumber: A BDD (Behavior Driven Development) framework for writing tests in Gherkin syntax (Given-When-Then).
Playwright: A browser automation tool for end-to-end testing.
@playwright/test: Playwright's built-in testing framework for executing tests with Playwright.
cucumber-html-reporter: Generates detailed HTML reports for Cucumber test runs.
Prerequisites
Node.js: Version 14 or higher
Visual Studio Code (or any editor that supports TypeScript)
Git: To clone the repository
Setup Steps
Follow these steps to set up the Playwright + Cucumber + TypeScript framework:

Step 1: Clone the Repository
First, clone the repository to your local machine.

bash
Copy code
git clone https://github.com/shivdebugger/playwright_bdd_framework/tree/master
cd playwright-cucumber-pom
Step 2: Initialize NPM and Install Dependencies
In the root directory of the project, run the following commands to initialize the project and install the required dependencies.

Initialize npm project:
bash
Copy code
npm init -y
Install TypeScript:
bash
Copy code
npm install typescript --save-dev
Install ts-node (to run TypeScript code directly):
bash
Copy code
npm install ts-node --save-dev
Install Cucumber for BDD:
bash
Copy code
npm install @cucumber/cucumber --save-dev
Install Playwright for browser automation:
bash
Copy code
npm install playwright --save-dev
Install Playwright's test runner:
bash
Copy code
npm install @playwright/test --save-dev
Install Cucumber HTML Reporter (for generating test reports):
bash
Copy code
npm install cucumber-html-reporter --save-dev
Step 3: Initialize TypeScript Configuration
After installing the dependencies, create a TypeScript configuration file (tsconfig.json) by running:

bash
Copy code
npx tsc --init
This will generate a tsconfig.json file. You can modify it according to your project needs. Ensure the following settings are in place for better compatibility with Playwright and Cucumber:

json
Copy code
{
  "compilerOptions": {
    "target": "ES6",
    "module": "CommonJS",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true
  },
  "include": [
    "src/**/*.ts",
    "features/**/*.ts"
  ],
  "exclude": [
    "node_modules"
  ]
}
Step 4: Project Directory Structure
Create the following folder structure in your project:

bash
Copy code
e2e
├── corelib 
|   ├── corelib.spec.ts	   # Hooks and setup (Cucumber hooks (before, after))
├── tests
|   ├── features
│   ├── steps		   # Step definitions for Cucumber                # Example feature file in Gherkin syntax
│   ├── pages              # Page Object Model (POM) classes
│   		               
├── reports/               # Test reports
├── screenshots		   # Failed test case screenshots
├── tsconfig.json          # TypeScript configuration
├── cucumber.js            # Cucumber configuration
├── package.json           # Project dependencies and scripts
└── playwright.config.ts    # Playwright configuration

Step 5: Create Cucumber Configuration
Create a cucumber.js file in the root of your project with the following content:

js
Copy code
module.exports = {
  default: `--require-module ts-node/register --require features/**/*.feature --require src/step_definitions/**/*.ts --format progress --format cucumber-html-reporter:reports/cucumber-report.html`,
};
This configuration tells Cucumber to:

Use ts-node to run TypeScript files.
Look for feature files in the features/ directory.
Look for step definitions in the src/step_definitions/ directory.
Generate an HTML report in the reports directory.
Step 6: Write Feature Files and Step Definitions
Feature Files (Gherkin): Write your feature files in Gherkin syntax (e.g., login.feature).
Example: features/login.feature

gherkin
Copy code
Feature: User Login

  Scenario: User can log in with valid credentials
    Given I navigate to the login page
    When I enter valid credentials
    Then I should be redirected to the homepage
Step Definitions: Implement the corresponding step definitions in TypeScript.
Example: src/step_definitions/loginSteps.ts

typescript
Copy code
import { Given, When, Then } from '@cucumber/cucumber';
import { LoginPage } from '../pages/loginPage';
import { expect } from 'chai';

const loginPage = new LoginPage();

Given('I navigate to the login page', async () => {
  await loginPage.open();
});

When('I enter valid credentials', async () => {
  await loginPage.login('testuser', 'password123');
});

Then('I should be redirected to the homepage', async () => {
  const url = await loginPage.getUrl();
  expect(url).to.include('homepage');
});
Page Object Model (POM): Define page objects for reusable and maintainable test code.
Example: src/pages/loginPage.ts

typescript
Copy code
import { Page } from 'playwright';

export class LoginPage {
  private page: Page;
  private usernameField = 'input[name="username"]';
  private passwordField = 'input[name="password"]';
  private submitButton = 'button[type="submit"]';

  constructor(page: Page) {
    this.page = page;
  }

  async open() {
    await this.page.goto('https://example.com/login');
  }

  async login(username: string, password: string) {
    await this.page.fill(this.usernameField, username);
    await this.page.fill(this.passwordField, password);
    await this.page.click(this.submitButton);
  }

  async getUrl() {
    return await this.page.url();
  }
}
Step 7: Run Tests
You can execute your tests using the following command:

bash
Copy code
npx cucumber-js
Alternatively, to use Playwright's built-in test runner:

bash
Copy code
npx playwright test
This will run the tests and show the results in the terminal.

Step 8: Viewing the Reports
After executing the tests, HTML reports are generated in the reports/ directory. You can view the report using the following command:

bash
Copy code
open reports/cucumber-report.html
The report will include details such as:

Test status (passed/failed)
Execution time
Step-by-step execution log
Design Pattern: Page Object Model (POM)
The framework follows the Page Object Model (POM) design pattern to separate test logic from the page-specific details, improving maintainability and scalability.

Benefits of POM:
Reusability: Page objects can be reused across different test scenarios.
Maintainability: Any UI changes are handled by updating the corresponding page object, not the test code.
Separation of concerns: The test logic (written in feature files and step definitions) is separated from the UI interactions (handled by page objects).
Scalability: New pages and tests can be added easily by creating new page objects and feature files.
Summary of Commands
Here’s a quick summary of the commands you need to run:

bash
Copy code
# Initialize npm project
npm init -y

# Install TypeScript and other required libraries
npm install typescript --save-dev
npm install ts-node --save-dev
npm install @cucumber/cucumber --save-dev
npm install playwright --save-dev
npm install @playwright/test --save-dev
npm install cucumber-html-reporter --save-dev

# Initialize TypeScript configuration
npx tsc --init
Conclusion
This setup provides a powerful and scalable framework for automating web applications with Playwright, TypeScript, and Cucumber. Using the Page Object Model (POM) design pattern ensures your code is maintainable and easy to extend.

Feel free to fork the project, add your own tests, or open an issue if you encounter any problems. Happy testing! 🚀