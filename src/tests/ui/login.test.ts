
import { getDriver } from "../../core/driver/driverFactory";
import { LoginPage } from "../../pages/login.page";
import { until } from "selenium-webdriver";

describe("Login Test", function () {

    this.timeout(30000);

    let driver: any;
    let loginPage: LoginPage;

    before(async function () {
        driver = await getDriver();
        loginPage = new LoginPage(driver);
    });

    after(async function () {
        if (driver) {
            await driver.quit();
        }
    });

    it("should login successfully", async function () {

        await loginPage.open();
        await loginPage.login("tomsmith", "SuperSecretPassword!");

        await driver.wait(until.urlContains("/secure"), 5000);

        const message = await loginPage.getSuccessMessage();

        if (!message.includes("You logged into a secure area")) {
            throw new Error("Login failed");
        }
    });
});
