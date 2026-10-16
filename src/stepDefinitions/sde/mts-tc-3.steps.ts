import { Then } from '@wdio/cucumber-framework';
import { expect } from '@wdio/globals';
import { IMobileWorld } from '../../utils/support/world.interface';
import { LogTextBoxPage } from '../../pages/LogTextBoxPage';

Then('the ADD button is visible on the LogTextBox screen', async function (this: IMobileWorld) {
  const logTextBox = new LogTextBoxPage();

  // Arrange/Act: ensure we are on the screen (navigation is handled by prior steps)
  await logTextBox.waitForScreen();

  // Assert
  const addButton = await logTextBox.getAddButton();
  await expect(addButton).toBeDisplayed();
});
