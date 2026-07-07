
import { getDriver } from "../../core/driver/driverFactory";
import { LoginPage } from "../../pages/login.page";

import { createPayment } from "../../services/payment.service";
import { healResponse } from "../../core/apiHealing/apiHealer";

import { evaluateResponse } from "../../core/evaluation/evaluationEngine";
import { detectRisks } from "../../core/evaluation/riskDetector";
import { calculateScore, getQualityLabel } from "../../core/evaluation/scoringEngine";

import { until } from "selenium-webdriver";

describe("End-to-End Test: UI + API + Self-Healing + Evaluation + Scoring", function () {

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

    it("should execute end-to-end login and evaluate payment with scoring", async function () {

        // ============================
        // STEP 1: UI LOGIN
        // ============================

        await loginPage.open();
        await loginPage.login("tomsmith", "SuperSecretPassword!");

        await driver.wait(until.urlContains("/secure"), 5000);

        const message = await loginPage.getSuccessMessage();

        if (!message.includes("You logged into a secure area")) {
            throw new Error("Login failed");
        }

        console.log("Login successful");

        // ============================
        // STEP 2: API PAYMENT
        // ============================

        const payment = await createPayment();

        console.log("Raw Payment:", payment);

        // ============================
        // STEP 3: SELF-HEALING
        // ============================

        const expectedSchema = {
            amount: "",
            currency: "",
            username: ""
        };

        const healed = healResponse(payment, expectedSchema);

        console.log("Healed Response:", healed);

        // ============================
        // STEP 4: EVALUATION
        // ============================

        const evaluation = evaluateResponse(healed);

        if (!evaluation.passed) {
            console.log("Evaluation Issues:", evaluation.issues);
            throw new Error("Evaluation failed");
        }

        console.log("Evaluation passed");

        // ============================
        // STEP 5: RISK DETECTION
        // ============================

        const risks = detectRisks(healed);

        if (risks.length > 0) {
            console.log("Detected Risks:", risks);
        }

        // ============================
        // STEP 6: SCORING (DEEPEVAL-STYLE)
        // ============================

        const scoring = calculateScore(healed);

        console.log("Score:", scoring.score);
        console.log("Score Breakdown:", scoring.breakdown);

        // ============================
        // STEP 7: QUALITY CLASSIFICATION
        // ============================

        const quality = getQualityLabel(scoring.score);

        console.log("Quality Level:", quality);

        // ============================
        // STEP 8: FINAL DECISION
        // ============================

        if (scoring.score < 0.6) {
            throw new Error(`Low quality response. Score: ${scoring.score}`);
        }

        console.log("End-to-end test completed successfully");
    });

});
