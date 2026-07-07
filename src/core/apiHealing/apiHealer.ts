
import { similarityScore } from "../smartLocator/similarity";
export function healResponse(response: any, expectedSchema: any) {

    const healed: any = {};
    const logs: any[] = [];

    for (let key in expectedSchema) {

        if (response[key] !== undefined) {
            healed[key] = response[key];

        } else {
            const bestMatch = findClosestKey(response, key);

            healed[key] = response[bestMatch];

            logs.push({
                missing: key,
                mappedTo: bestMatch
            });
        }
    }

    console.log(" Healing logs:", logs);

    return healed;
}

function findClosestKey(obj: any, target: string) {
    let bestMatch = "";
    let bestScore = 0;

    for (let key in obj) {
        const score = similarityScore(key, target);

        if (score > bestScore) {
            bestScore = score;
            bestMatch = key;
        }
    }

    return bestMatch;
}
