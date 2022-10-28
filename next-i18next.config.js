module.exports = {
  i18n: {
    localeDetection: false, // Disable locale detection for now. It prevents next to redirect user to /<locale> on /
    defaultNS: "messages",
    defaultLocale: "en",
    locales: ["en", "fr"],
  },
  fallbackLng: "en",
  pluralSeparator: "___",
  // This option will reload your translations whenever serverSideTranslations is called
  reloadOnPrerender: true,

  // allow an empty value to count as invalid (by default is true)
  returnEmptyString: false,
};
