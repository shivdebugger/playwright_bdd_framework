Feature: Login Functionality

  Scenario: Successful login test
    Given User is on the login page
    When User enters valid credentials
    When click the login button
    Then User should be redirected to the dashboard