
import { By, WebDriver } from "selenium-webdriver";
import { findElement } from "../core/smartLocator/smartFinder";

export class LoginPage {
    private driver: WebDriver;

    constructor(driver: WebDriver) {
        this.driver = driver;
    }

    private usernameField = By.id("username");
    private passwordField = By.id("password");
    private successMessage = By.css(".flash.success");

    async open(): Promise<void> {
        await this.driver.get("https://the-internet.herokuapp.com/login");
    }

    async login(username: string, password: string): Promise<void> {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLogin();
    }

    private async enterUsername(username: string): Promise<void> {
        const element = await this.driver.findElement(this.usernameField);
        await element.clear();
        await element.sendKeys(username);
    }

    private async enterPassword(password: string): Promise<void> {
        const element = await this.driver.findElement(this.passwordField);
        await element.clear();
        await element.sendKeys(password);
    }

    private async clickLogin(): Promise<void> {
        const button = await findElement(this.driver, "loginButton");
        await button.click();
    }

    async getSuccessMessage(): Promise<string> {
        return await this.driver.findElement(this.successMessage).getText();
    }
}
