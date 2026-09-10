import { HomePage } from '../../pages/home/HomePage';
import { TextMenuPage } from '../../pages/textMenu/TextMenuPage';
import { LogTextBoxPage } from '../../pages/logTextBox/LogTextBoxPage';

describe('LogTextBox', () => {
  const homePage = new HomePage();
  const textMenuPage = new TextMenuPage();
  const logTextBoxPage = new LogTextBoxPage();

  it('@new @f1 @regression should append additional log entries when ADD is clicked multiple times', async () => {
    // Arrange
    await homePage.assertHomeDisplayed();

    // Act
    await homePage.openTextMenu();
    await textMenuPage.assertTextMenuDisplayed();

    await textMenuPage.openLogTextBox();

    // Assert (default state)
    await logTextBoxPage.assertScreenDisplayed();
    await logTextBoxPage.assertLogIsEmpty();

    // Act
    await logTextBoxPage.clickAdd();

    // Assert
    await logTextBoxPage.assertLogContainsText('This is a test');

    // Act
    await logTextBoxPage.clickAdd();

    // Assert
    await logTextBoxPage.assertLogHasAtLeastOccurrences({ expectedText: 'This is a test', minOccurrences: 2 });
  });
});
