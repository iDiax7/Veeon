import i18n from 'i18next';
import Backend from 'i18next-fs-backend';

/**
 * Initializes i18next with the file system backend.
 *
 * @returns {Promise<void>}
 */
export default async function initI18n() {
  await i18n.use(Backend).init({
    fallbackLng: 'en',
    preload: ['en', 'pl'],
    ns: ['translation'],
    defaultNS: 'translation',
    backend: {
      loadPath: './src/bot/i18n/locales/{{lng}}/{{ns}}.json',
    },
    interpolation: {
      escapeValue: false,
    },
  });
}
