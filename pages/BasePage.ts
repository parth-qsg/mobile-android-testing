type PlatformLocators = { android: Record<string, string>; iOS?: Record<string, string> };

export class BasePage {
  protected getPlatformLocator<T extends PlatformLocators>(
    pageLocators: T,
    key: keyof T['android'] & string,
  ): string {
    const platform = (process.env.PLATFORM as 'android' | 'iOS') || 'android';
    const platformLocators = pageLocators[platform] as Record<string, string> | undefined;
    return platformLocators?.[key] || pageLocators.android[key];
  }

  async waitForDisplayed(elementPromise: WebdriverIO.Element | ChainablePromiseElement, timeout = 10000): Promise<void> {
    const element = await Promise.resolve(elementPromise);
    await element.waitForDisplayed({ timeout });
  }

  async click(elementPromise: WebdriverIO.Element | ChainablePromiseElement, timeout = 10000): Promise<void> {
    await this.waitForDisplayed(elementPromise, timeout);
    const element = await Promise.resolve(elementPromise);
    await element.click();
  }

  async setInputValue(elementPromise: WebdriverIO.Element | ChainablePromiseElement, value: string | number, timeout = 10000): Promise<void> {
    await this.waitForDisplayed(elementPromise, timeout);
    const element = await Promise.resolve(elementPromise);
    await element.click();
    await element.setValue(value);
  }

  async getElementText(elementPromise: WebdriverIO.Element | ChainablePromiseElement, timeout = 10000): Promise<string> {
    await this.waitForDisplayed(elementPromise, timeout);
    const element = await Promise.resolve(elementPromise);
    return (await element.getText()).trim();
  }

  async isDisplayed(elementPromise: WebdriverIO.Element | ChainablePromiseElement): Promise<boolean> {
    const element = await Promise.resolve(elementPromise);
    return element.isDisplayed().catch(() => false);
  }
}
