@mobile @regression @sde @MTS-TC-4
Feature: LogTextBox Initial State

  @mobile @regression @sde @MTS-TC-4
  Scenario: Message is not displayed before ADD button is clicked
    Given the user is logged into the application
    And the user has navigated to the LogTextBox screen via the Text menu
    Then the message 'this is a test' is not displayed on the LogTextBox screen
