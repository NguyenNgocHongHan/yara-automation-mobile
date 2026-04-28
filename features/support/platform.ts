export type PlatformLocatorMap<T> = {
    android: T;
    ios: T;
};

export function resolvePlatformLocators<T>(locators: PlatformLocatorMap<T>): T {
    if (driver.isAndroid) {
        return locators.android;
    }

    if (driver.isIOS) {
        return locators.ios;
    }

    throw new Error('Unable to determine the current mobile platform.');
}
