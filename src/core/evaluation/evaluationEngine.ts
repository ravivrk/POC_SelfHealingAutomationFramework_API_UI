
export interface EvaluationResult {
    passed: boolean;
    issues: string[];
}

export function evaluateResponse(response: any): EvaluationResult {

    const issues: string[] = [];

    //  Rule 1: Missing fields
    if (!response.amount) {
        issues.push("Missing amount field");
    }

    // Rule 2: Currency validation
    if (!response.currency) {
        issues.push("Missing currency field");
    }

    // Rule 3: Value validation
    if (response.amount && response.amount <= 0) {
        issues.push("Invalid amount value");
    }

    return {
        passed: issues.length === 0,
        issues
    };
}
