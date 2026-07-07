
export function detectRisks(response: any): string[] {

    const risks: string[] = [];

    if (!response) {
        risks.push("Empty response");
    }

    if (response.status === "FAILED") {
        risks.push("Transaction failed");
    }

    if (response.amount > 10000) {
        risks.push("High value transaction risk");
    }

    return risks;
}
