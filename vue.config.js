module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: { port: 8081 },

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  }
}
