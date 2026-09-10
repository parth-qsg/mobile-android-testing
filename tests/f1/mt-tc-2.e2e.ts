import { HomePage } from '../../pages/home/HomePage';
import { LogTextBoxPage } from '../../pages/logTextBox/LogTextBoxPage';
import { TextMenuPage } from '../../pages/textMenu/TextMenuPage';

describe('Text menu navigation', () => {
  const homePage = new HomePage();
  const textMenuPage = new TextMenuPage();
  const logTextBoxPage = new LogTextBoxPage();

  it('@new @f1 @regression should open LogTextBox via the Text menu and show default UI state', async () => {
    // Arrange
    await homePage.assertHomeDisplayed();

    // Act
    await homePage.openTextMenu();
    await textMenuPage.assertTextMenuDisplayed();
    await textMenuPage.openLogTextBox();

    // Assert
    await logTextBoxPage.assertScreenDisplayed();
    await logTextBoxPage.assertLogIsEmpty();
  });
});
