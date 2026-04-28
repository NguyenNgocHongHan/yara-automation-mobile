export const iosLanguageSelectionLocator = {
    title: '//*[@label="Select Language" or @name="Select Language"]',
    nextButton: '//*[@label="Next" or @name="Next"]',
    languageOptions: {
        english: '//*[@label="English" or @name="English"]',
        vietnamese: '//*[@label="Tiếng Việt" or @name="Tiếng Việt"]',
    },
    notificationPrompt: {
        allowButton: '//XCUIElementTypeButton[@name="Allow"]',
        denyButton: '//XCUIElementTypeButton[@name="Don\'t Allow"]',
    },
};
