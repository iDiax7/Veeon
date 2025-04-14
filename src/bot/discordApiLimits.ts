export const discordApiLimits = {
  // Limity związane z interakcjami
  BUTTON_INTERACTION_LIMIT: 3, // Maksymalna liczba interakcji w jednej sekundzie (np. przyciski)
  SELECT_MENU_INTERACTION_LIMIT: 3, // Maksymalna liczba interakcji z Select Menu w jednej sekundzie
  MAX_CUSTOM_ID_LENGTH: 100, // Maksymalna długość custom_id dla przycisków i innych interakcji (w znakach)

  // Limity API - ogólne
  REQUESTS_PER_MINUTE: 50, // Liczba zapytań na minutę (ogólne limity na zapytania do API)
  REQUESTS_PER_SECOND: 5, // Liczba zapytań na sekundę (ogólne limity API dla botów)

  // Limity webhooków
  MAX_WEBHOOKS_PER_GUILD: 10, // Maksymalna liczba webhooków na serwerze

  // Limity wiadomości (API)
  MESSAGE_CREATE_LIMIT: 5, // Maksymalna liczba wiadomości, które mogą być wysłane przez bota na sekundę

  // Limity reakcji na wiadomości
  MAX_REACTIONS_PER_MESSAGE: 20, // Maksymalna liczba reakcji na wiadomość (zwykłe emoji)
  MAX_REACTIONS_PER_USER: 1, // Maksymalna liczba reakcji na wiadomość, jakie jeden użytkownik może dodać

  // Limity na czaty
  MAX_TEXT_CHANNELS: 500, // Maksymalna liczba kanałów tekstowych na serwerze
  MAX_VOICE_CHANNELS: 500, // Maksymalna liczba kanałów głosowych na serwerze

  // Limity zwiążane z członkami
  MAX_GUILD_MEMBERS: 250000, // Maksymalna liczba członków na serwerze

  // Limity botów
  MAX_BOTS_IN_GUILD: 250, // Maksymalna liczba botów w jednym serwerze

  // Limity interakcji (Slash Commands, Buttons, Select Menus)
  MAX_SLASH_COMMANDS_PER_GUILD: 25, // Maksymalna liczba komend slash na jednym serwerze (bot)
  MAX_APPLICATION_COMMANDS_PER_BOT: 25, // Maksymalna liczba komend dla bota (slash commands)

  // Limity dla aplikacji
  MAX_COMMANDS_PER_USER: 15, // Maksymalna liczba komend, które użytkownik może aktywować w jednym zapytaniu (np. z przyciskami)

  // Limity dla treści
  MAX_MESSAGE_LENGTH: 2000, // Maksymalna długość wiadomości (w znakach)
  MAX_ATTACHMENT_SIZE: 8 * 1024 * 1024, // Maksymalny rozmiar załącznika (w bajtach, 8 MB)

  // Limity związane z emoji
  MAX_CUSTOM_EMOJIS: 50, // Maksymalna liczba emoji na serwerze (standardowe)
  MAX_ANIMATED_EMOJIS: 50, // Maksymalna liczba animowanych emoji na serwerze

  // Limity dla operacji w bazach danych
  MAX_ROLE_COUNT: 250, // Maksymalna liczba ról na serwerze
  MAX_CHANNEL_NAME_LENGTH: 100, // Maksymalna długość nazwy kanału (w znakach)

  // Limity czasowe dla aktywności
  MAX_TYPING_INDICATOR_TIME: 10, // Maksymalny czas trwania wskaźnika pisania w sekundach

  // Limity dla komend i reakcji
  MAX_INTERACTIONS_PER_SECOND: 5, // Maksymalna liczba interakcji na sekundę (np. przyciski, menu, komendy)

  // Limity czasowe dla reakcji
  MAX_REACTIONS_TIMEOUT: 30, // Czas na dodanie reakcji do wiadomości (w sekundach)

  // Limity limitów globalnych
  MAX_BOTS_PER_GUILD: 200, // Liczba botów na serwerze

  // Limity dla operacji związanych z wyszukiwaniem
  MAX_SEARCH_RESULTS: 25, // Limit wyników w wyszukiwaniach (np. w @mention, @everyone)
};

export default discordApiLimits;
