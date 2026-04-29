import { $ } from '@wdio/globals'

type UIElement = ReturnType<typeof $>;

export default class Page {
    protected byAccessibilityId (id: string) {
        return $(`~${id}`);
    }

    protected byXpath (xpath: string) {
        return $(xpath);
    }

    protected bySelector (selector: string) {
        return selector.startsWith('~')
            ? this.byAccessibilityId(selector.slice(1))
            : this.byXpath(selector);
    }

    protected byAndroidUiSelector (selector: string) {
        return $(`android=${selector}`);
    }

    protected byAndroidResourceId (resourceId: string) {
        return this.byAndroidUiSelector(`new UiSelector().resourceId("${resourceId}")`);
    }

    protected async waitForDisplayed (element: UIElement, timeout = 10000) {
        await element.waitForDisplayed({ timeout });
    }

    protected async waitForEnabled (element: UIElement, timeout = 10000) {
        await element.waitForEnabled({ timeout });
    }

    protected async clickElement (element: UIElement, timeout = 10000) {
        await this.waitForDisplayed(element, timeout);
        await this.waitForEnabled(element, timeout);
        await element.click();
    }

    protected async typeText (element: UIElement, value: string, timeout = 10000) {
        await this.waitForDisplayed(element, timeout);
        await this.waitForEnabled(element, timeout);
        await element.setValue(value);
    }
}
