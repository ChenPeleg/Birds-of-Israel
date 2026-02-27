# Plan: Upgrade React to Latest Version and Replace Webpack with Vite

## Overview

This document outlines the steps required to modernize the Birds-of-Israel project by upgrading React to its latest version, replacing the Webpack-based `react-scripts` build tool with Vite, and replacing Jest with Vitest.

---

## 1. Upgrade React to the Latest Version

### Current state
- `react`: `^17.0.2`
- `react-dom`: `^17.0.2`
- `@types/react`: `^17.0.19`
- `@types/react-dom`: `^17.0.9`

### Steps
1. Update `react` and `react-dom` to the latest stable version (React 18+):
   ```bash
   npm install react@latest react-dom@latest
   ```
2. Update the corresponding TypeScript type packages:
   ```bash
   npm install --save-dev @types/react@latest @types/react-dom@latest
   ```
3. Update the application entry point (`src/index.tsx`) to use the new React 18 `createRoot` API:
   ```tsx
   import { createRoot } from 'react-dom/client';
   const root = createRoot(document.getElementById('root')!);
   root.render(<App />);
   ```
4. Address any breaking changes or deprecation warnings introduced by React 18 (e.g., concurrent mode, automatic batching).

---

## 2. Replace `react-scripts` (Webpack) with Vite

### Current state
- Build tool: `react-scripts@4.0.3` (internally uses Webpack)
- Dev dependency: `@types/webpack-env`

### Steps
1. Remove `react-scripts` and webpack-related dependencies:
   ```bash
   npm uninstall react-scripts @types/webpack-env
   ```
2. Install Vite and the React plugin:
   ```bash
   npm install --save-dev vite @vitejs/plugin-react
   ```
3. Create a `vite.config.ts` at the project root:
   ```ts
   import { defineConfig } from 'vite';
   import react from '@vitejs/plugin-react';

   export default defineConfig({
     plugins: [react()],
   });
   ```
4. Move `public/index.html` to the project root (Vite uses it as the entry point) and update script references:
   ```html
   <script type="module" src="/src/index.tsx"></script>
   ```
5. Update `tsconfig.json` to target modern ES modules as required by Vite (changes go under `"compilerOptions"`):
   - Set `"target"` to `"ESNext"`
   - Set `"module"` to `"ESNext"`
   - Add `"types": ["vite/client"]` under `compilerOptions`
6. Update `package.json` scripts:
   ```json
   "scripts": {
     "start": "vite",
     "build": "vite build",
     "preview": "vite preview"
   }
   ```
7. Replace any `process.env.REACT_APP_*` environment variable references with `import.meta.env.VITE_*` equivalents (Vite convention).
8. Replace `node-sass` with `sass` (the Dart Sass implementation), which Vite supports natively:
   ```bash
   npm uninstall node-sass
   npm install --save-dev sass
   ```

---

## 3. Replace Jest with Vitest

### Current state
- Test runner: Jest (via `react-scripts`)
- `@testing-library/jest-dom`: `^5.14.1`
- `@testing-library/react`: `^11.2.7`
- `@testing-library/user-event`: `^12.8.3`
- `@types/jest`: `^27.0.1`

### Steps
1. Remove Jest-related dependencies that come with `react-scripts`:
   ```bash
   npm uninstall @types/jest
   ```
2. Install Vitest and required peer packages, and upgrade `@testing-library/jest-dom` to the latest version compatible with Vitest:
   ```bash
   npm install --save-dev vitest @vitest/coverage-v8 jsdom @testing-library/jest-dom@latest
   ```
3. Update `@testing-library/react` and `@testing-library/user-event` to versions compatible with React 18:
   ```bash
   npm install --save-dev @testing-library/react@latest @testing-library/user-event@latest
   ```
4. Add Vitest configuration to `vite.config.ts`:
   ```ts
   import { defineConfig } from 'vite';
   import react from '@vitejs/plugin-react';

   export default defineConfig({
     plugins: [react()],
     test: {
       globals: true,
       environment: 'jsdom',
       setupFiles: './src/setupTests.ts',
     },
   });
   ```
5. Update `tsconfig.json` to add Vitest globals (removes the need for `@types/jest`):
   ```json
   {
     "compilerOptions": {
       "types": ["vite/client", "vitest/globals"]
     }
   }
   ```
6. Update `package.json` test script:
   ```json
   "scripts": {
     "test": "vitest run",
     "test:watch": "vitest"
   }
   ```
7. Verify all existing test files work with Vitest. Although the API is largely Jest-compatible, be aware of the following differences that may require updates:
   - Replace `jest.mock(...)` with `vi.mock(...)`
   - Replace `jest.fn()` / `jest.spyOn()` with `vi.fn()` / `vi.spyOn()`
   - Replace `jest.useFakeTimers()` / `jest.runAllTimers()` with `vi.useFakeTimers()` / `vi.runAllTimers()`
   - Module mocking semantics differ slightly; review any `__mocks__` directories for compatibility.

---

## 4. Remove gh-pages References

> **Note:** Deployment via `gh-pages` will be replaced by a GitHub Actions workflow in a future task. For now, only remove the existing `gh-pages` configuration from the project.

### Current state
- `gh-pages`: `^3.2.3` (dev dependency)
- `package.json` scripts: `predeploy` and `deploy`
- `package.json` field: `homepage`

### Steps
1. Uninstall the `gh-pages` package:
   ```bash
   npm uninstall gh-pages
   ```
2. Remove the `predeploy` and `deploy` scripts from `package.json`.
3. Remove the `homepage` field from `package.json` (or leave it as documentation until the GitHub Actions deployment is set up).

---

## Summary of Dependency Changes

| Package | Action |
|---|---|
| `react`, `react-dom` | Upgrade to latest (v18+) |
| `@types/react`, `@types/react-dom` | Upgrade to latest |
| `react-scripts` | **Remove** |
| `@types/webpack-env` | **Remove** |
| `vite` | **Add** |
| `@vitejs/plugin-react` | **Add** |
| `node-sass` | **Remove** → replace with `sass` |
| `@types/jest` | **Remove** |
| `vitest` | **Add** |
| `@vitest/coverage-v8` | **Add** |
| `jsdom` | **Add** |
| `@testing-library/react` | Upgrade to latest |
| `@testing-library/user-event` | Upgrade to latest |
| `gh-pages` | **Remove** |
