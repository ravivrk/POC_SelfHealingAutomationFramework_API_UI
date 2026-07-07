
export function similarityScore(a: string, b: string): number {
    a = a.toLowerCase();
    b = b.toLowerCase();

    if (a.includes(b) || b.includes(a)) return 0.9;

    let matches = 0;
    for (let char of a) {
        if (b.includes(char)) matches++;
    }

    return matches / Math.max(a.length, b.length);
}
