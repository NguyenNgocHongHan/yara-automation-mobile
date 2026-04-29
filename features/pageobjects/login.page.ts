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
        return this.bySelector(this.locators.inputUsername);
    }

    get inputPassword () { 
        return this.bySelector(this.locators.inputPassword);
    }

    get btnSubmit () { 
        return this.bySelector(this.locators.btnSubmit);
    }

    get alertMessage () {
        return this.bySelector(this.locators.alertMessage);
    }

    async login (username: string, password: string) {
        await this.typeText(this.inputUsername, username);
        await this.typeText(this.inputPassword, password);
        await this.clickElement(this.btnSubmit);
    }
}

export default new LoginPage();
