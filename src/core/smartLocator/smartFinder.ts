
import locators from "./locatorRepository.json";
import { healElement } from "./healingEngine";

export async function findElement(driver: any, key: string) {
    const locatorSet = (locators as any)[key];

    for (const locator of locatorSet.selectors) {
        try {
            return await driver.findElement(locator);
        } catch {
            continue;
        }
    }

    return await healElement(driver, key);
}
