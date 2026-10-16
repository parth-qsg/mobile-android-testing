import { Given, Then, When } from '@wdio/cucumber-framework';

import type { IMobileWorld } from '../../utils/support/world.interface';

import { ApiDemosHomePage } from '../../pages/ApiDemosHomePage';
import { TextMenuPage } from '../../pages/TextMenuPage';
import { LogTextBoxPage } from '../../pages/LogTextBoxPage';

Given('the user can see the Text menu in the navigation', async function (this: IMobileWorld) {
  const home = new ApiDemosHomePage();
  await home.assertTextMenuIsVisible();
});

When('the user selects LogTextBox from the Text menu', async function (this: IMobileWorld) {
  const textMenu = new TextMenuPage();
  await textMenu.openLogTextBox();
});

Then('the LogTextBox screen is displayed', async function (this: IMobileWorld) {
  const logTextBox = new LogTextBoxPage();
  await logTextBox.assertScreenIsDisplayed();
});

When('the user clicks the ADD button', async function (this: IMobileWorld) {
  const logTextBox = new LogTextBoxPage();
  await logTextBox.tapAdd();
});

Then(
  "the message 'this is a test' is displayed on the LogTextBox screen",
  async function (this: IMobileWorld) {
    const logTextBox = new LogTextBoxPage();
    await logTextBox.assertLogMessageEquals('This is a test');
  },
);
