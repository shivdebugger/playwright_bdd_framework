import { Given, When, Then, setDefaultTimeout, Before, After } from "@cucumber/cucumber"
import { expect } from "@playwright/test"
import { getPage } from "../../../corelib/corelib.spec";
import LoginPage from "../pages/loginpage";

let loginPage: LoginPage;

Given('User is on the login page', async function () {
    loginPage = new LoginPage(getPage());
    await loginPage.goToLoginPage();
});

When('User enters valid credentials', async function () {
    await loginPage.enterLoginDetails();
    
});

When('click the login button', async function () {
    await loginPage.clickLoginBtn();
    //loginPage.alert();
});

Then('User should be redirected to the dashboard', async function () {
    await loginPage.isUserLoggedIn();
});
