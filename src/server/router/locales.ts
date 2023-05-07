export const localesLanguages = [
  "en", "fr"
] as const;
export type LocalesLanguages = typeof localesLanguages;
export type LocalesLanguagesKey = LocalesLanguages[keyof LocalesLanguages] | string;
export const defaultLanguage: LocalesLanguagesKey = "en";
export function isLocales(language: string): boolean {
  return (localesLanguages as unknown as Array<string>).includes(language);
}