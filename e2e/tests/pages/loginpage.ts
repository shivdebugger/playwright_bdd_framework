import {Page} from "playwright";
import * as loginpageloc from "../locators/loginpageloc.json"
import BasePage from "./basepage";
import { expect } from "playwright/test";
export default class LoginPage  extends BasePage{
   
    constructor(page:Page){
        super(page)
    }

    async goToLoginPage(){
        await this.page.goto(process.env.app_url!);
    };

    async enterLoginDetails(username: string, password: string){
        await this.clearText(loginpageloc.userNameField.locator)
        await this.enterText(loginpageloc.userNameField.locator,username);
        await this.clearText(loginpageloc.userPasswordfield.locator);
        await this.enterText(loginpageloc.userPasswordfield.locator,password);
    };

    async clickLoginBtn(){
        await this.clickElement(loginpageloc.loginBtn.locator);
    };

    async isUserLoggedIn(){
       await this.verifyElementVisible(loginpageloc.dashoardTxt.locator);
    };

    async isErrorMsgDisplayed(){
        await this.verifyElementVisible(loginpageloc.invalidLoginError.locator);
    }    

    async verifyLoginResult(expectedOverviewText: string) {
    
        const isOverviewVisible = await this.page.waitForSelector(loginpageloc.dashoardTxt.locator,{ timeout: 5000 }).catch(() => false);
        const isErrorVisible = await this.page.isVisible(loginpageloc.invalidLoginError.locator,{timeout: 5000 }).catch(() => false);
    
        if (isOverviewVisible) {
          const actualText = await this.page.locator(loginpageloc.dashoardTxt.locator).innerText();
          expect(actualText.trim()).toBe(expectedOverviewText);
        } else if (isErrorVisible) {
          const errorText = await this.page.locator(loginpageloc.invalidLoginError.locator).innerText();
          expect(errorText.trim()).toBe(expectedOverviewText);
        } else {
          throw new Error('Neither overview nor error message is visible.');
        }
      }
}