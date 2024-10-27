import {Page} from "playwright";
import * as loginpageloc from "../locators/loginpageloc.json"
import BasePage from "./basepage";

export default class LoginPage  extends BasePage{
   
    constructor(page:Page){
        super(page)
    }

    async goToLoginPage(){
        await this.page.goto(process.env.app_url!);
    };

    async enterLoginDetails(){
        await this.clearText(loginpageloc.userNameField.locator)
        await this.enterText(loginpageloc.userNameField.locator,process.env.user_name!);
        await this.clearText(loginpageloc.userPasswordfield.locator);
        await this.enterText(loginpageloc.userPasswordfield.locator,process.env.user_password!);
    };

    async clickLoginBtn(){
        await this.clickElement(loginpageloc.loginBtn.locator);
    };

    async isUserLoggedIn(){
       await this.verifyElementVisible(loginpageloc.dashoardTxt.locator);
    };

}