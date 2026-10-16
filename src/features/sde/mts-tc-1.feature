@regression @sde @MTS-TC-1
Feature: LogTextBox Message Display

  Scenario: Clicking ADD button displays the expected message on LogTextBox screen
    Given the user is logged into the application
    And the user can see the Text menu in the navigation
    When the user clicks on the Text menu
    And the user selects LogTextBox from the Text menu
    Then the LogTextBox screen is displayed
    When the user clicks the ADD button
    Then the message 'this is a test' is displayed on the LogTextBox screen
