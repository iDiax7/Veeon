import i18n from 'i18next';

class I18nWrapper {
  private lang: string;

  constructor(lang: string) {
    this.lang = lang;
  }

  t(key: string, options?: Record<string, any>): string {
    return i18n.getFixedT(this.lang)(key, options);
  }

  changeLanguage(lang: string) {
    this.lang = lang;
  }

  getLanguage(): string {
    return this.lang;
  }
}

/**
 * Returns an object with methods to translate strings using the given language.
 *
 * @param lang - The language to use for translations.
 * @returns An object with methods to translate strings using the given language.
 */
export const useI18n = (lang: string) => {
  const wrapper = new I18nWrapper(lang);
  return {
    t: wrapper.t.bind(wrapper),
    setLang: wrapper.changeLanguage.bind(wrapper),
    getLang: wrapper.getLanguage.bind(wrapper),
  };
};
