Feature: Login Functionality

  Background:
    Given User is on the login page

  Scenario Outline: Login with different credentials
    When the user enters "<username>" and "<password>"
    When the user click on login button
    Then the user should see the "<result>"

    Examples:
      | username       | password       | result           |
      | testuser1      | xxx            | overview        |
      | test1234       | 12345          | Invalid login    |