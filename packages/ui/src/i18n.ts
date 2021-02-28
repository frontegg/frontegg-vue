import Vue from 'vue';
import VueI18n, { LocaleMessages } from 'vue-i18n';
import locales from './locales';

Vue.use(VueI18n);

function loadLocaleMessages(): LocaleMessages {
  // @ts-ignore
  const messages: LocaleMessages = {};
  debugger;
  Object.keys(locales).forEach((locale: any) => {
    messages[locale] = (locales as any)[locale];
  });
  return messages;
}

export default new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || 'en',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: loadLocaleMessages(),
});
