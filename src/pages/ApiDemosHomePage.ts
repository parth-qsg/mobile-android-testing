import { $, expect } from '@wdio/globals';

export class ApiDemosHomePage {
  async assertTextMenuIsVisible(): Promise<void> {
    const textMenu = await this.textMenu;
    await expect(textMenu).toBeDisplayed();
  }

  private get textMenu() {
    return $('~Text');
  }

  async openTextMenu(): Promise<void> {
    await this.textMenu.waitForDisplayed();
    await this.textMenu.click();
  }
}
