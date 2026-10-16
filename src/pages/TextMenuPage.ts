import { $, expect } from '@wdio/globals';

export class TextMenuPage {
  private get logTextBoxMenuItem() {
    return $('~LogTextBox');
  }

  async assertLogTextBoxOptionIsVisible(): Promise<void> {
    await expect(this.logTextBoxMenuItem).toBeDisplayed();
  }

  async openLogTextBox(): Promise<void> {
    await this.logTextBoxMenuItem.waitForDisplayed();
    await this.logTextBoxMenuItem.click();
  }
}
