@mobile @mfeature @regression @MT-TC-2
Feature: Text LogTextBox

  @mobile @mfeature @regression @MT-TC-2
  Scenario: Adding a log line displays the test message
    Given the user navigates to the "LogTextBox" screen from the "Text" menu
    And the log area does not contain the "this is a test" message
    When the user clicks on the "ADD" button
    Then the "this is a test" message is displayed
