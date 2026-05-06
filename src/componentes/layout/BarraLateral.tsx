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

export function BarraLateral() {
  const location = useLocation();
  const { t } = useI18n();
  const nav = t.nav;

  const estaEnControl = location.pathname.startsWith("/app/control");
  const estaEnEventos =
    location.pathname.startsWith("/app/event") ||
    location.pathname.startsWith("/app/eventos");
  const estaEnGis = location.pathname.startsWith("/app/gis");
  const estaEnMaintain = location.pathname.startsWith("/app/maintain") || location.pathname.startsWith("/app/mantenimiento");
  const estaEnUserCenter = location.pathname.startsWith("/app/user-center");
  const [controlAbierto, setControlAbierto] = useState(estaEnControl);
  const [eventosAbierto, setEventosAbierto] = useState(estaEnEventos);
  const [gisAbierto, setGisAbierto] = useState(estaEnGis);
  const [maintainAbierto, setMaintainAbierto] = useState(estaEnMaintain);
  const [userCenterAbierto, setUserCenterAbierto] = useState(estaEnUserCenter);

  useEffect(() => {
    if (estaEnControl) setControlAbierto(true);
  }, [estaEnControl]);

  useEffect(() => {
    if (estaEnEventos) setEventosAbierto(true);
  }, [estaEnEventos]);

  useEffect(() => {
    if (estaEnGis) setGisAbierto(true);
  }, [estaEnGis]);

  useEffect(() => {
    if (estaEnMaintain) setMaintainAbierto(true);
  }, [estaEnMaintain]);

  useEffect(() => {
    if (estaEnUserCenter) setUserCenterAbierto(true);
  }, [estaEnUserCenter]);

  const mainItems = [
    { label: nav.home, to: "/app/inicio", icon: Home },
    { label: nav.monitoring, to: "/app/monitoreo", icon: Monitor },
  ];

  const secondaryItems = [
    { label: nav.alerts, to: "/app/alertas", icon: AlertTriangle },
    { label: nav.reports, to: "/app/reportes", icon: BarChart3 },
    { label: nav.audit, to: "/app/audit", icon: ClipboardList },
    { label: nav.devices, to: "/app/dispositivos", icon: Cpu },
    { label: nav.smartLocks, to: "/app/candados", icon: LockKeyhole },
    { label: nav.history, to: "/app/history", icon: History },
  ];

  const controlSubItems = [
    { label: nav.controlNfc, to: "/app/control/nfc" },
    { label: nav.controlPassword, to: "/app/control/password" },
    { label: nav.controlCmdRecord, to: "/app/control/cmd-record" },
    { label: nav.controlPreset, to: "/app/control/preset" },
    { label: nav.controlParameter, to: "/app/control/parameter" },
  ];

  const eventSubItems = [
    { label: nav.eventsAll, to: "/app/event/all-events" },
    { label: nav.eventsAlarm, to: "/app/event/alarm-event" },
    { label: nav.eventsPush, to: "/app/event/push-event" },
  ];

  const gisSubItems = [
    { label: t.gis?.breadcrumbGeoFence ?? "Geo-Fence", to: "/app/gis/geofences" },
    { label: t.gis?.breadcrumbFenceRecord ?? "Fence Record", to: "/app/gis/fence-record" },
  ];

  const maintainSubItems = [
    { label: t.maintain?.firmware ?? "Firmware", to: "/app/maintain/firmware" },
    { label: t.maintain?.ota ?? "OTA", to: "/app/maintain/ota" },
    { label: t.maintain?.diagnosis ?? "Diagnosis", to: "/app/maintain/diagnosis" },
  ];

  const userCenterSubItems = [
    { label: t.userCenter?.organization ?? "Organization", to: "/app/user-center/organization" },
    { label: t.userCenter?.permission ?? "Permission", to: "/app/user-center/permission" },
    { label: t.userCenter?.user ?? "User", to: "/app/user-center/users" },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 flex-col bg-slate-950 text-white lg:flex">
      <div className="flex h-16 items-center gap-3 border-b border-white/10 px-5">
        <ShieldCheck className="h-7 w-7 text-blue-300" />
        <div>
          <div className="text-sm font-semibold">JPL-AIOT-LOCK</div>
          <div className="text-xs text-slate-400">{nav.platform}</div>
        </div>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {mainItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </NavLink>
        ))}

        {/* Control submenu */}
        <div>
          <button
            type="button"
            onClick={() => setControlAbierto((v) => !v)}
            className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm transition ${
              estaEnControl
                ? "bg-blue-600 text-white"
                : "text-slate-300 hover:bg-white/10 hover:text-white"
            }`}
            aria-expanded={controlAbierto}
          >
            <Gauge className="h-4 w-4" />
            {nav.control}
            {controlAbierto ? (
              <ChevronDown className="ml-auto h-4 w-4" />
            ) : (
              <ChevronRight className="ml-auto h-4 w-4" />
            )}
          </button>
          {controlAbierto ? (
            <div className="ml-7 mt-1 space-y-1 border-l border-white/10 pl-2">
              {controlSubItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `block rounded-md px-3 py-2 text-sm transition ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-slate-300 hover:bg-white/10 hover:text-white"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          ) : null}
        </div>

        {/* Eventos submenu */}
        <div>
          <button
            type="button"
            onClick={() => setEventosAbierto((v) => !v)}
            className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm transition ${
              estaEnEventos
                ? "bg-blue-600 text-white"
                : "text-slate-300 hover:bg-white/10 hover:text-white"
            }`}
            aria-expanded={eventosAbierto}
          >
            <BellRing className="h-4 w-4" />
            {nav.events}
            {eventosAbierto ? (
              <ChevronDown className="ml-auto h-4 w-4" />
            ) : (
              <ChevronRight className="ml-auto h-4 w-4" />
            )}
          </button>
          {eventosAbierto ? (
            <div className="ml-7 mt-1 space-y-1 border-l border-white/10 pl-2">
              {eventSubItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `block rounded-md px-3 py-2 text-sm transition ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-slate-300 hover:bg-white/10 hover:text-white"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          ) : null}
        </div>

        <div>
          <button
            type="button"
            onClick={() => setGisAbierto((v) => !v)}
            className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm transition ${
              estaEnGis
                ? "bg-blue-600 text-white"
                : "text-slate-300 hover:bg-white/10 hover:text-white"
            }`}
            aria-expanded={gisAbierto}
          >
            <Map className="h-4 w-4" />
            {nav.gis}
            {gisAbierto ? (
              <ChevronDown className="ml-auto h-4 w-4" />
            ) : (
              <ChevronRight className="ml-auto h-4 w-4" />
            )}
          </button>
          {gisAbierto ? (
            <div className="ml-7 mt-1 space-y-1 border-l border-white/10 pl-2">
              {gisSubItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `block rounded-md px-3 py-2 text-sm transition ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-slate-300 hover:bg-white/10 hover:text-white"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          ) : null}
        </div>

        <div>
          <button
            type="button"
            onClick={() => setMaintainAbierto((v) => !v)}
            className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm transition ${
              estaEnMaintain
                ? "bg-blue-600 text-white"
                : "text-slate-300 hover:bg-white/10 hover:text-white"
            }`}
            aria-expanded={maintainAbierto}
          >
            <Settings className="h-4 w-4" />
            {nav.maintenance}
            {maintainAbierto ? (
              <ChevronDown className="ml-auto h-4 w-4" />
            ) : (
              <ChevronRight className="ml-auto h-4 w-4" />
            )}
          </button>
          {maintainAbierto ? (
            <div className="ml-7 mt-1 space-y-1 border-l border-white/10 pl-2">
              {maintainSubItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `block rounded-md px-3 py-2 text-sm transition ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-slate-300 hover:bg-white/10 hover:text-white"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          ) : null}
        </div>

        {secondaryItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </NavLink>
        ))}

        <div>
          <button
            type="button"
            onClick={() => setUserCenterAbierto((v) => !v)}
            className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm transition ${
              estaEnUserCenter
                ? "bg-blue-600 text-white"
                : "text-slate-300 hover:bg-white/10 hover:text-white"
            }`}
            aria-expanded={userCenterAbierto}
          >
            <Users className="h-4 w-4" />
            {t.userCenter?.title ?? "User Center"}
            {userCenterAbierto ? (
              <ChevronDown className="ml-auto h-4 w-4" />
            ) : (
              <ChevronRight className="ml-auto h-4 w-4" />
            )}
          </button>
          {userCenterAbierto ? (
            <div className="ml-7 mt-1 space-y-1 border-l border-white/10 pl-2">
              {userCenterSubItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `block rounded-md px-3 py-2 text-sm transition ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-slate-300 hover:bg-white/10 hover:text-white"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          ) : null}
        </div>
      </nav>
    </aside>
  );
}
