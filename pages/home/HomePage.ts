import locators from '../../data/identifiers/mobile/home.json';
import { BasePage } from '../BasePage';

export class HomePage extends BasePage {
  private get textMenuItem() {
    return $(this.getPlatformLocator(locators, 'textMenuItem'));
  }

  async openTextMenu(): Promise<void> {
    await this.click(this.textMenuItem);
  }

  async assertHomeDisplayed(): Promise<void> {
    await this.waitForDisplayed(this.textMenuItem);
    await expect(this.textMenuItem).toBeDisplayed();
  }
}
