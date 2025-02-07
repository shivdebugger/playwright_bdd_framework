import {Page} from "playwright";
import BasePage from "./basepage";
import { expect } from "playwright/test";

export default class LoginPage  extends BasePage{

    private userNameField = "//input[@id='auth_user_username']";
    private userPasswordfield = "//input[@id='auth_user_password']";
    private loginBtn = "//button[@id='login_button']";
    private dashoardTxt = "//h2[normalize-space(text())='overview']";
    private rememberMeChkBox = "//input[@id='auth_user_remember_me']";
    private lostPasswordbtn = "//a[contains(text(),'Lost Password')]";
    private forgotPasswordbtn = "//a[contains(text(),'Forgot Username')]";
    private invalidLoginError = "//div[normalize-space(text())='Invalid login']";

    constructor(page:Page){
        super(page)
    }

    async goToLoginPage(){
        await this.page.goto(process.env.app_url!);
    };

    async enterLoginDetails(username: string, password: string){
        await this.clearText(this.userNameField)
        await this.enterText(this.userNameField,username);
        await this.clearText(this.userPasswordfield);
        await this.enterText(this.userPasswordfield,password);
    };

    async clickLoginBtn(){
        await this.clickElement(this.loginBtn);
    };

    async isUserLoggedIn(){
       await this.verifyElementVisible(this.dashoardTxt);
    };

    async isErrorMsgDisplayed(){
        await this.verifyElementVisible(this.invalidLoginError);
    }    

    async verifyLoginResult(expectedOverviewText: string) {
    
        const isOverviewVisible = await this.page.waitForSelector(this.dashoardTxt,{ timeout: 5000 }).catch(() => false);
        const isErrorVisible = await this.page.isVisible(this.invalidLoginError,{timeout: 5000 }).catch(() => false);
    
        if (isOverviewVisible) {
          const actualText = await this.page.locator(this.dashoardTxt).innerText();
          expect(actualText.trim()).toBe(expectedOverviewText);
        } else if (isErrorVisible) {
          const errorText = await this.page.locator(this.invalidLoginError).innerText();
          expect(errorText.trim()).toBe(expectedOverviewText);
        } else {
          throw new Error('Neither overview nor error message is visible.');
        }
      }
}