import * as path from 'node:path';
import { sharedConfig } from './wdio.shared.conf.js';

const androidAppPath = process.env.ANDROID_APP_PATH || path.join(process.cwd(), './apps/FC preprod 4.39.3123.apk');
const androidDeviceName = process.env.ANDROID_DEVICE_NAME || 'emulator-5554';
const autoGrantPermissions = process.env.ANDROID_AUTO_GRANT_PERMISSIONS !== 'false';

export const config: WebdriverIO.Config = {
    ...sharedConfig,
    capabilities: [{
        'appium:platformName': 'Android',
        'appium:automationName': 'UiAutomator2',
        'appium:deviceName': androidDeviceName,
        ...(androidAppPath ? { 'appium:app': androidAppPath } : {}),
        ...(process.env.ANDROID_APP_PACKAGE ? { 'appium:appPackage': process.env.ANDROID_APP_PACKAGE } : {}),
        ...(process.env.ANDROID_APP_ACTIVITY ? { 'appium:appActivity': process.env.ANDROID_APP_ACTIVITY } : {}),
        'appium:autoGrantPermissions': autoGrantPermissions,
        'appium:newCommandTimeout': 240,
    }]
};
