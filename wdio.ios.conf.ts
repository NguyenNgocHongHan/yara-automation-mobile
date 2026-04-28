import * as path from 'node:path';
import { sharedConfig } from './wdio.shared.conf.js';
import { parseBooleanEnv } from './features/support/env.js';

const iosAppPath = process.env.IOS_APP_PATH || path.join(process.cwd(), './apps/FarmCare.app');
const iosDeviceName = process.env.IOS_DEVICE_NAME || 'iPhone 16';
const iosPlatformVersion = process.env.IOS_PLATFORM_VERSION || '18.5';
const autoAcceptAlerts = parseBooleanEnv(process.env.IOS_AUTO_ACCEPT_ALERTS, true);

export const config: WebdriverIO.Config = {
    ...sharedConfig,
    capabilities: [{
        'appium:platformName': 'iOS',
        'appium:automationName': 'XCUITest',
        'appium:deviceName': iosDeviceName,
        'appium:platformVersion': iosPlatformVersion,
        'appium:app': iosAppPath,
        'appium:autoAcceptAlerts': autoAcceptAlerts,
        'appium:newCommandTimeout': 240,
    }]
};
