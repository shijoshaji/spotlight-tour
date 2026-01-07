# Spotlight Tour Package Updates

## Goal Description
The goal is to verify the `spotlight-tour` logic, ensure the Angular package uses `ng-packagr`, update `package.json` with a `pub` script for all packages, and validate everything using `npm publint`. Additionally, `README.md` files will be updated for consistency (adding License sections).

## User Review Required
None.

## Proposed Changes

### Core Package (`packages/spotlight-tour/core`)
#### [MODIFY] [package.json](file:///d:/Skill%20Devlopment/IT/GitHub_Public_Repo/jojovms-npm-package-project/packages/spotlight-tour/core/package.json)
- Add `"pub": "npm run build && npm publish --access public"` to `scripts`.

#### [MODIFY] [README.md](file:///d:/Skill%20Devlopment/IT/GitHub_Public_Repo/jojovms-npm-package-project/packages/spotlight-tour/core/README.md)
- Add License section.

### Angular Package (`packages/spotlight-tour/angular`)
#### [MODIFY] [package.json](file:///d:/Skill%20Devlopment/IT/GitHub_Public_Repo/jojovms-npm-package-project/packages/spotlight-tour/angular/package.json)
- Add `"pub": "npm run build && npm publish --access public"` to `scripts`.
- Verify `ng-packagr` usage (no change needed as it is already configured, but will be validated).

#### [MODIFY] [README.md](file:///d:/Skill%20Devlopment/IT/GitHub_Public_Repo/jojovms-npm-package-project/packages/spotlight-tour/angular/README.md)
- Add License section.

### React Package (`packages/spotlight-tour/react`)
#### [MODIFY] [package.json](file:///d:/Skill%20Devlopment/IT/GitHub_Public_Repo/jojovms-npm-package-project/packages/spotlight-tour/react/package.json)
- Add `"pub": "npm run build && npm publish --access public"` to `scripts`.

#### [MODIFY] [README.md](file:///d:/Skill%20Devlopment/IT/GitHub_Public_Repo/jojovms-npm-package-project/packages/spotlight-tour/react/README.md)
- Add License section.

## Verification Plan

### Automated Tests
- Run `npm run build` in each package directory to ensure builds succeed.
- Run `npx publint` in each package directory to verify package correctness.

### Manual Verification
- Inspect `dist` folders to ensure correct output generation.
