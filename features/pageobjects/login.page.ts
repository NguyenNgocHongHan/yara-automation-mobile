import { $ } from '@wdio/globals'
import Page from './page.js';
import { androidLoginLocator } from '../locators/android/login.locator.js';
import { iosLoginLocator } from '../locators/ios/login.locator.js';
import { resolvePlatformLocators } from '../support/platform.js';

class LoginPage extends Page {
    private get locators () {
        return resolvePlatformLocators({
            android: androidLoginLocator,
            ios: iosLoginLocator,
        });
    }

    get inputUsername () { 
        return $(this.locators.inputUsername);
    }

    get inputPassword () { 
        return $(this.locators.inputPassword);
    }

    get btnSubmit () { 
        return $(this.locators.btnSubmit);
    }

    get alertMessage () {
        return $(this.locators.alertMessage);
    }

    async login (username: string, password: string) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }
}

export default new LoginPage();
