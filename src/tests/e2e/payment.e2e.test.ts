
import { getDriver } from "../../core/driver/driverFactory";
import { LoginPage } from "../../pages/login.page";
import { createPayment } from "../../services/payment.service";
import { healResponse } from "../../core/apiHealing/apiHealer";

import { until } from "selenium-webdriver";

describe("End-to-End Test: UI + API Payment Flow", function () {

    this.timeout(60000);

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

    it("should login via UI and process payment via API", async function () {

        // STEP 1: UI Login
        await loginPage.open();
        await loginPage.login("tomsmith", "SuperSecretPassword!");

        await driver.wait(until.urlContains("/secure"), 5000);

        const message = await loginPage.getSuccessMessage();

        if (!message.includes("You logged into a secure area")) {
            throw new Error("Login failed");
        }

        console.log("Login successful");

        // STEP 2: Create Payment (API)
        const payment = await createPayment();

        console.log("Raw Payment:", payment);

        // STEP 3: Expected schema (intentionally mismatched)
        const expectedSchema = {
            amount: "",
            currency: "",
            username: ""   // different from userName
        };

        // STEP 4: Self-healing API validation
        const healed = healResponse(payment, expectedSchema);

        console.log("Healed Payment:", healed);

        if (!healed.username) {
            throw new Error("Self-healing failed for username");
        }

        console.log("Payment validation successful");

    });

});
