Feature: Language selection

  Scenario Outline: As a user, I can choose a language on the first screen

    Given the app is on the language selection screen
    When I select the <language> language
    Then the Next button should be enabled

    Examples:
      | language   |
      | English    |
      | Tiếng Việt |
