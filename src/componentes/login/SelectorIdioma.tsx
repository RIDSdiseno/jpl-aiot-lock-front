import type { LoginLanguage } from "../../i18n/loginTranslations";

interface Props {
  language: LoginLanguage;
  setLanguage: (lang: LoginLanguage) => void;
  label?: string;
  compacto?: boolean;
}

export function SelectorIdioma({
  language,
  setLanguage,
  label,
  compacto = false,
}: Props) {
  return (
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value as LoginLanguage)}
      aria-label={label ?? "Language / Idioma / 中文"}
      className={`rounded-lg font-mono text-xs tracking-widest uppercase outline-none transition-all ${
        compacto ? "px-2 py-1" : "w-full px-3 py-2.5"
      }`}
      style={{
        background: "rgba(8,18,36,0.70)",
        border: "1px solid rgba(6,182,212,0.22)",
        color: "#64748b",
      }}
    >
      <option value="es">Espanol</option>
      <option value="en">English</option>
      <option value="zh">中文</option>
    </select>
  );
}
