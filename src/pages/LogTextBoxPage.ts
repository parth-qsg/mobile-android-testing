import { $ } from '@wdio/globals';
import { expect } from '@wdio/globals';

export class LogTextBoxPage {
  private get title() {
    return $('android=new UiSelector().text("Text/LogTextBox")');
  }

  private get addButton() {
    return $('~Add');
  }

  private get logText() {
    return $('id:io.appium.android.apis:id/text');
  }

  async waitForScreen(): Promise<void> {
    await this.addButton.waitForDisplayed();
  }

  async assertOnLogTextBoxScreen(): Promise<void> {
    await expect(this.title).toBeDisplayed();
  }

  async assertTitleIsVisible(): Promise<void> {
    await expect(this.title).toBeDisplayed();
  }

  async tapAdd(): Promise<void> {
    await this.addButton.click();
  }

  async assertScreenIsDisplayed(): Promise<void> {
    await this.assertOnLogTextBoxScreen();
  }

  async assertLogMessageEquals(expectedMessage: string): Promise<void> {
    await this.waitForScreen();

    const currentText = await this.logText.getText();
    await expect(currentText.trim()).toEqual(expectedMessage);
  }

  async expectMessageNotDisplayed(message: string): Promise<void> {
    await this.waitForScreen();

    const currentText = await this.logText.getText();
    await expect(currentText).not.toContain(message);
  }
}
