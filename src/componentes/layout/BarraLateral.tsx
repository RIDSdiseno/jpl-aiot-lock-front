import {
  AlertTriangle,
  BarChart3,
  BellRing,
  ClipboardList,
  Cpu,
  Gauge,
  History,
  Home,
  LockKeyhole,
  Map,
  Monitor,
  Settings,
  ShieldCheck,
  Users,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useI18n } from "../../i18n/i18nStore";
import { useAppText } from "../../i18n/text";

const ACTIVE =
  "flex items-center gap-3 rounded-md border-l-2 border-cyan-400 bg-gradient-to-r from-cyan-500/12 to-transparent px-3 py-2.5 text-sm font-medium text-cyan-300 transition-all";

const INACTIVE =
  "flex items-center gap-3 rounded-md border-l-2 border-transparent px-3 py-2.5 text-sm text-slate-400 transition-all hover:border-cyan-500/25 hover:bg-cyan-500/6 hover:text-slate-200";

const BTN_ACTIVE =
  "flex w-full items-center gap-3 rounded-md border-l-2 border-cyan-400 bg-gradient-to-r from-cyan-500/12 to-transparent px-3 py-2.5 text-left text-sm font-medium text-cyan-300 transition-all";

const BTN_INACTIVE =
  "flex w-full items-center gap-3 rounded-md border-l-2 border-transparent px-3 py-2.5 text-left text-sm text-slate-400 transition-all hover:border-cyan-500/25 hover:bg-cyan-500/6 hover:text-slate-200";

const SUB_ACTIVE =
  "block rounded-md border-l-2 border-cyan-400/65 bg-gradient-to-r from-cyan-500/10 to-transparent px-3 py-2 text-sm font-medium text-cyan-300 transition-all";

const SUB_INACTIVE =
  "block rounded-md border-l-2 border-transparent px-3 py-2 text-sm text-slate-500 transition-all hover:border-cyan-500/22 hover:bg-cyan-500/5 hover:text-slate-300";

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="mb-1 mt-5 px-4 first:mt-2">
      <span className="font-mono text-[9px] tracking-[0.42em] uppercase text-slate-600">
        {label}
      </span>
    </div>
  );
}

function Separator() {
  return (
    <div className="mx-3 my-3 h-px bg-gradient-to-r from-transparent via-cyan-500/14 to-transparent" />
  );
}

export function BarraLateral() {
  const location = useLocation();
  const { t } = useI18n();
  const tr = useAppText();
  const nav = t.nav;

  const estaEnControl   = location.pathname.startsWith("/app/control");
  const estaEnEventos   = location.pathname.startsWith("/app/event") || location.pathname.startsWith("/app/eventos");
  const estaEnGis       = location.pathname.startsWith("/app/gis");
  const estaEnReportes  = location.pathname.startsWith("/app/reports") || location.pathname.startsWith("/app/reportes");
  const estaEnMaintain  = location.pathname.startsWith("/app/maintain") || location.pathname.startsWith("/app/mantenimiento");
  const estaEnUserCenter= location.pathname.startsWith("/app/user-center");

  const [controlAbierto,    setControlAbierto]    = useState(estaEnControl);
  const [eventosAbierto,    setEventosAbierto]    = useState(estaEnEventos);
  const [gisAbierto,        setGisAbierto]        = useState(estaEnGis);
  const [reportesAbierto,   setReportesAbierto]   = useState(estaEnReportes);
  const [maintainAbierto,   setMaintainAbierto]   = useState(estaEnMaintain);
  const [userCenterAbierto, setUserCenterAbierto] = useState(estaEnUserCenter);

  useEffect(() => { if (estaEnControl)    setControlAbierto(true);    }, [estaEnControl]);
  useEffect(() => { if (estaEnEventos)    setEventosAbierto(true);    }, [estaEnEventos]);
  useEffect(() => { if (estaEnGis)        setGisAbierto(true);        }, [estaEnGis]);
  useEffect(() => { if (estaEnReportes)   setReportesAbierto(true);   }, [estaEnReportes]);
  useEffect(() => { if (estaEnMaintain)   setMaintainAbierto(true);   }, [estaEnMaintain]);
  useEffect(() => { if (estaEnUserCenter) setUserCenterAbierto(true); }, [estaEnUserCenter]);

  const mainItems = [
    { label: nav.home,       to: "/app/inicio",    icon: Home    },
    { label: nav.monitoring, to: "/app/monitoreo", icon: Monitor },
  ];

  const gestionItems = [
    { label: nav.alerts,     to: "/app/alertas",      icon: AlertTriangle },
    { label: nav.audit,      to: "/app/audit",        icon: ClipboardList },
    { label: nav.devices,    to: "/app/device",       icon: Cpu           },
    { label: nav.smartLocks, to: "/app/candados",     icon: LockKeyhole   },
    { label: nav.history,    to: "/app/history",      icon: History       },
  ];

  const controlSubItems = [
    { label: nav.controlNfc,       to: "/app/control/nfc"        },
    { label: nav.controlPassword,  to: "/app/control/password"   },
    { label: nav.controlCmdRecord, to: "/app/control/cmd-record" },
    { label: nav.controlPreset,    to: "/app/control/preset"     },
    { label: nav.controlParameter, to: "/app/control/parameter"  },
  ];

  const eventSubItems = [
    { label: nav.eventsAll,   to: "/app/event/all-events"  },
    { label: nav.eventsAlarm, to: "/app/event/alarm-event" },
    { label: nav.eventsPush,  to: "/app/event/push-event"  },
  ];

  const gisSubItems = [
    { label: t.gis?.breadcrumbGeoFence  ?? tr("Fence Seal&Unseal"),    to: "/app/gis/geofences"   },
    { label: t.gis?.breadcrumbFenceRecord ?? tr("Fence Record"), to: "/app/gis/fence-record" },
  ];

  const reportSubItems = [
    { label: tr("APP Seal&Unseal report"), to: "/app/reports/app-seal-unseal" },
    { label: tr("Lock&Unlock"), to: "/app/reports/lock-unlock" },
    { label: tr("Fence Seal&Unseal"), to: "/app/reports/fence-seal-unseal" },
    { label: tr("Fence Record"), to: "/app/reports/fence-record" },
    { label: tr("User Log"), to: "/app/reports/user-log" },
  ];

  const maintainSubItems = [
    { label: t.maintain?.firmware  ?? "Firmware",  to: "/app/maintain/firmware"  },
    { label: t.maintain?.ota       ?? "OTA",       to: "/app/maintain/ota"       },
    { label: t.maintain?.diagnosis ?? "Diagnosis", to: "/app/maintain/diagnosis" },
  ];

  const userCenterSubItems = [
    { label: t.userCenter?.organization ?? "Organization", to: "/app/user-center/organization" },
    { label: t.userCenter?.permission   ?? "Permission",   to: "/app/user-center/permission"   },
    { label: t.userCenter?.user         ?? "User",         to: "/app/user-center/user"         },
  ];

  return (
    <aside
      className="fixed inset-y-0 left-0 z-30 hidden w-72 flex-col lg:flex"
      style={{ background: "linear-gradient(180deg, #050e1d 0%, #040b17 100%)" }}
    >
      {/* ── Grid overlay ─────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(6,182,212,0.022) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(6,182,212,0.022) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* ── Glow accents ─────────────────────────── */}
      <div
        className="pointer-events-none absolute -left-12 top-1/4 h-56 w-56 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute -left-8 bottom-1/3 h-40 w-40 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(168,85,247,0.05) 0%, transparent 70%)" }}
      />

      {/* ── Right edge accent ────────────────────── */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-px"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(6,182,212,0.18) 20%, rgba(6,182,212,0.30) 50%, rgba(6,182,212,0.18) 80%, transparent)",
        }}
      />

      {/* ── Brand header ─────────────────────────── */}
      <div
        className="relative flex h-16 items-center gap-3 px-5"
        style={{
          borderBottom: "1px solid rgba(6,182,212,0.18)",
          background: "rgba(4,14,28,0.5)",
        }}
      >
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

        {/* Icon */}
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
          style={{
            background: "radial-gradient(circle, rgba(6,182,212,0.20) 0%, rgba(6,182,212,0.05) 100%)",
            border: "1px solid rgba(6,182,212,0.45)",
            boxShadow: "0 0 16px rgba(6,182,212,0.22), inset 0 0 10px rgba(6,182,212,0.08)",
          }}
        >
          <ShieldCheck
            className="h-5 w-5 text-cyan-400"
            style={{ filter: "drop-shadow(0 0 6px rgba(34,211,238,0.85))" }}
          />
        </div>

        {/* Text */}
        <div>
          <div
            className="font-mono text-sm font-bold tracking-wider text-cyan-300"
            style={{ textShadow: "0 0 12px rgba(34,211,238,0.40)" }}
          >
            HHDlink
          </div>
          <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-slate-600">
            {nav.platform}
          </div>
        </div>

        {/* Status dots */}
        <div className="ml-auto flex items-center gap-1">
          <div
            className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400"
            style={{ boxShadow: "0 0 5px rgba(34,211,238,0.9)" }}
          />
          <div className="h-1.5 w-1.5 rounded-full bg-blue-500 opacity-50" />
          <div className="h-1.5 w-1.5 rounded-full bg-violet-500 opacity-38" />
        </div>
      </div>

      {/* ── Navigation ───────────────────────────── */}
      <nav className="relative z-10 flex-1 overflow-y-auto px-3 py-3">

        {/* PRINCIPAL */}
        <SectionLabel label={tr("Principal")} />
        {mainItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => isActive ? ACTIVE : INACTIVE}
          >
            <item.icon className="h-4 w-4 shrink-0" />
            {item.label}
          </NavLink>
        ))}

        <Separator />

        {/* OPERACIONES */}
        <SectionLabel label={tr("Operaciones")} />

        {/* Control */}
        <div>
          <button
            type="button"
            onClick={() => setControlAbierto((v) => !v)}
            className={estaEnControl ? BTN_ACTIVE : BTN_INACTIVE}
            aria-expanded={controlAbierto}
          >
            <Gauge className="h-4 w-4 shrink-0" />
            {nav.control}
            {controlAbierto
              ? <ChevronDown className="ml-auto h-3.5 w-3.5 opacity-60" />
              : <ChevronRight className="ml-auto h-3.5 w-3.5 opacity-40" />}
          </button>
          {controlAbierto && (
            <div className="ml-6 mt-1 space-y-0.5 border-l border-cyan-500/18 pl-2">
              {controlSubItems.map((item) => (
                <NavLink key={item.to} to={item.to} className={({ isActive }) => isActive ? SUB_ACTIVE : SUB_INACTIVE}>
                  {item.label}
                </NavLink>
              ))}
            </div>
          )}
        </div>

        {/* Eventos */}
        <div>
          <button
            type="button"
            onClick={() => setEventosAbierto((v) => !v)}
            className={estaEnEventos ? BTN_ACTIVE : BTN_INACTIVE}
            aria-expanded={eventosAbierto}
          >
            <BellRing className="h-4 w-4 shrink-0" />
            {nav.events}
            {eventosAbierto
              ? <ChevronDown className="ml-auto h-3.5 w-3.5 opacity-60" />
              : <ChevronRight className="ml-auto h-3.5 w-3.5 opacity-40" />}
          </button>
          {eventosAbierto && (
            <div className="ml-6 mt-1 space-y-0.5 border-l border-cyan-500/18 pl-2">
              {eventSubItems.map((item) => (
                <NavLink key={item.to} to={item.to} className={({ isActive }) => isActive ? SUB_ACTIVE : SUB_INACTIVE}>
                  {item.label}
                </NavLink>
              ))}
            </div>
          )}
        </div>

        {/* GIS */}
        <div>
          <button
            type="button"
            onClick={() => setGisAbierto((v) => !v)}
            className={estaEnGis ? BTN_ACTIVE : BTN_INACTIVE}
            aria-expanded={gisAbierto}
          >
            <Map className="h-4 w-4 shrink-0" />
            {nav.gis}
            {gisAbierto
              ? <ChevronDown className="ml-auto h-3.5 w-3.5 opacity-60" />
              : <ChevronRight className="ml-auto h-3.5 w-3.5 opacity-40" />}
          </button>
          {gisAbierto && (
            <div className="ml-6 mt-1 space-y-0.5 border-l border-cyan-500/18 pl-2">
              {gisSubItems.map((item) => (
                <NavLink key={item.to} to={item.to} className={({ isActive }) => isActive ? SUB_ACTIVE : SUB_INACTIVE}>
                  {item.label}
                </NavLink>
              ))}
            </div>
          )}
        </div>

        <Separator />

        {/* GESTIÓN */}
        <SectionLabel label={tr("Gestión")} />
        {gestionItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => isActive ? ACTIVE : INACTIVE}
          >
            <item.icon className="h-4 w-4 shrink-0" />
            {item.label}
          </NavLink>
        ))}

        {/* Report */}
        <div>
          <button
            type="button"
            onClick={() => setReportesAbierto((v) => !v)}
            className={estaEnReportes ? BTN_ACTIVE : BTN_INACTIVE}
            aria-expanded={reportesAbierto}
          >
            <BarChart3 className="h-4 w-4 shrink-0" />
            {nav.reports}
            {reportesAbierto
              ? <ChevronDown className="ml-auto h-3.5 w-3.5 opacity-60" />
              : <ChevronRight className="ml-auto h-3.5 w-3.5 opacity-40" />}
          </button>
          {reportesAbierto && (
            <div className="ml-6 mt-1 space-y-0.5 border-l border-cyan-500/18 pl-2">
              {reportSubItems.map((item) => (
                <NavLink key={item.to} to={item.to} className={({ isActive }) => isActive ? SUB_ACTIVE : SUB_INACTIVE}>
                  {item.label}
                </NavLink>
              ))}
            </div>
          )}
        </div>

        {/* Mantenimiento */}
        <div>
          <button
            type="button"
            onClick={() => setMaintainAbierto((v) => !v)}
            className={estaEnMaintain ? BTN_ACTIVE : BTN_INACTIVE}
            aria-expanded={maintainAbierto}
          >
            <Settings className="h-4 w-4 shrink-0" />
            {nav.maintenance}
            {maintainAbierto
              ? <ChevronDown className="ml-auto h-3.5 w-3.5 opacity-60" />
              : <ChevronRight className="ml-auto h-3.5 w-3.5 opacity-40" />}
          </button>
          {maintainAbierto && (
            <div className="ml-6 mt-1 space-y-0.5 border-l border-cyan-500/18 pl-2">
              {maintainSubItems.map((item) => (
                <NavLink key={item.to} to={item.to} className={({ isActive }) => isActive ? SUB_ACTIVE : SUB_INACTIVE}>
                  {item.label}
                </NavLink>
              ))}
            </div>
          )}
        </div>

        <Separator />

        {/* ADMINISTRACIÓN */}
        <SectionLabel label={tr("Administración")} />
        <div>
          <button
            type="button"
            onClick={() => setUserCenterAbierto((v) => !v)}
            className={estaEnUserCenter ? BTN_ACTIVE : BTN_INACTIVE}
            aria-expanded={userCenterAbierto}
          >
            <Users className="h-4 w-4 shrink-0" />
            {t.userCenter?.title ?? "User Center"}
            {userCenterAbierto
              ? <ChevronDown className="ml-auto h-3.5 w-3.5 opacity-60" />
              : <ChevronRight className="ml-auto h-3.5 w-3.5 opacity-40" />}
          </button>
          {userCenterAbierto && (
            <div className="ml-6 mt-1 space-y-0.5 border-l border-cyan-500/18 pl-2">
              {userCenterSubItems.map((item) => (
                <NavLink key={item.to} to={item.to} className={({ isActive }) => isActive ? SUB_ACTIVE : SUB_INACTIVE}>
                  {item.label}
                </NavLink>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* ── Bottom status bar ────────────────────── */}
      <div
        className="relative px-4 py-3"
        style={{ borderTop: "1px solid rgba(6,182,212,0.14)" }}
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/25 to-transparent" />
        <div className="flex items-center gap-2">
          <div
            className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400"
            style={{ boxShadow: "0 0 5px rgba(74,222,128,0.8)" }}
          />
          <span className="font-mono text-[10px] tracking-wider text-slate-600">
            {tr("SISTEMA ACTIVO")}
          </span>
          <span className="ml-auto font-mono text-[10px] text-slate-700">v2.0.1</span>
        </div>
      </div>
    </aside>
  );
}
