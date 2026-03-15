# Plan: E2E Testing with Playwright

## Overview

Add end-to-end tests for the Birds-of-Israel app using [Playwright](https://playwright.dev/), covering critical user flows across real browsers.

---

## 1. Install Playwright

```bash
npm init playwright@latest
```

- Choose TypeScript.
- Place tests under `e2e/`.
- Select browsers: Chromium, Firefox, WebKit.

---

## 2. Configuration

Create `playwright.config.ts` at the project root:

```ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL: 'http://localhost:5173',
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: true,
  },
});
```

---

## 3. Test Scenarios

| Scenario | Description |
|---|---|
| Home page loads | Assert the page title and main bird list render |
| Bird search | Type in the search box; assert filtered results appear |
| Bird detail | Click a bird card; assert detail view opens with correct data |
| Navigation | Use nav links; assert correct pages render |
| Responsive layout | Run tests at mobile viewport; assert layout adapts |

---

## 4. CI Integration

Add a GitHub Actions step after the build step:

```yaml
- name: Install Playwright browsers
  run: npx playwright install --with-deps

- name: Run E2E tests
  run: npx playwright test
```

Upload the HTML report as a workflow artifact for review on failure.

---

## 5. Package.json Scripts

```json
"scripts": {
  "test:e2e": "playwright test",
  "test:e2e:ui": "playwright test --ui"
}
```
