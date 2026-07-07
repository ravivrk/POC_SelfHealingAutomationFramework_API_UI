# POC_SelfHealingAutomationFramework_API_UI
AI-powered self-healing automation framework using Node.js, Selenium, and TypeScript


## Quick Start

```bash
git clone https://github.com/ravivrk/POC_SelfHealingAutomationFramework_API_UI.git
cd POC_SelfHealingAutomationFramework_API_UI

npm install

# Run API tests
npm run test

# Run UI tests
npm run test:ui


## Key Feature: Self-Healing Automation

This framework automatically recovers from:

- Broken UI locators (fallback + similarity matching)
- API schema changes (dynamic field mapping)

Example:
- API returns `userName`
- Test expects `username`
- Framework automatically maps and continues execution


# Demo Scenario

1. Break the primary locator in locatorRepository.json
2. Run UI test
3. Framework falls back to alternate locator
4. Test still passes

This demonstrates resilient automation design.


## Sample Output

Payment Response: { userName: 'Ravi', amount: 100 }

Healing Logs:
{ missing: 'username', mappedTo: 'userName' }

Test Passed
