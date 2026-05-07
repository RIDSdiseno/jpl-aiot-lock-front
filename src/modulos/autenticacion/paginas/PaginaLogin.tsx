import { Activity, Key, Lock, MapPin, ShieldCheck, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { FormularioLogin } from "../../../componentes/login/FormularioLogin";
import { TechIconCarousel } from "../../../componentes/login/TechIconCarousel";
import { useLoginLanguage } from "../../../i18n/useLoginLanguage";
import type { LoginTranslations } from "../../../i18n/loginTranslations";

const PARTICULAS = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  left: `${(i * 3.27 + 1.5) % 97}%`,
  delay: `${(i * 0.53) % 12}s`,
  duration: `${10 + (i * 1.07) % 13}s`,
  size: [1, 2, 1, 1, 2, 3, 1, 2, 1, 1, 2, 1][i % 12],
  color: i % 5 === 0 ? "#22d3ee" : i % 5 === 1 ? "#3b82f6" : i % 5 === 2 ? "#a855f7" : i % 5 === 3 ? "#06b6d4" : "#818cf8",
}));

type FeatureKey = "locks" | "remote" | "events" | "audit" | "tracking" | "nfc";

const FEATURE_ITEMS: { Icon: LucideIcon; color: string; key: FeatureKey }[] = [
  { Icon: Lock,        color: "#22d3ee", key: "locks"    },
  { Icon: Zap,         color: "#a855f7", key: "remote"   },
  { Icon: Activity,    color: "#34d399", key: "events"   },
  { Icon: ShieldCheck, color: "#60a5fa", key: "audit"    },
  { Icon: MapPin,      color: "#fb923c", key: "tracking" },
  { Icon: Key,         color: "#f472b6", key: "nfc"      },
];

type FeatureCardItem = LoginTranslations["featureCards"][FeatureKey];

export function PaginaLogin() {
  const { language, setLanguage, t } = useLoginLanguage();

  return (
    <main
      className="relative flex min-h-screen flex-col overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #030c1a 0%, #050d1c 45%, #060d1b 100%)",
      }}
    >
      {/* ── Grid pattern ─────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(6,182,212,0.032) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(6,182,212,0.032) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      {/* ── Radial glows — cyan / blue ────────────── */}
      <div
        className="pointer-events-none absolute -left-48 -top-48 h-[600px] w-[600px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(6,182,212,0.10) 0%, transparent 65%)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-48 -right-48 h-[600px] w-[600px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(37,99,235,0.13) 0%, transparent 65%)" }}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 70%)" }}
      />

      {/* ── Radial glows — violet / indigo ───────── */}
      <div
        className="pointer-events-none absolute -right-36 top-1/4 h-[520px] w-[520px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(168,85,247,0.09) 0%, transparent 65%)" }}
      />
      <div
        className="pointer-events-none absolute -left-20 bottom-1/3 h-[400px] w-[400px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 65%)" }}
      />
      <div
        className="pointer-events-none absolute left-1/3 bottom-0 h-[300px] w-[300px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 65%)" }}
      />

      {/* ── Floating particles ───────────────────── */}
      {PARTICULAS.map(p => (
        <div
          key={p.id}
          className="pointer-events-none absolute rounded-full opacity-0"
          style={{
            left: p.left,
            bottom: "-8px",
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            boxShadow: `0 0 ${p.size * 5}px ${p.color}`,
            animation: `particle-float ${p.duration} ${p.delay} infinite linear`,
          }}
        />
      ))}

      {/* ── Animated scan line ───────────────────── */}
      <div
        className="login-scan-line pointer-events-none absolute inset-x-0 top-0 z-10"
        style={{
          height: "1px",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(6,182,212,0.0) 5%, rgba(6,182,212,0.42) 20%, rgba(6,182,212,0.72) 50%, rgba(6,182,212,0.42) 80%, rgba(6,182,212,0.0) 95%, transparent)",
        }}
      />

      {/* ── Scanline texture ─────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.011) 3px, rgba(0,0,0,0.011) 4px)",
        }}
      />

      {/* ── Header ───────────────────────────────── */}
      <header className="relative z-20 flex items-center justify-between border-b border-cyan-900/25 bg-[#030c1a]/85 px-5 py-3 backdrop-blur-md sm:px-8">
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-500/45 to-transparent" />

        {/* Left: brand */}
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            <div
              className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400"
              style={{ boxShadow: "0 0 6px rgba(34,211,238,0.9)" }}
            />
            <div className="h-1.5 w-1.5 rounded-full bg-blue-500 opacity-55" />
            <div className="h-1.5 w-1.5 rounded-full bg-violet-500 opacity-45" />
          </div>
          <span
            className="font-mono text-sm font-semibold tracking-[0.18em] text-cyan-400"
            style={{ textShadow: "0 0 14px rgba(34,211,238,0.55)" }}
          >
            {t.brandLeft}
          </span>
        </div>

        {/* Center */}
        <div className="hidden sm:block">
          <span className="font-mono text-xs tracking-[0.35em] uppercase text-slate-500">
            {t.brandCenter}
          </span>
        </div>

        {/* Right: status */}
        <div className="flex items-center gap-3">
          <span className="hidden font-mono text-xs tracking-[0.2em] text-slate-500 md:inline">
            {t.brandRight}
          </span>
          <div className="h-4 w-px bg-cyan-900/50" />
          <div className="flex items-center gap-1.5">
            <div
              className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400"
              style={{ boxShadow: "0 0 6px rgba(74,222,128,0.8)" }}
            />
            <span className="font-mono text-xs text-green-400">{t.status.online}</span>
          </div>
        </div>
      </header>

      {/* ── Content ──────────────────────────────── */}
      <div className="relative z-10 flex flex-1 flex-col lg:flex-row">

        {/* ── Left: carousel + feature cards (lg+) ── */}
        <div className="hidden flex-col items-center justify-center gap-7 overflow-hidden px-8 py-10 lg:flex lg:flex-1">
          <TechIconCarousel t={t} />

          {/* Divider */}
          <div className="w-full max-w-sm">
            <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/22 to-transparent" />
          </div>

          {/* Feature cards grid */}
          <div className="w-full max-w-sm">
            <p className="mb-3 text-center font-mono text-[10px] tracking-[0.38em] uppercase text-slate-600">
              {t.featureCards.sectionLabel}
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              {FEATURE_ITEMS.map(({ Icon, color, key }, i) => {
                const card = t.featureCards[key] as FeatureCardItem;
                return (
                  <div
                    key={key}
                    className="login-feature-card-in flex cursor-default items-center gap-2.5 rounded-lg p-2.5 transition-all duration-200 hover:scale-[1.03]"
                    style={{
                      background: `linear-gradient(135deg, ${color}06 0%, transparent 100%)`,
                      border: `1px solid ${color}28`,
                      animationDelay: `${0.6 + i * 0.09}s`,
                    }}
                  >
                    <div
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md"
                      style={{ background: `${color}14` }}
                    >
                      <Icon
                        className="h-3.5 w-3.5"
                        style={{ color, filter: `drop-shadow(0 0 5px ${color}aa)` }}
                      />
                    </div>
                    <div className="min-w-0">
                      <p
                        className="truncate font-mono text-xs font-medium leading-tight"
                        style={{ color: `${color}cc` }}
                      >
                        {card.title}
                      </p>
                      <p className="truncate font-mono text-[10px] leading-tight text-slate-600">
                        {card.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Vertical divider ─────────────────────── */}
        <div
          className="pointer-events-none hidden w-px self-stretch lg:block"
          style={{
            margin: "2rem 0",
            background:
              "linear-gradient(to bottom, transparent, rgba(6,182,212,0.18) 15%, rgba(6,182,212,0.38) 40%, rgba(168,85,247,0.22) 60%, rgba(6,182,212,0.18) 85%, transparent)",
          }}
        />

        {/* ── Right: login card ────────────────────── */}
        <div className="flex flex-1 items-center justify-center px-4 py-8 lg:px-10 xl:px-16">
          <div className="w-full max-w-sm">

            {/* Card */}
            <div
              className="login-card relative rounded-2xl p-7 sm:p-8"
              style={{
                background:
                  "linear-gradient(160deg, rgba(10,22,44,0.97) 0%, rgba(6,14,32,0.98) 100%)",
                border: "1px solid rgba(6,182,212,0.34)",
                backdropFilter: "blur(12px)",
              }}
            >
              {/* Corner accents — top (cyan) */}
              <div className="login-corner absolute left-0 top-0 h-7 w-7 rounded-tl-2xl border-l-2 border-t-2 border-cyan-400/85" />
              <div className="login-corner absolute right-0 top-0 h-7 w-7 rounded-tr-2xl border-r-2 border-t-2 border-cyan-400/85" />
              {/* Corner accents — bottom (violet) */}
              <div className="login-corner absolute bottom-0 left-0 h-7 w-7 rounded-bl-2xl border-b-2 border-l-2 border-violet-500/45" />
              <div className="login-corner absolute bottom-0 right-0 h-7 w-7 rounded-br-2xl border-b-2 border-r-2 border-violet-500/45" />

              {/* Breathing inner glow — top */}
              <div
                className="pointer-events-none absolute inset-0 animate-pulse rounded-2xl"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 0%, rgba(6,182,212,0.09) 0%, transparent 58%)",
                }}
              />
              {/* Inner glow — bottom violet accent */}
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 100%, rgba(168,85,247,0.05) 0%, transparent 55%)",
                }}
              />

              {/* Card header */}
              <div className="relative mb-7 text-center">
                {/* Icon with pulsing outer ring */}
                <div className="relative mx-auto mb-4 h-16 w-16">
                  <div
                    className="login-glow-ring pointer-events-none absolute -inset-1 rounded-xl"
                    style={{
                      boxShadow:
                        "0 0 0 1px rgba(6,182,212,0.18), 0 0 18px rgba(6,182,212,0.22), 0 0 40px rgba(6,182,212,0.08)",
                    }}
                  />
                  <div
                    className="flex h-full w-full items-center justify-center rounded-xl border"
                    style={{
                      borderColor: "rgba(6,182,212,0.52)",
                      background:
                        "radial-gradient(circle, rgba(6,182,212,0.20) 0%, rgba(6,182,212,0.05) 100%)",
                      boxShadow:
                        "0 0 24px rgba(6,182,212,0.30), inset 0 0 16px rgba(6,182,212,0.10)",
                    }}
                  >
                    <ShieldCheck
                      className="h-9 w-9 text-cyan-400"
                      style={{ filter: "drop-shadow(0 0 9px rgba(34,211,238,0.90))" }}
                    />
                  </div>
                </div>

                <h1
                  className="font-mono text-xl font-bold tracking-widest text-cyan-300"
                  style={{ textShadow: "0 0 20px rgba(34,211,238,0.50)" }}
                >
                  HHDlink
                </h1>
                <p className="mt-0.5 font-mono text-xs tracking-[0.22em] uppercase text-slate-500">
                  {t.platformSubtitle}
                </p>
                <div className="mt-4 h-px bg-gradient-to-r from-transparent via-cyan-500/35 to-transparent" />
              </div>

              {/* Form */}
              <div className="relative">
                <FormularioLogin t={t} language={language} setLanguage={setLanguage} />
              </div>
            </div>

            {/* Footer status bar */}
            <div className="mt-4 flex items-center justify-center gap-3 font-mono text-xs text-slate-700">
              <span>v2.0.1</span>
              <div className="h-3 w-px bg-slate-800" />
              <span>{t.footer.system}</span>
              <div className="h-3 w-px bg-slate-800" />
              <span className="text-green-800">{t.footer.secure}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom gradient bar ───────────────────── */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#020a14]/65 to-transparent" />
    </main>
  );
}
