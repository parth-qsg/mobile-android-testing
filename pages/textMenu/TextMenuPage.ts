import locators from '../../data/identifiers/mobile/textMenu.json';
import { BasePage } from '../BasePage';

export class TextMenuPage extends BasePage {
  private get logTextBoxMenuItem() {
    return $(this.getPlatformLocator(locators, 'logTextBoxMenuItem'));
  }

  async openLogTextBox(): Promise<void> {
    await this.click(this.logTextBoxMenuItem);
  }

  async assertTextMenuDisplayed(): Promise<void> {
    await this.waitForDisplayed(this.logTextBoxMenuItem);
    await expect(this.logTextBoxMenuItem).toBeDisplayed();
  }
}
