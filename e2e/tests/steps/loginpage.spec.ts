import { Given, When, Then } from "@cucumber/cucumber"
import { getPage } from "../../../corelib/corelib.spec";
import LoginPage from "../pages/loginpage";
import { expect } from "@playwright/test";

let loginPage: LoginPage;

Given('User is on the login page', async function () {
    loginPage = new LoginPage(getPage());
    await loginPage.goToLoginPage();
});

When('the user enters {string} and {string}', async function (username: string, password: string) {
    await loginPage.enterLoginDetails(username,password);

});

When('the user click on login button', async function () {
    await loginPage.clickLoginBtn();
});

Then('the user should see the dashboard', async function () {
    await loginPage.isUserLoggedIn();
});

Then('the user should see the {string}', async function (expectedElement: string) {
    await loginPage.verifyLoginResult(expectedElement);
    
});

