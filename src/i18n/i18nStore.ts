import { create } from "zustand";
import { finalModuleTranslations } from "./finalModuleTranslations";
import { appTranslations, type AppTranslations } from "./translations";
import type { AppLanguage } from "./types";

const STORAGE_KEY = "jpl-aiot-language";

function detectLanguage(): AppLanguage {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "es" || stored === "en" || stored === "zh") return stored;
  const nav = navigator.language ?? "";
  if (nav.startsWith("zh")) return "zh";
  if (nav.startsWith("es")) return "es";
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
      localStorage.setItem(STORAGE_KEY, lang);
      set({ language: lang, t: translationsFor(lang) });
    },
  };
});
