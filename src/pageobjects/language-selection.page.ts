import { browser } from '@wdio/globals'
import BasePage from './base.page.js';
import { androidLanguageSelectionLocator } from '../locators/android/language-selection.locator.js';
import { iosLanguageSelectionLocator } from '../locators/ios/language-selection.locator.js';
import { resolvePlatformLocators } from '../support/platform.js';

type SupportedLanguage = 'English' | 'Tiếng Việt';

class LanguageSelectionPage extends BasePage {
    private get locators () {
        return resolvePlatformLocators({
            android: androidLanguageSelectionLocator,
            ios: iosLanguageSelectionLocator,
        });
    }

    get title () {
        return this.bySelector(this.locators.title);
    }

    get nextButton () {
        return this.bySelector(this.locators.nextButton);
    }

    async waitForScreen () {
        await this.waitForDisplayed(this.title, 15000);
    }

    async waitForScreenReady () {
        await this.waitForScreen();
        if (driver.isIOS) {
            // iOS may still be settling from startup alerts/animations.
            await browser.pause(500);
        }
        await this.waitForDisplayed(this.getLanguageOption('English'), 10000);
        await this.waitForEnabled(this.getLanguageOption('English'), 10000);
        await this.waitForDisplayed(this.getLanguageOption('Tiếng Việt'), 10000);
        await this.waitForEnabled(this.getLanguageOption('Tiếng Việt'), 10000);
        await this.waitForDisplayed(this.nextButton, 10000);
    }

    async selectLanguage (language: SupportedLanguage) {
        await this.clickElement(this.getLanguageOption(language));
    }

    async selectLanguageWithRetry (language: SupportedLanguage) {
        await this.selectLanguage(language);
        const nextEnabledAfterFirstTap = await this.waitForNextButtonEnabledSafely(1500);

        if (nextEnabledAfterFirstTap) {
            return;
        }

        if (driver.isIOS) {
            // Force a deterministic state change on flaky iOS first-tap behavior.
            const alternateLanguage: SupportedLanguage = language === 'English' ? 'Tiếng Việt' : 'English';
            await this.selectLanguage(alternateLanguage);
        }

        await this.selectLanguage(language);
        await this.waitForNextButtonEnabled();
    }

    async tapNext () {
        await this.clickElement(this.nextButton);
    }

    async isNextButtonEnabled () {
        return this.bySelector(this.locators.nextButton).isEnabled();
    }

    async waitForNextButtonEnabled (timeout = 10000) {
        await browser.waitUntil(
            async () => this.isNextButtonEnabled(),
            {
                timeout,
                interval: 200,
                timeoutMsg: 'Language was selected but Next button did not become enabled.',
            },
        );
    }

    private async waitForNextButtonEnabledSafely (timeout = 1500) {
        try {
            await this.waitForNextButtonEnabled(timeout);
            return true;
        } catch {
            return false;
        }
    }

    private getLanguageOption (language: SupportedLanguage) {
        const normalizedLanguage = language.toLowerCase();

        if (normalizedLanguage === 'english') {
            return this.bySelector(this.locators.languageOptions.english);
        }

        return this.bySelector(this.locators.languageOptions.vietnamese);
    }
}

export default new LanguageSelectionPage();
