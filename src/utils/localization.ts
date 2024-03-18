import en from '../localization/en';

interface Localization {
  [key: string]: string;
}

// Define a default language (English in this case)
let currentLanguage: Localization = en;

// Function to set the current language
export const setLanguage = (lang: Localization) => {
  currentLanguage = lang;
};

// Function to get a localized string
export const localize = (key: string): string => {
  return currentLanguage[key] || '';
};
