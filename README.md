# 🎭 Playwright E2E Automation Framework  

![Playwright](https://img.shields.io/badge/Playwright-Automation-green?logo=microsoftplaywright)  
![TypeScript](https://img.shields.io/badge/TypeScript-Framework-blue?logo=typescript)  
![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-lightgrey?logo=githubactions)  

---

## 📌 Overview  

This repository contains a **modular End-to-End (E2E) Test Automation Framework** built with **[Playwright](https://playwright.dev/)** and **TypeScript**.  

It is designed for:  
- Automating **UI regression, functional, and smoke tests**  
- Maintaining scalability with the **Page Object Model (POM)**  
- Running tests across **browsers and platforms**  
- Integrating with **GitHub Actions CI/CD**  
- Generating **HTML Reports** and **Playwright Traces** for debugging  

---

## 📂 Project Structure  

Playwright_E2E_Automation/
│
├── .github/workflows/ # CI/CD pipeline (GitHub Actions)
├── Locators/ # Centralized locators for UI elements
├── base/ # Base setup (browser, fixtures, hooks)
├── data/ # Test data (credentials, configs)
├── pages/ # Page Objects (business workflows)
├── reports/html-report/ # Playwright HTML reports
├── tests/ # Test cases (functional, regression, smoke)
├── utils/ # Reusable helpers (waits, logging, etc.)
│
├── playwright.config.ts # Playwright configuration (baseURL, retries, reporters)
├── package.json # Dependencies & npm scripts
└── README.md # Project documentation

---

## ⚡ Features  

- ✅ Built on **Playwright + TypeScript**  
- ✅ Implements **Page Object Model (POM)**  
- ✅ Supports **cross-browser & cross-platform testing**  
- ✅ Provides **HTML Report & Trace Viewer** for debugging  
- ✅ Integrated with **GitHub Actions CI/CD**  
- ✅ Modular & scalable for future growth  

---

## 🚀 Getting Started  

### 1️⃣ Clone the Repo  
```bash
git clone https://github.com/ZeeshanJumabhoy/Playwright_E2E_Automation.git
cd Playwright_E2E_Automation

2️⃣ Install Dependencies
npm install

3️⃣ Run Tests
# Run all tests
npx playwright test

# Run tests in headed mode
npx playwright test --headed

# Run tests with specific browser
npx playwright test --project=chromium

4️⃣ View Reports
# Open the last HTML report
npx playwright show-report

5️⃣ Debug with Traces
Playwright captures a trace file when a test fails.
