import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect } from '@wdio/globals'

import LanguageSelectionPage from '../pageobjects/language-selection.page.js';

Given(/^the app is on the language selection screen$/, async () => {
    await LanguageSelectionPage.waitForScreenReady();
    await expect(LanguageSelectionPage.title).toBeDisplayed();
});

When(/^I select the (English|Tiếng Việt) language$/, async (language: 'English' | 'Tiếng Việt') => {
    await LanguageSelectionPage.selectLanguageWithRetry(language);
});

Then(/^the Next button should be enabled$/, async () => {
    await LanguageSelectionPage.waitForNextButtonEnabled();
    await expect(await LanguageSelectionPage.isNextButtonEnabled()).toBe(true);
});
