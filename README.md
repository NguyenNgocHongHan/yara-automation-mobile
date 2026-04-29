# yara-automation-mobile

Mobile automation framework using WebdriverIO + Appium + Cucumber + TypeScript.

## Tech stack

- WebdriverIO runner + Cucumber framework
- Appium 3 with UiAutomator2 (Android) and XCUITest (iOS)
- TypeScript (strict mode)

## Project structure

```text
src/
  features/       # Gherkin feature files
  steps/          # Step definitions (glue code)
  pageobjects/    # Page object classes
  locators/       # Platform-specific selectors (android/ios)
  support/        # Shared helpers (env parsing, platform mapping)
wdio.shared.conf.ts
wdio.android.conf.ts
wdio.ios.conf.ts
```

## Setup

1. Install dependencies:
   - `npm install`
2. Prepare app artifacts in `apps/` (ignored by git):
   - Android: `.apk`
   - iOS: `.app` (or adjust path as needed)
3. Configure `.env` from `.env.example`.

## Run tests

- Android:
  - `npm run wdio:android`
- iOS:
  - `npm run wdio:ios`

## Environment variables

Main variables:

- `ANDROID_APP_PATH`
- `ANDROID_DEVICE_NAME`
- `ANDROID_APP_PACKAGE`
- `ANDROID_APP_ACTIVITY`
- `ANDROID_AUTO_GRANT_PERMISSIONS`
- `IOS_APP_PATH`
- `IOS_DEVICE_NAME`
- `IOS_PLATFORM_VERSION`
- `IOS_AUTO_ACCEPT_ALERTS`

## Notes

- Keep step definitions thin; put interaction logic in page objects.
- Keep selectors in `src/locators` and use platform mapping in page objects.
- Prefer deterministic waits over fixed sleeps whenever possible.
