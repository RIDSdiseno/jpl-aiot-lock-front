import { ShieldCheck } from "lucide-react";
import { FormularioLogin } from "../../../componentes/login/FormularioLogin";
import { TechIconCarousel } from "../../../componentes/login/TechIconCarousel";

const PARTICULAS = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  left: `${(i * 4.1 + 2) % 96}%`,
  delay: `${(i * 0.62) % 10}s`,
  duration: `${9 + (i * 1.15) % 11}s`,
  size: [1, 2, 1, 1, 2, 3, 1, 2][i % 8],
  color: i % 3 === 0 ? "#22d3ee" : i % 3 === 1 ? "#3b82f6" : "#06b6d4",
}));

export function PaginaLogin() {
  return (
    <main
      className="relative flex min-h-screen flex-col overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #040e1c 0%, #060f1e 45%, #070e1d 100%)",
      }}
    >
      {/* ── Grid pattern ─────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(6,182,212,0.04) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(6,182,212,0.04) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      {/* ── Radial glows ─────────────────────────── */}
      <div
        className="pointer-events-none absolute -left-48 -top-48 h-[600px] w-[600px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(6,182,212,0.09) 0%, transparent 65%)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-48 -right-48 h-[600px] w-[600px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(37,99,235,0.11) 0%, transparent 65%)" }}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(6,182,212,0.04) 0%, transparent 70%)" }}
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

      {/* ── Scanline overlay ─────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.012) 3px, rgba(0,0,0,0.012) 4px)",
        }}
      />

      {/* ── Header ───────────────────────────────── */}
      <header className="relative z-20 flex items-center justify-between border-b border-cyan-900/25 bg-[#040e1c]/80 px-5 py-3 backdrop-blur-md sm:px-8">
        {/* Bottom gradient line */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

        {/* Left: brand */}
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            <div
              className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400"
              style={{ boxShadow: "0 0 6px rgba(34,211,238,0.9)" }}
            />
            <div className="h-1.5 w-1.5 rounded-full bg-blue-500 opacity-55" />
            <div className="h-1.5 w-1.5 rounded-full bg-cyan-700 opacity-35" />
          </div>
          <span
            className="font-mono text-sm font-semibold tracking-[0.18em] text-cyan-400"
            style={{ textShadow: "0 0 14px rgba(34,211,238,0.50)" }}
          >
            JPL AIoT Lock
          </span>
        </div>

        {/* Center: platform label */}
        <div className="hidden sm:block">
          <span className="font-mono text-xs tracking-[0.35em] uppercase text-slate-500">
            IoT Platform System
          </span>
        </div>

        {/* Right: status */}
        <div className="flex items-center gap-3">
          <span className="hidden font-mono text-xs tracking-[0.2em] text-slate-500 md:inline">
            Smart Access
          </span>
          <div className="h-4 w-px bg-cyan-900/50" />
          <div className="flex items-center gap-1.5">
            <div
              className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400"
              style={{ boxShadow: "0 0 6px rgba(74,222,128,0.8)" }}
            />
            <span className="font-mono text-xs text-green-400">ONLINE</span>
          </div>
        </div>
      </header>

      {/* ── Content ──────────────────────────────── */}
      <div className="relative z-10 flex flex-1 flex-col lg:flex-row">
        {/* Left: carousel (lg+) */}
        <div className="hidden lg:flex lg:flex-1 items-center justify-center px-8 py-12">
          <TechIconCarousel />
        </div>

        {/* Vertical divider */}
        <div
          className="pointer-events-none hidden w-px self-stretch lg:block"
          style={{
            margin: "2rem 0",
            background:
              "linear-gradient(to bottom, transparent, rgba(6,182,212,0.22) 20%, rgba(6,182,212,0.38) 50%, rgba(6,182,212,0.22) 80%, transparent)",
          }}
        />

        {/* Right: login card */}
        <div className="flex flex-1 items-center justify-center px-4 py-8 lg:px-10 xl:px-16">
          <div className="w-full max-w-sm">
            {/* Card */}
            <div
              className="login-card relative rounded-2xl p-7 sm:p-8"
              style={{
                background:
                  "linear-gradient(160deg, rgba(10,22,44,0.97) 0%, rgba(6,14,32,0.98) 100%)",
                border: "1px solid rgba(6,182,212,0.32)",
              }}
            >
              {/* Corner accent lines */}
              <div className="absolute left-0 top-0 h-6 w-6 rounded-tl-2xl border-l-2 border-t-2 border-cyan-400" />
              <div className="absolute right-0 top-0 h-6 w-6 rounded-tr-2xl border-r-2 border-t-2 border-cyan-400" />
              <div className="absolute bottom-0 left-0 h-6 w-6 rounded-bl-2xl border-b-2 border-l-2 border-cyan-500/38" />
              <div className="absolute bottom-0 right-0 h-6 w-6 rounded-br-2xl border-b-2 border-r-2 border-cyan-500/38" />

              {/* Breathing inner glow */}
              <div
                className="pointer-events-none absolute inset-0 animate-pulse rounded-2xl"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 0%, rgba(6,182,212,0.07) 0%, transparent 60%)",
                }}
              />

              {/* Card header */}
              <div className="relative mb-7 text-center">
                <div
                  className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl border"
                  style={{
                    borderColor: "rgba(6,182,212,0.48)",
                    background:
                      "radial-gradient(circle, rgba(6,182,212,0.18) 0%, rgba(6,182,212,0.04) 100%)",
                    boxShadow:
                      "0 0 22px rgba(6,182,212,0.26), inset 0 0 15px rgba(6,182,212,0.08)",
                  }}
                >
                  <ShieldCheck
                    className="h-9 w-9 text-cyan-400"
                    style={{ filter: "drop-shadow(0 0 8px rgba(34,211,238,0.8))" }}
                  />
                </div>
                <h1
                  className="font-mono text-xl font-bold tracking-widest text-cyan-300"
                  style={{ textShadow: "0 0 18px rgba(34,211,238,0.42)" }}
                >
                  HHDlink
                </h1>
                <p className="mt-0.5 font-mono text-xs tracking-[0.22em] uppercase text-slate-500">
                  JPL AIoT Lock Platform
                </p>
                <div className="mt-4 h-px bg-gradient-to-r from-transparent via-cyan-500/32 to-transparent" />
              </div>

              {/* Form — unchanged logic */}
              <div className="relative">
                <FormularioLogin />
              </div>
            </div>

            {/* Footer status bar */}
            <div className="mt-4 flex items-center justify-center gap-3 font-mono text-xs text-slate-700">
              <span>v2.0.1</span>
              <div className="h-3 w-px bg-slate-800" />
              <span>AIoT Lock System</span>
              <div className="h-3 w-px bg-slate-800" />
              <span className="text-green-800">● Secure</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom gradient bar ───────────────────── */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#020a14]/60 to-transparent" />
    </main>
  );
}
