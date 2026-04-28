import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect } from '@wdio/globals'

import LanguageSelectionPage from '../pageobjects/language-selection.page.js';

Given(/^the app is on the language selection screen$/, async () => {
    await LanguageSelectionPage.dismissNotificationPromptIfDisplayed();
    await LanguageSelectionPage.waitForScreen();
    await expect(LanguageSelectionPage.title).toBeDisplayed();
});

When(/^I select the (English|Tiếng Việt) language$/, async (language: 'English' | 'Tiếng Việt') => {
    await LanguageSelectionPage.selectLanguage(language);
});

Then(/^the Next button should be enabled$/, async () => {
    await expect(LanguageSelectionPage.nextButton).toBeEnabled();
});
