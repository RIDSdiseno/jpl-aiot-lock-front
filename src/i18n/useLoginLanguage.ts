import { useI18n } from "./i18nStore";
import type { LoginLanguage, LoginTranslations } from "./loginTranslations";

export function useLoginLanguage(): {
  language: LoginLanguage;
  setLanguage: (lang: LoginLanguage) => void;
  t: LoginTranslations;
} {
  const { language, setLanguage, t } = useI18n();
  return { language, setLanguage, t: t.login as LoginTranslations };
}
