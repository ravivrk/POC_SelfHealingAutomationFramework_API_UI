export interface ScoreResult {
    score: number;
    breakdown: {
        completeness: number;
        correctness: number;
        validity: number;
    };
}

export function calculateScore(response: any): ScoreResult {

    let completeness = 0;
    let correctness = 0;
    let validity = 0;

    //  Completeness: fields present
    if (response.amount) completeness += 0.33;
    if (response.currency) completeness += 0.33;
    if (response.username) completeness += 0.34;

    // Correctness: value checks
    if (typeof response.amount === "number") correctness += 0.5;
    if (response.currency === "USD") correctness += 0.5;

    // Validity: business rules
    if (response.amount > 0) validity += 0.5;
    if (response.amount < 10000) validity += 0.5;

    const finalScore = (completeness + correctness + validity) / 3;

    return {
        score: parseFloat(finalScore.toFixed(2)),
        breakdown: {
            completeness: parseFloat(completeness.toFixed(2)),
            correctness: parseFloat(correctness.toFixed(2)),
            validity: parseFloat(validity.toFixed(2))
        }
    };
}

export function getQualityLabel(score: number): string {

    if (score >= 0.85) return "HIGH";
    if (score >= 0.6) return "MEDIUM";
    return "LOW";
}
