import locators from '../../data/identifiers/mobile/logTextBox.json';
import { BasePage } from '../BasePage';

export class LogTextBoxPage extends BasePage {
  private get addButton() {
    return $(this.getPlatformLocator(locators, 'addButton'));
  }

  private get logTextArea() {
    return $(this.getPlatformLocator(locators, 'logTextArea'));
  }

  async clickAdd(): Promise<void> {
    await this.click(this.addButton);
  }

  async assertScreenDisplayed(): Promise<void> {
    await this.waitForDisplayed(this.addButton);
    await expect(this.addButton).toBeDisplayed();
    await expect(this.logTextArea).toBeDisplayed();
  }

  async assertLogIsEmpty(): Promise<void> {
    // The log area is a TextView that may contain whitespace/newlines even when "empty".
    const text = await this.getElementText(this.logTextArea);
    await expect(text.replace(/\s+/g, '')).toEqual('');
  }

  async assertLogContainsText(expected: string): Promise<void> {
    const text = await this.getElementText(this.logTextArea);
    await expect(text.toLowerCase()).toContain(expected.toLowerCase());
  }

  async assertLogHasAtLeastOccurrences(params: { expectedText: string; minOccurrences: number }): Promise<void> {
    const text = await this.getElementText(this.logTextArea);

    // Count occurrences case-insensitively and safely (avoid split() mismatch when casing differs).
    const escaped = params.expectedText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const matches = text.match(new RegExp(escaped, 'gi'));
    const occurrences = matches ? matches.length : 0;

    await expect(occurrences).toBeGreaterThanOrEqual(params.minOccurrences);
  }
}
