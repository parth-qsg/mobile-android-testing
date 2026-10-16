import { Given, Then, When } from '@wdio/cucumber-framework';

import type { IMobileWorld } from '../../utils/support/world.interface';

Given('the user can see the Text menu in the navigation', async function (this: IMobileWorld) {
  await this.pages.home.assertTextMenuIsVisible();
});

When('the user selects LogTextBox from the Text menu', async function (this: IMobileWorld) {
  await this.pages.textMenu.tapLogTextBox();
});

Then('the LogTextBox screen is displayed', async function (this: IMobileWorld) {
  await this.pages.logTextBox.assertScreenIsDisplayed();
});

When('the user clicks the ADD button', async function (this: IMobileWorld) {
  await this.pages.logTextBox.tapAdd();
});

Then(
  "the message 'this is a test' is displayed on the LogTextBox screen",
  async function (this: IMobileWorld) {
    await this.pages.logTextBox.assertLogMessageEquals('This is a test');
  },
);
