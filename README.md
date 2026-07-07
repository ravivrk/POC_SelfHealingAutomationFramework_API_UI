
# Self-Healing Test Automation & Evaluation Framework

## Overview

This project demonstrates a modern **test automation and evaluation framework** built using Node.js, TypeScript, and Selenium.

The framework goes beyond traditional pass/fail testing by introducing:

- Self-healing automation
- End-to-end UI + API validation
- Rule-based evaluation (Giskard-inspired)
- Scoring-based validation (DeepEval-inspired)

It is designed to improve **test resilience, reduce maintenance effort, and provide intelligent quality assessment** for modern distributed systems.

---

## Key Features

### Self-Healing Automation
- Automatically adapts to UI locator changes using fallback strategies
- Handles API schema changes (e.g., `userName` → `username`)
- Reduces test flakiness and maintenance effort

---

### Automated Evaluation Engine
- Validates responses using business rules
- Detects missing or invalid data
- Extends beyond simple assertions

---

### Risk Detection
- Identifies anomalies such as:
  - invalid values
  - abnormal responses
  - high-risk transactions
- Logs risks without blocking execution

---

### Scoring System (DeepEval-style)
- Produces a score between 0 and 1
- Evaluates response quality across:
  - Completeness
  - Correctness
  - Business validity
- Assigns quality levels:
  - HIGH
  - MEDIUM
  - LOW

---

### End-to-End Testing
- UI Login → API Payment → Evaluation → Scoring
- Demonstrates system-level validation
- Supports real-world workflow testing

---

## Architecture
Test Layer
↓
UI Layer (Page Objects)
↓
API Layer (Services)
↓
Self-Healing Engine
↓
Evaluation Engine
↓
Risk Detection
↓
Scoring Engine
↓
Final Decision

---

## Project Structure

src/
core/
smartLocator/
apiHealing/
evaluation/
evaluationEngine.ts
riskDetector.ts
scoringEngine.ts
pages/
login.page.ts
services/
payment.service.ts
tests/
ui/
api/
e2e/

---

## Setup

Install dependencies:

npm install

##Run Tests

npm run test:api
npm run test:ui
npm run test:e2e
npm run test:all

## E2E flow
This framework validates a complete workflow:

Perform login via UI using Selenium
Create a payment using API
Apply self-healing to normalize response schema
Evaluate response using rule-based validation
Detect potential risks
Calculate quality score
Classify response quality and determine final result

## Sample output
Login successful

Raw Payment: { userName: "Ravi", amount: 100 }

Healed Response: { username: "Ravi", amount: 100 }

Score: 0.87

Score Breakdown:
{
  completeness: 1.0,
  correctness: 1.0,
  validity: 0.67
}

Quality Level: HIGH
End-to-end test completed successfully


## Technologies Used

Node.js
TypeScript
Selenium WebDriver
Mocha
Axios

## Advanced Capabilities
This framework incorporates concepts inspired by:
Giskard → automated evaluation and risk detection
DeepEval → scoring-based validation
AI-driven evaluation frameworks for intelligent systems

## Use Cases

Testing microservices and APIs
Validating payment workflows
Reducing flaky UI automation
Intelligent QA for distributed systems
Continuous validation in CI/CD pipelines

## Future Enhancements

UI scoring (user experience validation)
Historical score tracking
Dashboard for visualization
Integration with AI-based evaluation tools

## Author
Ravi Kumar Vandadi
Senior Technical Lead – Software Test Engineering