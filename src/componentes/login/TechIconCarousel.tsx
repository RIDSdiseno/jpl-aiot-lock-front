import { useState, useEffect } from "react";
import {
  Lock, Bluetooth, MapPin, Truck, Wifi, Radio,
  ShieldCheck, Satellite, BarChart2, Globe,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface IconoItem {
  Icon: LucideIcon;
  label: string;
  color: string;
}

const ICONOS: IconoItem[] = [
  { Icon: Lock,        label: "Smart Lock",   color: "#22d3ee" },
  { Icon: Bluetooth,   label: "Bluetooth",    color: "#60a5fa" },
  { Icon: MapPin,      label: "GPS Tracking", color: "#34d399" },
  { Icon: Truck,       label: "Logística",    color: "#a78bfa" },
  { Icon: Wifi,        label: "IoT Network",  color: "#38bdf8" },
  { Icon: Radio,       label: "LoRa",         color: "#fb923c" },
  { Icon: ShieldCheck, label: "Seguridad",    color: "#4ade80" },
  { Icon: Satellite,   label: "Satellite",    color: "#cbd5e1" },
  { Icon: BarChart2,   label: "Analytics",    color: "#818cf8" },
  { Icon: Globe,       label: "Cobertura",    color: "#06b6d4" },
];

const TECNOLOGIAS = ["NFC", "BLE", "LoRa", "GPS", "MQTT", "4G"];

export function TechIconCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent(prev => (prev + 1) % ICONOS.length);
    }, 2500);
    return () => clearInterval(id);
  }, []);

  const n = ICONOS.length;
  const prev = (current - 1 + n) % n;
  const next = (current + 1) % n;

  const { Icon: PrevIcon } = ICONOS[prev];
  const { Icon: CurrIcon, color, label } = ICONOS[current];
  const { Icon: NextIcon } = ICONOS[next];

  return (
    <div className="flex select-none flex-col items-center gap-8">
      {/* Title */}
      <div className="text-center">
        <div className="mb-2 flex items-center justify-center gap-2">
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-cyan-500/50" />
          <span className="font-mono text-xs tracking-[0.4em] uppercase text-cyan-500/60">
            AIoT Control Platform
          </span>
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-cyan-500/50" />
        </div>
        <h2
          className="font-mono text-3xl font-bold tracking-widest text-cyan-300"
          style={{ textShadow: "0 0 24px rgba(34,211,238,0.50)" }}
        >
          JPL AIoT Lock
        </h2>
        <p className="mt-1 font-mono text-xs tracking-[0.3em] uppercase text-slate-500">
          Smart Access Control System
        </p>
      </div>

      {/* Carousel */}
      <div className="flex items-center gap-8">
        {/* Previous icon */}
        <div className="flex flex-col items-center gap-2 opacity-20 transition-all duration-500">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-slate-700/40 bg-slate-800/30">
            <PrevIcon className="h-8 w-8 text-slate-500" />
          </div>
          <span className="font-mono text-xs text-slate-600">{ICONOS[prev].label}</span>
        </div>

        {/* Main icon — key forces re-mount to replay animation */}
        <div key={current} className="login-icon-appear flex flex-col items-center gap-3">
          <div
            className="login-float flex h-28 w-28 items-center justify-center rounded-2xl"
            style={{
              border: `2px solid ${color}55`,
              background: `radial-gradient(circle at center, ${color}18 0%, ${color}05 70%, transparent 100%)`,
              boxShadow: `0 0 32px ${color}30, 0 0 64px ${color}12, inset 0 0 24px ${color}08`,
            }}
          >
            <CurrIcon
              className="h-14 w-14 transition-colors duration-500"
              style={{ color, filter: `drop-shadow(0 0 14px ${color}cc)` }}
            />
          </div>
          <span
            className="font-mono text-sm font-semibold tracking-wider"
            style={{ color, textShadow: `0 0 10px ${color}55` }}
          >
            {label}
          </span>
        </div>

        {/* Next icon */}
        <div className="flex flex-col items-center gap-2 opacity-20 transition-all duration-500">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-slate-700/40 bg-slate-800/30">
            <NextIcon className="h-8 w-8 text-slate-500" />
          </div>
          <span className="font-mono text-xs text-slate-600">{ICONOS[next].label}</span>
        </div>
      </div>

      {/* Progress dots */}
      <div className="flex items-center gap-1.5">
        {ICONOS.map((_, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-500"
            style={{
              width: i === current ? "18px" : "5px",
              height: "5px",
              background: i === current ? "#22d3ee" : "rgba(34,211,238,0.18)",
              boxShadow: i === current ? "0 0 8px rgba(34,211,238,0.70)" : "none",
            }}
          />
        ))}
      </div>

      {/* Technology pills */}
      <div className="flex flex-wrap justify-center gap-2">
        {TECNOLOGIAS.map(tech => (
          <span
            key={tech}
            className="rounded-full px-3 py-1 font-mono text-xs tracking-widest"
            style={{
              background: "rgba(6,182,212,0.06)",
              border: "1px solid rgba(6,182,212,0.22)",
              color: "rgba(6,182,212,0.60)",
            }}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Description */}
      <p className="max-w-xs text-center font-mono text-xs leading-relaxed text-slate-500">
        Control de acceso inteligente con tecnología IoT, monitoreo en tiempo
        real, geocercas y gestión de dispositivos.
      </p>
    </div>
  );
}
