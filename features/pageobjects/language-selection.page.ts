import { browser } from '@wdio/globals'
import Page from './page.js';
import { androidLanguageSelectionLocator } from '../locators/android/language-selection.locator.js';
import { iosLanguageSelectionLocator } from '../locators/ios/language-selection.locator.js';
import { resolvePlatformLocators } from '../support/platform.js';

type SupportedLanguage = 'English' | 'Tiếng Việt';

class LanguageSelectionPage extends Page {
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
        await browser.pause(250);

        if (await this.isNextButtonEnabled()) {
            return;
        }

        await this.selectLanguage(language);
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

    private getLanguageOption (language: SupportedLanguage) {
        const normalizedLanguage = language.toLowerCase();

        if (normalizedLanguage === 'english') {
            return this.bySelector(this.locators.languageOptions.english);
        }

        return this.bySelector(this.locators.languageOptions.vietnamese);
    }
}

export default new LanguageSelectionPage();
