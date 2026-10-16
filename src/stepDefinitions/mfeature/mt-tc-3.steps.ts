import { Given, Then, When } from '@wdio/cucumber-framework';
import { expect } from '@wdio/globals';
import { IMobileWorld } from '../../utils/support/world.interface';

const SELECTORS = {
  textMenu: '~Text',
  logTextBoxMenuItem: '~LogTextBox',
  addButton: '~Add',
  logTextView: 'id:io.appium.android.apis:id/text',
} as const;

async function openLogTextBoxFromTextMenu(): Promise<void> {
  const textMenu = await $(SELECTORS.textMenu);
  await textMenu.waitForDisplayed();
  await textMenu.click();

  const logTextBox = await $(SELECTORS.logTextBoxMenuItem);
  await logTextBox.waitForDisplayed();
  await logTextBox.click();

  const addButton = await $(SELECTORS.addButton);
  await addButton.waitForDisplayed();
}

async function getLogText(): Promise<string> {
  const logTextView = await $(SELECTORS.logTextView);
  await logTextView.waitForDisplayed();
  return (await logTextView.getText()).trim();
}

function countOccurrences(haystack: string, needle: string): number {
  if (!needle) return 0;
  return haystack.split(needle).length - 1;
}

Given(
  'the user navigates to the "LogTextBox" screen from the "Text" menu',
  async function (this: IMobileWorld) {
    await openLogTextBoxFromTextMenu();
  }
);

Then(
  'the log area does not contain the "this is a test" message',
  async function (this: IMobileWorld) {
    const logText = await getLogText();
    expect(logText.toLowerCase()).not.toContain('this is a test');
  }
);

When('the user clicks on the "ADD" button', async function (this: IMobileWorld) {
  const addButton = await $(SELECTORS.addButton);
  await addButton.waitForDisplayed();
  await addButton.click();
});

Then(
  'the "this is a test" message is displayed once in the log',
  async function (this: IMobileWorld) {
    await browser.waitUntil(
      async () => {
        const logText = await getLogText();
        return countOccurrences(logText.toLowerCase(), 'this is a test') === 1;
      },
      {
        timeoutMsg: 'Expected "this is a test" to appear exactly once in the log',
      }
    );

    const logText = await getLogText();
    expect(countOccurrences(logText.toLowerCase(), 'this is a test')).toBe(1);
  }
);

When(
  'the user clicks on the "ADD" button again',
  async function (this: IMobileWorld) {
    const addButton = await $(SELECTORS.addButton);
    await addButton.waitForDisplayed();
    await addButton.click();
  }
);

Then(
  'the "this is a test" message is displayed twice in the log',
  async function (this: IMobileWorld) {
    await browser.waitUntil(
      async () => {
        const logText = await getLogText();
        return countOccurrences(logText.toLowerCase(), 'this is a test') === 2;
      },
      {
        timeoutMsg: 'Expected "this is a test" to appear exactly twice in the log',
      }
    );

    const logText = await getLogText();
    expect(countOccurrences(logText.toLowerCase(), 'this is a test')).toBe(2);
  }
);
