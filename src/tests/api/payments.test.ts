
import { createPayment, getPaymentStatus } from "../../services/payment.service";
import { healResponse } from "../../core/apiHealing/apiHealer";

describe(" Payment Workflow Test (Self-Healing)", () => {

    it("should process payment and self-heal schema changes", async () => {

        try {
            // Step 1: Create Payment
            const payment = await createPayment();

            console.log(" Raw Payment Response:", payment);

            // Step 2: Define expected schema (INTENTIONALLY mismatched)
            // This simulates a real-world API breaking change
            const expectedSchema = {
                amount: "",
                currency: "",
                username: ""   //  API actually returns userName → triggers self-healing
            };

            // Step 3: Apply self-healing logic
            const healedResponse = healResponse(payment, expectedSchema);

            console.log("Healed Response:", healedResponse);

            // Step 4: Validate healed response
            if (!healedResponse.username) {
                throw new Error(" Self-healing failed: 'username' not resolved");
            }

            console.log("Self-healing successful: username mapped correctly");

            // Step 5: Retrieve payment status
            const status = await getPaymentStatus(payment.id);

            console.log(" Payment Status Response:", status);

            // Step 6: Validate status response
            if (!status.id) {
                throw new Error("Payment status validation failed");
            }

            console.log("Payment workflow completed successfully");

        } catch (err: any) {
            console.error(" Test Failed:", err.message);
            throw err;
        }

    });

});
