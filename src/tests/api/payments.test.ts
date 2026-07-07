
import { createPayment } from "../../services/payment.service";
import { healResponse } from "../../core/apiHealing/apiHealer";
import { evaluateResponse } from "../../core/evaluation/evaluationEngine";
import { detectRisks } from "../../core/evaluation/riskDetector";
import { calculateScore, getQualityLabel } from "../../core/evaluation/scoringEngine";

describe("Payment Evaluation Framework (Self-Healing + Evaluation + Scoring)", function () {

    this.timeout(30000);

    it("should evaluate and score payment response end-to-end", async function () {

        // Step 1: Create payment (API call)
        const payment = await createPayment();

        console.log("Raw Payment:", payment);

        // Step 2: Self-healing (schema adaptation)
        const expectedSchema = {
            amount: "",
            currency: "",
            username: ""
        };

        const healed = healResponse(payment, expectedSchema);

        console.log("Healed Response:", healed);

        // Step 3: Evaluation (rule-based validation)
        const evaluation = evaluateResponse(healed);

        if (!evaluation.passed) {
            console.log("Evaluation Issues:", evaluation.issues);
            throw new Error("Evaluation failed");
        }

        // Step 4: Risk Detection
        const risks = detectRisks(healed);

        if (risks.length > 0) {
            console.log("Detected Risks:", risks);
        }

        // Step 5: Scoring (DeepEval-style)
        const scoring = calculateScore(healed);

        console.log("Score:", scoring.score);
        console.log("Score Breakdown:", scoring.breakdown);

        // Step 6: Quality Classification
        const quality = getQualityLabel(scoring.score);

        console.log("Quality Level:", quality);

        // Step 7: Final Decision Logic
        if (scoring.score < 0.6) {
            throw new Error(`Low quality response. Score: ${scoring.score}`);
        }

        console.log("Payment evaluation completed successfully");
    });

});
