
import { similarityScore } from "./similarity";

export async function healElement(driver: any, key: string) {
    const elements = await driver.findElements({ css: "*" });

    let bestMatch = null;
    let bestScore = 0;

    for (const el of elements) {
        let text = "";

        try {
            text = await el.getText();
        } catch {}

        const score = similarityScore(text || "", key);

        if (score > bestScore) {
            bestScore = score;
            bestMatch = el;
        }
    }

    if (bestMatch && bestScore > 0.75) {
        return bestMatch;
    }

    throw new Error(`Element not found for key: ${key}`);
}
