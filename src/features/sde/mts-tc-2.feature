@regression @sde @MTS-TC-2
Feature: LogTextBox Navigation

  @regression @sde @MTS-TC-2
  Scenario: LogTextBox screen is accessible from the Text menu
    Given the user is logged into the application
    When the user clicks on the Text menu
    Then a dropdown or submenu containing the LogTextBox option is displayed
    When the user selects LogTextBox from the menu
    Then the user is navigated to the LogTextBox screen
    And the LogTextBox screen title or identifier is visible
