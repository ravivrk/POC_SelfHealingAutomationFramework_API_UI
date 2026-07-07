
export function generateReport(evaluation: any, risks: any[]) {

    return {
        status: evaluation.passed ? "PASS" : "FAIL",
        issues: evaluation.issues,
        risks: risks,
        timestamp: new Date().toISOString()
    };
}
