import { create } from "zustand";
import { finalModuleTranslations } from "./finalModuleTranslations";
import { appTranslations, type AppTranslations } from "./translations";
import type { AppLanguage } from "./types";

export const LANGUAGE_STORAGE_KEY = "jpl-aiot-lock-language";
const LEGACY_STORAGE_KEY = "jpl-aiot-language";

function detectLanguage(): AppLanguage {
  const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY) ?? localStorage.getItem(LEGACY_STORAGE_KEY);
  if (stored === "es" || stored === "en" || stored === "zh") return stored;
  return "es";
}

interface I18nState {
  language: AppLanguage;
  t: AppTranslations;
  setLanguage: (lang: AppLanguage) => void;
}

function translationsFor(lang: AppLanguage): AppTranslations {
  const base = structuredClone(appTranslations[lang]);
  Object.assign(base, finalModuleTranslations[lang]);
  base.nav.maintenance = finalModuleTranslations[lang].maintain?.title ?? base.nav.maintenance;
  base.nav.history = finalModuleTranslations[lang].history?.title ?? base.nav.history;
  return base;
}

export const useI18n = create<I18nState>((set) => {
  const initial = detectLanguage();
  return {
    language: initial,
    t: translationsFor(initial),
    setLanguage: (lang) => {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
      set({ language: lang, t: translationsFor(lang) });
    },
  };
});
