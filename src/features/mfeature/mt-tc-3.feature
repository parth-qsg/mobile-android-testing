@mobile @mfeature @regression @MT-TC-3
Feature: Text LogTextBox

  Scenario: Message appears only after ADD is clicked and is added on each click
    Given the user navigates to the "LogTextBox" screen from the "Text" menu
    And the log area does not contain the "this is a test" message
    When the user clicks on the "ADD" button
    Then the "this is a test" message is displayed once in the log
    When the user clicks on the "ADD" button again
    Then the "this is a test" message is displayed twice in the log
