import { en } from './en';
import { sw } from './sw';

export const translations = {
  en,
  sw,
};

export type Language = 'en' | 'sw';
export type TranslationKeys = typeof en;
