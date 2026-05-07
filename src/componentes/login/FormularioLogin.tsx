import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, LogIn, User } from "lucide-react";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAutenticacion } from "../../modulos/autenticacion/hooks/useAutenticacion";
import {
  loginSchema,
  type LoginFormulario,
} from "../../modulos/autenticacion/esquemas/autenticacion.schemas";
import type { LoginLanguage, LoginTranslations } from "../../i18n/loginTranslations";
import { CajaCaptcha } from "./CajaCaptcha";
import { SelectorIdioma } from "./SelectorIdioma";

const inputBase =
  "w-full rounded-lg border border-slate-700/50 bg-slate-900/55 py-2.5 pl-10 pr-4 " +
  "font-mono text-sm text-slate-200 outline-none transition-all duration-200 " +
  "placeholder:text-slate-600 " +
  "hover:border-cyan-700/55 hover:bg-slate-900/65 " +
  "focus:border-cyan-500/72 focus:bg-slate-900/82 focus:ring-2 focus:ring-cyan-500/20 " +
  "focus:shadow-[0_0_16px_rgba(6,182,212,0.14)]";

interface FormularioLoginProps {
  t: LoginTranslations;
  language: LoginLanguage;
  setLanguage: (lang: LoginLanguage) => void;
}

export function FormularioLogin({ t, language, setLanguage }: FormularioLoginProps) {
  const navigate = useNavigate();
  const { loginMutation } = useAutenticacion();
  const [codigoCaptcha, setCodigoCaptcha] = useState("");
  const [errorCaptcha, setErrorCaptcha] = useState("");

  const form = useForm<LoginFormulario>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", captcha: "" },
  });

  const registrarCodigo = useCallback(
    (codigo: string) => setCodigoCaptcha(codigo),
    [],
  );

  const enviar = form.handleSubmit(async (valores) => {
    if (valores.captcha !== codigoCaptcha) {
      setErrorCaptcha(t.errors.invalidCaptcha);
      return;
    }
    setErrorCaptcha("");
    await loginMutation.mutateAsync({
      username: valores.email,
      password: valores.password,
    });
    navigate("/app/inicio", { replace: true });
  });

  return (
    <form onSubmit={enviar} className="space-y-5">
      {/* Usuario */}
      <label className="block">
        <span className="mb-2 block font-mono text-xs tracking-[0.2em] uppercase text-slate-400">
          {t.usernameLabel}
        </span>
        <div className="relative">
          <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-500/55" />
          <input
            aria-label={t.usernameLabel}
            placeholder={t.usernamePlaceholder}
            autoComplete="username"
            {...form.register("email")}
            className={inputBase}
          />
        </div>
        {form.formState.errors.email && (
          <span className="mt-1 block font-mono text-xs text-red-400">
            {t.errors.requiredUser}
          </span>
        )}
      </label>

      {/* Contraseña */}
      <label className="block">
        <span className="mb-2 block font-mono text-xs tracking-[0.2em] uppercase text-slate-400">
          {t.passwordLabel}
        </span>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-500/55" />
          <input
            type="password"
            aria-label={t.passwordLabel}
            placeholder={t.passwordPlaceholder}
            autoComplete="current-password"
            {...form.register("password")}
            className={inputBase}
          />
        </div>
        {form.formState.errors.password && (
          <span className="mt-1 block font-mono text-xs text-red-400">
            {t.errors.requiredPassword}
          </span>
        )}
      </label>

      {/* Captcha */}
      <div className="grid grid-cols-[110px_1fr] gap-3">
        <CajaCaptcha onCodigo={registrarCodigo} />
        <label className="block">
          <input
            aria-label={t.captchaLabel}
            placeholder={t.captchaPlaceholder}
            {...form.register("captcha")}
            className={
              "w-full rounded-lg border border-slate-700/50 bg-slate-900/55 px-3 py-2.5 " +
              "font-mono text-sm text-slate-200 outline-none transition-all duration-200 " +
              "placeholder:text-slate-600 " +
              "hover:border-cyan-700/55 hover:bg-slate-900/65 " +
              "focus:border-cyan-500/72 focus:ring-2 focus:ring-cyan-500/20 " +
              "focus:shadow-[0_0_16px_rgba(6,182,212,0.14)]"
            }
          />
          {(form.formState.errors.captcha || errorCaptcha) && (
            <span className="mt-1 block font-mono text-xs text-red-400">
              {errorCaptcha || t.errors.requiredCaptcha}
            </span>
          )}
        </label>
      </div>

      {/* Selector de idioma */}
      <SelectorIdioma
        language={language}
        setLanguage={setLanguage}
        label={t.languageLabel}
      />

      {/* Error de autenticación */}
      {loginMutation.isError && (
        <div
          className="rounded-lg px-4 py-2.5 font-mono text-xs text-red-400"
          style={{
            background: "rgba(127,29,29,0.18)",
            border: "1px solid rgba(239,68,68,0.25)",
          }}
        >
          ⚠ {t.errors.invalidCredentials}
        </div>
      )}

      {/* Botón submit */}
      <button
        type="submit"
        disabled={loginMutation.isPending}
        aria-label={loginMutation.isPending ? t.loginLoading : t.loginButton}
        className="group relative w-full overflow-hidden rounded-lg py-3 font-mono text-sm font-semibold uppercase tracking-widest text-white transition-all duration-200 hover:scale-[1.015] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:scale-100"
        style={{
          background: loginMutation.isPending
            ? "linear-gradient(135deg, #164e63, #1e3a5f)"
            : "linear-gradient(135deg, #0891b2 0%, #2563eb 55%, #7c3aed 100%)",
          boxShadow: loginMutation.isPending
            ? "none"
            : "0 0 28px rgba(8,145,178,0.45), 0 0 60px rgba(8,145,178,0.12)",
        }}
      >
        {!loginMutation.isPending && (
          <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-500 group-hover:translate-x-[100%]" />
        )}
        <span className="relative z-10 flex items-center justify-center gap-2">
          {loginMutation.isPending ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              {t.loginLoading}
            </>
          ) : (
            <>
              <LogIn className="h-4 w-4" />
              {t.loginButton}
            </>
          )}
        </span>
      </button>

      {/* Indicador de sesión segura */}
      <div className="flex items-center justify-center gap-2 font-mono text-xs text-slate-600">
        <Lock className="h-3 w-3" />
        {t.secureAccess}
      </div>
    </form>
  );
}
