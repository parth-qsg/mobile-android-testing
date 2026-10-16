import { When, Then } from '@wdio/cucumber-framework';

import type { IMobileWorld } from '../../utils/support/world.interface';
import { ApiDemosHomePage } from '../../pages/ApiDemosHomePage';
import { TextMenuPage } from '../../pages/TextMenuPage';
import { LogTextBoxPage } from '../../pages/LogTextBoxPage';

When('the user clicks on the Text menu', async function (this: IMobileWorld) {
  const home = new ApiDemosHomePage();
  await home.openTextMenu();
});

Then(
  'a dropdown or submenu containing the LogTextBox option is displayed',
  async function (this: IMobileWorld) {
    const textMenu = new TextMenuPage();
    await textMenu.assertLogTextBoxOptionIsVisible();
  },
);

When('the user selects LogTextBox from the menu', async function (this: IMobileWorld) {
  const textMenu = new TextMenuPage();
  await textMenu.openLogTextBox();
});

Then('the user is navigated to the LogTextBox screen', async function (this: IMobileWorld) {
  const logTextBox = new LogTextBoxPage();
  await logTextBox.assertOnLogTextBoxScreen();
});

Then('the LogTextBox screen title or identifier is visible', async function (this: IMobileWorld) {
  const logTextBox = new LogTextBoxPage();
  await logTextBox.assertTitleIsVisible();
});
