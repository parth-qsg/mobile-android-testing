import { HomePage } from '../../pages/home/HomePage';
import { TextMenuPage } from '../../pages/textMenu/TextMenuPage';
import { LogTextBoxPage } from '../../pages/logTextBox/LogTextBoxPage';

describe('LogTextBox', () => {
  const homePage = new HomePage();
  const textMenuPage = new TextMenuPage();
  const logTextBoxPage = new LogTextBoxPage();

  it('@new @f1 @regression should display "this is a test" after tapping ADD on LogTextBox screen', async () => {
    // Arrange
    await homePage.assertHomeDisplayed();

    // Act
    await homePage.openTextMenu();
    await textMenuPage.assertTextMenuDisplayed();

    await textMenuPage.openLogTextBox();

    // Assert
    await logTextBoxPage.assertScreenDisplayed();
    await logTextBoxPage.clickAdd();
    await logTextBoxPage.assertLogContainsText('this is a test');
  });
});
