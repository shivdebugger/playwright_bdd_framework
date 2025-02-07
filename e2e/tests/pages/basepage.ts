import {Page} from "playwright";
import { expect } from "playwright/test";

export default class BasePage{

    protected page:Page;

    constructor(page:Page){
        this.page = page;
    }

    async clickElement(selector: string) {
        await this.page.click(selector);
    }

    async enterText(selector: string, text: string) {
        await this.page.fill(selector, text);
      }

    async clearText(selector: string) {
        await this.page.locator(selector).fill('');
    }

    async verifyElementVisible(selector: string) {
        const element = this.page.locator(selector);
        await expect(element).toBeVisible();
       
    }
    
}