# Plan: Refactoring

## Overview

This document outlines a multi-step plan to improve code clarity, fix naming issues, correct typos, and reorganize files in the Birds-of-Israel project. The changes are grouped by concern so each step can be applied and reviewed independently.

---

## 1. Fix File Name Typos

Several source files contain spelling mistakes in their names. Renaming them will make the project easier to navigate and search.

| Current Name | Corrected Name | Issue |
|---|---|---|
| `src/components/playerComponenet.tsx` | `src/components/playerComponent.tsx` | "Componenet" → "Component" |
| `src/layouts/birrd-card-container-layout.tsx` | `src/layouts/bird-card-container-layout.tsx` | "birrd" → "bird" |
| `src/models/languageEnumb.ts` | `src/models/languageEnum.ts` | "Enumb" → "Enum" |

### Steps
1. Rename `src/components/playerComponenet.tsx` → `src/components/playerComponent.tsx`.
2. Update the import in `src/layouts/birrd-card-container-layout.tsx` (and later in `bird-card-container-layout.tsx`) to reference the new file name.
3. Rename `src/layouts/birrd-card-container-layout.tsx` → `src/layouts/bird-card-container-layout.tsx`.
4. Update the import in `src/layouts/app-layout.tsx` to reference the corrected layout file name.
5. Rename `src/models/languageEnumb.ts` → `src/models/languageEnum.ts`.
6. Update all imports of `languageEnumb` across the codebase (at minimum: `src/components/app-header.tsx`, `src/components/app-copyright.tsx`, `src/components/bird-card.tsx`, `src/components/stop-button.tsx`, `src/store/reducer.ts`, `src/hoc/translateService.ts`).

---

## 2. Fix Typos in Code (Variable and Property Names)

### 2a. `src/models/bird.model.ts`
- `"isChoosen"` → `"isChosen"` — misspelled optional property on the `Bird` interface.

### 2b. `src/store/reducer.ts`
- `choosenBird` → `chosenBird` — misspelled field in the `BirdStore` interface and in initial state.
- `"SOUND_STOPED"` (action type string) → `"SOUND_STOPPED"` — missing letter.
- Update the matching `case "SOUND_STOPED":` branch to `case "SOUND_STOPPED":`.

### 2c. `src/components/bird-card.tsx`
- `rais` → `raised` — misspelled state variable (`const [rais, setRaise]` → `const [raised, setRaised]`).
- `mouseEneter` → `mouseEnter` — misspelled event-handler function name.
- `birdDescritionChoosenLang` → `birdDescriptionChosenLang` — two spelling errors in one name.
- `isChoosen` reference → `isChosen` (follow model rename from step 2a).

### 2d. `src/components/app-copyright.tsx`
- `coptRightText` → `copyrightText` — misspelled local variable.

### 2e. `src/components/playerComponent.tsx` (after rename)
- `choosenBird` selector key → `chosenBird` (follow store rename from step 2b).
- `"SOUND_STOPED"` dispatch → `"SOUND_STOPPED"` (follow action-type rename from step 2b).

### 2f. `src/components/stop-button.tsx`
- `choosenBird` selector key → `chosenBird`.

### Steps
1. Apply the `Bird` interface property rename (`isChoosen` → `isChosen`).
2. Apply the `BirdStore` field and initial state rename (`choosenBird` → `chosenBird`).
3. Update the action type strings `"SOUND_STOPED"` and `"CLICK_BIRD"` / `"STOP_SOUND"` / `"SOUND_STOPPED"` references in both the reducer and any component that dispatches them.
4. Apply the local variable renames inside `bird-card.tsx`, `app-copyright.tsx`, and `playerComponent.tsx`.

---

## 3. Improve Code Clarity in `playerComponent.tsx`

The `PlayerComponent` currently performs audio-playback side effects directly in the component body (outside any hook). This causes the side effects to run on every render, which is against React's rules and can cause unexpected behavior.

### Steps
1. Move the audio-playback and stop logic inside a `useEffect` hook, with `[choosenBird, filePlaying, stopBirdId]` as dependencies.
2. Remove the commented-out code blocks (`// const previosAudioElement`, `// const onAbort`, etc.) to reduce noise.
3. Keep `allBirdsAudio` as a module-level constant (it is created once at load time, which is intentional).

**Before (simplified):**
```tsx
const PlayerComponent = () => {
    const choosenBird = useSelector(...);
    // side effects directly in render body
    if (stopBirdId !== 0) { /* pause audio */ }
    else if (choosenBird && ...) { /* play audio */ }
    return <div style={{ flexGrow: 1 }} />;
};
```

**After (simplified):**
```tsx
const PlayerComponent = () => {
    const chosenBird = useSelector(...);
    useEffect(() => {
        if (stopBirdId !== 0) { /* pause audio */ }
        else if (chosenBird && ...) { /* play audio */ }
    }, [chosenBird, filePlaying, stopBirdId, dispatch]);
    return <div style={{ flexGrow: 1 }} />;
};
```

---

## 4. Improve Type Safety in the Redux Store

### 4a. Type the Redux action
The reducer currently accepts `action: any`. Define a discriminated union type for all actions so TypeScript can enforce correct payloads.

```ts
type AppAction =
    | { type: 'LANG_HEB' }
    | { type: 'LANG_EN' }
    | { type: 'CLICK_BIRD'; id: number }
    | { type: 'STARTED_PLAYING'; filePlaying: string }
    | { type: 'STOP_SOUND'; id: number }
    | { type: 'SOUND_STOPPED' };
```

### 4b. Remove the unused `audioElement` field
The `BirdStore` interface declares `audioElement: HTMLAudioElement | null`, but it is never read or written anywhere in the application. Remove it from the interface and from `initialState`.

### 4c. Remove the unused `lang` field
The `BirdStore` interface declares `lang: 'עב' | 'EN'`, but it is only written and never consumed by any component (components use the `language` enum and `langDir` fields instead). Remove it.

### Steps
1. Define the `AppAction` union type in `src/store/reducer.ts` and replace `action: any` with `action: AppAction`.
2. Delete the `audioElement` field from `BirdStore` and `initialState`.
3. Delete the `lang` field from `BirdStore`, `initialState`, and the `LANG_HEB`/`LANG_EN` case branches.

---

## 5. Reorganize the `hoc/` Folder

The folder is named `hoc/` (Higher-Order Components), but it does not contain any HOCs. It contains data, a data-access function, a translation service, and theme definitions. Rename the folder and move files to better-fitting locations.

| Current Path | Suggested Path | Reason |
|---|---|---|
| `src/hoc/appData.json` | `src/data/appData.json` | It is static data, not a HOC |
| `src/hoc/getbirdsdata.ts` | `src/data/getBirdsData.ts` | Co-locate with the data it reads; also fixes casing |
| `src/hoc/translateService.ts` | `src/services/translateService.ts` | It is a service, not a HOC |
| `src/hoc/themes.ts` | `src/styles/themes.ts` | It is a styling concern |

### Steps
1. Create `src/data/`, `src/services/`, and `src/styles/` directories.
2. Move each file to its new location.
3. Update all imports across the codebase.
4. Delete the now-empty `src/hoc/` directory.

---

## 6. Fix the `getbirdsdata.ts` / `getBirdsData.ts` Naming

Beyond moving the file (step 5), rename it to follow consistent camelCase:
- `getbirdsdata.ts` → `getBirdsData.ts`
- Exported function `getAllBirds` is already well-named; no change needed there.

---

## 7. Remove the Unused `theme2` Export from `themes.ts`

`src/hoc/themes.ts` (will become `src/styles/themes.ts`) exports both `theme1` and `theme2`. Only `theme1` is imported anywhere. Either remove `theme2` or, if it is intended for future use, add a comment explaining its purpose.

### Steps
1. If there is no near-term plan to use `theme2`, delete the export.
2. If it should be kept, add a `// TODO:` comment explaining its intended use.

---

## 8. Convert `src/index.js` to TypeScript

`src/index.js` uses JSX and imports `.tsx` files, but is itself a `.js` file. Converting it to `.tsx` makes the entry point consistent with the rest of the codebase and allows TypeScript to check it.

### Steps
1. Rename `src/index.js` → `src/index.tsx`.
2. Add the non-null assertion on the root element: `document.getElementById('root')!`.
3. Update `index.html` if its `src` attribute points explicitly to `index.js`.

---

## 9. Replace Magic String Action Types with Constants

Redux action type strings (`"LANG_HEB"`, `"CLICK_BIRD"`, etc.) appear in both the reducer and in `dispatch` calls inside components. A typo in either place would cause a silent failure. Centralise them as named constants.

### Steps
1. Create `src/store/actionTypes.ts` that exports all action type constants:
   ```ts
   export const LANG_HEB = 'LANG_HEB';
   export const LANG_EN = 'LANG_EN';
   export const CLICK_BIRD = 'CLICK_BIRD';
   export const STARTED_PLAYING = 'STARTED_PLAYING';
   export const STOP_SOUND = 'STOP_SOUND';
   export const SOUND_STOPPED = 'SOUND_STOPPED';
   ```
2. Import and use the constants in `src/store/reducer.ts` (switch cases).
3. Import and use the constants in each component that calls `dispatch`.

---

## 10. Remove Unused Import in `App.tsx`

`src/App.tsx` imports `BirdCardContainerLayout` from the layout file but never uses it (the `AppLayout` component handles rendering). Remove the dead import.

### Steps
1. Delete the unused import line from `src/App.tsx`.

---

## Summary of Changes by File

| File | Changes |
|---|---|
| `src/models/languageEnumb.ts` → `languageEnum.ts` | Rename file |
| `src/models/bird.model.ts` | `isChoosen` → `isChosen` |
| `src/store/reducer.ts` | Rename fields, fix action type strings, add `AppAction` union, remove unused fields |
| `src/store/actionTypes.ts` *(new)* | Centralised action type constants |
| `src/components/playerComponenet.tsx` → `playerComponent.tsx` | Rename file, move side effects into `useEffect`, remove dead comments |
| `src/components/bird-card.tsx` | Fix variable name typos, update field references |
| `src/components/app-copyright.tsx` | Fix `coptRightText` typo |
| `src/components/app-header.tsx` | Update import paths |
| `src/components/stop-button.tsx` | Update `choosenBird` → `chosenBird` |
| `src/layouts/birrd-card-container-layout.tsx` → `bird-card-container-layout.tsx` | Rename file, update imports |
| `src/layouts/app-layout.tsx` | Update import paths |
| `src/hoc/` → `src/data/`, `src/services/`, `src/styles/` | Reorganise folder |
| `src/hoc/getbirdsdata.ts` → `src/data/getBirdsData.ts` | Rename file |
| `src/hoc/themes.ts` → `src/styles/themes.ts` | Move file, remove unused `theme2` |
| `src/index.js` → `src/index.tsx` | Convert to TypeScript |
| `src/App.tsx` | Remove unused import |
