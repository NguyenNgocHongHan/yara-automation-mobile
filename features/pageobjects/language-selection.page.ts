import { $ } from '@wdio/globals'
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
        return $(this.locators.title);
    }

    get nextButton () {
        return $(this.locators.nextButton);
    }

    get allowNotificationsButton () {
        return driver.isIOS ? $(iosLanguageSelectionLocator.notificationPrompt.allowButton) : null;
    }

    get denyNotificationsButton () {
        return driver.isIOS ? $(iosLanguageSelectionLocator.notificationPrompt.denyButton) : null;
    }

    async waitForScreen () {
        await this.title.waitForDisplayed({
            timeout: 15000,
        });
    }

    async dismissNotificationPromptIfDisplayed (action: 'allow' | 'deny' = 'allow') {
        if (!driver.isIOS) {
            return;
        }

        const targetButton = action === 'allow'
            ? this.allowNotificationsButton
            : this.denyNotificationsButton;

        if (!targetButton) {
            return;
        }

        const isDisplayed = await targetButton.isDisplayed().catch(() => false);

        if (isDisplayed) {
            await targetButton.click();
        }
    }

    async selectLanguage (language: SupportedLanguage) {
        await this.getLanguageOption(language).click();
    }

    async isNextButtonEnabled () {
        return this.nextButton.isEnabled();
    }

    private getLanguageOption (language: SupportedLanguage) {
        const normalizedLanguage = language.toLowerCase();

        if (normalizedLanguage === 'english') {
            return $(this.locators.languageOptions.english);
        }

        return $(this.locators.languageOptions.vietnamese);
    }
}

export default new LanguageSelectionPage();
