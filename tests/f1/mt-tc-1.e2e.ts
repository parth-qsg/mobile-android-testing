import { HomePage } from '../../pages/home/HomePage';
import { TextMenuPage } from '../../pages/textMenu/TextMenuPage';
import { LogTextBoxPage } from '../../pages/logTextBox/LogTextBoxPage';

describe('LogTextBox', () => {
  const homePage = new HomePage();
  const textMenuPage = new TextMenuPage();
  const logTextBoxPage = new LogTextBoxPage();

  it('@new @f1 @regression should display the this is a test message after clicking ADD on LogTextBox', async () => {
    // Arrange
    await homePage.assertHomeDisplayed();

    // Act
    await homePage.openTextMenu();
    await textMenuPage.openLogTextBox();
    await logTextBoxPage.assertScreenDisplayed();
    await logTextBoxPage.clickAdd();

    // Assert
    await logTextBoxPage.assertLogContainsText('this is a test');
  });
});
