import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAutenticacionStore } from "../../modulos/autenticacion/store/autenticacion.store";
import { Boton } from "../comunes/Boton";
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

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 lg:px-8">
      <div>
        <div className="text-sm font-semibold text-slate-900">
          {usuario?.company?.name ?? t.header.currentCompany}
        </div>
        <div className="text-xs text-slate-500">{t.header.operationCenter}</div>
      </div>
      <div className="flex items-center gap-3">
        {ambiente && ambiente !== "production" ? (
          <span className="rounded-full bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700">
            {envLabel}
          </span>
        ) : null}
        <SelectorIdioma compacto language={language} setLanguage={setLanguage} />
        <span className="hidden text-sm text-slate-600 sm:inline">
          {usuario?.name ?? usuario?.email ?? "Usuario"}
          {rol ? ` - ${rol}` : ""}
        </span>
        <Boton
          variante="secundario"
          icono={<LogOut className="h-4 w-4" />}
          onClick={salir}
        >
          {t.header.logout}
        </Boton>
      </div>
    </header>
  );
}
