import { Then } from '@wdio/cucumber-framework';
import { expect } from '@wdio/globals';
import { IMobileWorld } from '../../utils/support/world.interface';

const SELECTORS = {
  logTextView: 'id:io.appium.android.apis:id/text',
} as const;

async function getLogText(): Promise<string> {
  const logTextView = await $(SELECTORS.logTextView);
  await logTextView.waitForDisplayed();
  return (await logTextView.getText()).trim();
}

Then('the "this is a test" message is displayed', async function (this: IMobileWorld) {
  await browser.waitUntil(
    async () => {
      const logText = await getLogText();
      return logText.toLowerCase().includes('this is a test');
    },
    {
      timeoutMsg: 'Expected "this is a test" message to be displayed in the log',
    }
  );

  const logText = await getLogText();
  expect(logText.toLowerCase()).toContain('this is a test');
});
