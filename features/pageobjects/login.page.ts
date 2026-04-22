import { $ } from '@wdio/globals'
import Page from './page.js';

class LoginPage extends Page {
    /**
     * Define selectors using a cross-platform approach.
     * Use Accessibility ID (~) if possible, it's the most reliable for both.
     */
    get inputUsername () { 
        // Example: If ID is different between platforms
        return driver.isAndroid 
            ? $('//android.widget.EditText[@content-desc="input-email"]') 
            : $('~input-email'); 
    }

    get inputPassword () { 
        return $('~input-password'); // Using accessibility ID (~), which works for both if dev sets it same
    }

    get btnSubmit () { 
        return $('~button-LOGIN'); 
    }

    async login (username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }
}

export default new LoginPage();
