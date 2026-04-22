import path from 'path';
import { config as sharedConfig } from './wdio.shared.conf.js';

export const config: WebdriverIO.Config = {
    ...sharedConfig,
    capabilities: [{
        'appium:platformName': 'Android',
        'appium:automationName': 'UiAutomator2',
        'appium:deviceName': 'Android_Emulator', // Thay bằng tên máy của bạn (adb devices)
        'appium:app': path.join(process.cwd(), './apps/android-app.apk'), // Thay bằng tên file apk thật
        'appium:newCommandTimeout': 240,
    }]
};
