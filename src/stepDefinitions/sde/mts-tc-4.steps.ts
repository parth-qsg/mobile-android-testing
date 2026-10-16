import { Given, Then } from '@wdio/cucumber-framework';
import { IMobileWorld } from '../../utils/support/world.interface';
import { ApiDemosHomePage } from '../../pages/ApiDemosHomePage';
import { TextMenuPage } from '../../pages/TextMenuPage';
import { LogTextBoxPage } from '../../pages/LogTextBoxPage';

Given('the user is logged into the application', async function (this: IMobileWorld) {
  // ApiDemos has no authentication. Ensure the app is in the foreground.
  await driver.launchApp();
});

Given(
  'the user has navigated to the LogTextBox screen via the Text menu',
  async function (this: IMobileWorld) {
    const home = new ApiDemosHomePage();
    const textMenu = new TextMenuPage();
    const logTextBox = new LogTextBoxPage();

    await home.openTextMenu();
    await textMenu.openLogTextBox();
    await logTextBox.waitForScreen();
  },
);

Then(
  "the message 'this is a test' is not displayed on the LogTextBox screen",
  async function (this: IMobileWorld) {
    const logTextBox = new LogTextBoxPage();
    await logTextBox.expectMessageNotDisplayed('this is a test');
  },
);
