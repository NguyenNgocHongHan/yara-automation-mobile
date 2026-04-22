import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect, $ } from '@wdio/globals'

import LoginPage from '../pageobjects/login.page.js';

Given(/^I am on the login page$/, async () => {
    // On mobile, just check if the login button is displayed to confirm we're on the right page
    await expect(LoginPage.btnSubmit).toBeDisplayed();
});

When(/^I login with (\w+) and (.+)$/, async (username, password) => {
    await LoginPage.login(username, password)
});

Then(/^I should see a message saying (.*)$/, async (message) => {
    // You can customize this based on your app's alert or message component
    // Example: checking an alert title or a text label
    const alert = await $('~alert-message'); 
    await expect(alert).toHaveText(expect.stringContaining(message));
});
