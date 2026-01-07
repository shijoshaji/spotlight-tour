# Angular Migration Guide: Vite to ng-packagr

This guide documents how to migrate an Angular package from a generic Vite build to the standard Angular Package Format (APF) using `ng-packagr`.

**Why?**
Vite builds generic JS bundles that lack Angular's Ivy metadata (`ɵprov`, `ɵcmp`). This causes "Provider not found" errors and other issues in consuming Angular apps. `ng-packagr` ensures correct metadata generation.

## 1. Install Dependencies
Install `ng-packagr` and the Angular compiler packages as development dependencies. Ensure the version matches your Angular version (e.g., v17).

```bash
npm install --save-dev ng-packagr@^17.0.0 @angular/compiler@^17.0.0 @angular/compiler-cli@^17.0.0
```

## 2. Create Configuration
Create a `ng-package.json` file in your package root (e.g., `packages/my-lib/ng-package.json`):

```json
{
  "$schema": "../../node_modules/ng-packagr/ng-package.schema.json",
  "dest": "dist",
  "lib": {
    "entryFile": "src/index.ts"
  },
  "allowedNonPeerDependencies": [
    "." 
    // Add any internal monorepo packages here if they are dependencies
    // e.g., "@jojovms/offline-toast-core"
  ]
}
```

## 3. Update package.json

### A. Scripts
Change your build script:
```diff
- "build": "vite build",
+ "build": "ng-packagr -p ng-package.json",
```

### B. Entry Points
**CRITICAL:** Remove manual `main`, `module`, `types`, and `exports` fields from your source `package.json`. `ng-packagr` will automatically generate a valid `package.json` inside the `dist` folder.

**DELETE these lines:**
```json
"main": "./dist/...",
"module": "./dist/...",
"types": "./dist/...",
"exports": { ... }
```

**KEEP/ADD this:**
```json
"files": [
  "dist"
]
```

## 4. Build & Verify
Run the build:
```bash
npm run build
```

Verify the output in `dist/`. It should contain:
- `fesm2022/`
- `esm2022/`
- `package.json` (auto-generated)

## 5. Updates to Source Code
If you were using `@Injectable({ providedIn: 'root' })`, it should now work correctly without manual providers in `AppModule`.
