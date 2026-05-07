import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAutenticacionStore } from "../../modulos/autenticacion/store/autenticacion.store";
import { SelectorIdioma } from "../login/SelectorIdioma";
import { useI18n } from "../../i18n/i18nStore";

export function BarraSuperior() {
  const navigate = useNavigate();
  const { usuario, cerrarSesion } = useAutenticacionStore();
  const { language, setLanguage, t } = useI18n();
  const ambiente = import.meta.env.VITE_APP_ENV;
  const rol = typeof usuario?.role === "string" ? usuario.role : usuario?.role?.name;

  const salir = () => {
    cerrarSesion();
    navigate("/login", { replace: true });
  };

  const envLabel =
    ambiente === "development"
      ? t.header.envDevelopment
      : ambiente === "staging"
        ? t.header.envStaging
        : ambiente;

  const inicialUsuario = (usuario?.name ?? usuario?.email ?? "U")[0].toUpperCase();

  return (
    <header
      className="sticky top-0 z-20 flex h-14 items-center justify-between px-4 backdrop-blur-md lg:px-6"
      style={{
        background: "rgba(4,11,23,0.92)",
        borderBottom: "1px solid rgba(6,182,212,0.18)",
      }}
    >
      {/* Bottom gradient accent */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-500/35 to-transparent" />

      {/* ── Left: company info ────────────────────── */}
      <div className="flex items-center gap-3">
        <div className="h-5 w-px bg-cyan-500/25" />
        <div>
          <div className="font-mono text-sm font-medium text-slate-200">
            {usuario?.company?.name ?? t.header.currentCompany}
          </div>
          <div className="font-mono text-[10px] tracking-wide text-slate-500">
            {t.header.operationCenter}
          </div>
        </div>
      </div>

      {/* ── Right: controls ──────────────────────── */}
      <div className="flex items-center gap-2.5">
        {/* Env badge */}
        {ambiente && ambiente !== "production" && (
          <span
            className="rounded-full px-2.5 py-1 font-mono text-[10px] tracking-wider"
            style={{
              background: "rgba(251,191,36,0.08)",
              border: "1px solid rgba(251,191,36,0.22)",
              color: "rgba(251,191,36,0.80)",
            }}
          >
            {envLabel}
          </span>
        )}

        {/* Language selector */}
        <SelectorIdioma compacto language={language} setLanguage={setLanguage} />

        <div className="h-5 w-px bg-cyan-900/50" />

        {/* User info */}
        <div className="hidden items-center gap-2 sm:flex">
          {/* Avatar */}
          <div
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-xs font-semibold text-cyan-400"
            style={{
              background: "rgba(6,182,212,0.12)",
              border: "1px solid rgba(6,182,212,0.28)",
              boxShadow: "0 0 8px rgba(6,182,212,0.12)",
            }}
          >
            {inicialUsuario}
          </div>

          {/* Name + role */}
          <div className="flex flex-col leading-none">
            <span className="font-mono text-xs text-slate-300">
              {usuario?.name ?? usuario?.email ?? "Usuario"}
            </span>
            {rol && (
              <span className="font-mono text-[10px] text-cyan-600/70">{rol}</span>
            )}
          </div>
        </div>

        <div className="h-5 w-px bg-cyan-900/50" />

        {/* Logout */}
        <button
          onClick={salir}
          aria-label={t.header.logout}
          className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-xs text-red-400 transition-all hover:bg-red-500/12 hover:text-red-300"
          style={{ border: "1px solid rgba(239,68,68,0.18)" }}
        >
          <LogOut className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">{t.header.logout}</span>
        </button>
      </div>
    </header>
  );
}
