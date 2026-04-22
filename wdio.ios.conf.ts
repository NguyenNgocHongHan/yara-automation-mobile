import path from 'path';
import { config as sharedConfig } from './wdio.shared.conf.js';

export const config: WebdriverIO.Config = {
    ...sharedConfig,
    capabilities: [{
        'appium:platformName': 'iOS',
        'appium:automationName': 'XCUITest',
        'appium:deviceName': 'iPhone 15', // Tên Simulator bạn có
        'appium:platformVersion': '17.2', // Thay bằng version bạn đã cài
        'appium:app': path.join(process.cwd(), './apps/ios-app.app'), // Thay bằng file .app thật
        'appium:newCommandTimeout': 240,
    }]
};
