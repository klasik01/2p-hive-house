import { cs } from "./cs";

export type Locale = "cs";

export const translations = { cs } as const;

export function useTranslations(locale: Locale = "cs") {
  return translations[locale];
}

export type T = typeof cs;
export { cs };
