import {
  AlertTriangle,
  BarChart3,
  BellRing,
  Building2,
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

const items = [
  { label: "Inicio", to: "/app/inicio", icon: Home },
  { label: "Monitoreo", to: "/app/monitoreo", icon: Monitor },
];

const secondaryItems = [
  { label: "GIS / Mapa", to: "/app/gis", icon: Map },
  { label: "Alertas", to: "/app/alertas", icon: AlertTriangle },
  { label: "Reportes", to: "/app/reportes", icon: BarChart3 },
  { label: "Auditoria", to: "/app/auditoria", icon: ClipboardList },
  { label: "Dispositivos", to: "/app/dispositivos", icon: Cpu },
  { label: "Candados inteligentes", to: "/app/candados", icon: LockKeyhole },
  { label: "Mantenimiento", to: "/app/mantenimiento", icon: Settings },
  { label: "Historial", to: "/app/historial", icon: History },
  { label: "Usuarios", to: "/app/usuarios", icon: Users },
  { label: "Empresas", to: "/app/empresas", icon: Building2 },
];

export function BarraLateral() {
  const location = useLocation();
  const estaEnControl = location.pathname.startsWith("/app/control");
  const estaEnEventos = location.pathname.startsWith("/app/event") || location.pathname.startsWith("/app/eventos");
  const [controlAbierto, setControlAbierto] = useState(estaEnControl);
  const [eventosAbierto, setEventosAbierto] = useState(estaEnEventos);

  useEffect(() => {
    if (estaEnControl) {
      setControlAbierto(true);
    }
  }, [estaEnControl]);

  useEffect(() => {
    if (estaEnEventos) {
      setEventosAbierto(true);
    }
  }, [estaEnEventos]);

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 flex-col bg-slate-950 text-white lg:flex">
      <div className="flex h-16 items-center gap-3 border-b border-white/10 px-5">
        <ShieldCheck className="h-7 w-7 text-blue-300" />
        <div>
          <div className="text-sm font-semibold">JPL-AIOT-LOCK</div>
          <div className="text-xs text-slate-400">Plataforma AIoT</div>
        </div>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition ${
                isActive ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-white/10 hover:text-white"
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
            onClick={() => setControlAbierto((abierto) => !abierto)}
            className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm transition ${
              estaEnControl ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-white/10 hover:text-white"
            }`}
            aria-expanded={controlAbierto}
          >
            <Gauge className="h-4 w-4" />
            Control
            {controlAbierto ? <ChevronDown className="ml-auto h-4 w-4" /> : <ChevronRight className="ml-auto h-4 w-4" />}
          </button>
          {controlAbierto ? (
            <div className="ml-7 mt-1 space-y-1 border-l border-white/10 pl-2">
              {[
                { label: "NFC", to: "/app/control/nfc" },
                { label: "Password", to: "/app/control/password" },
                { label: "CMD Record", to: "/app/control/cmd-record" },
                { label: "Parameter", to: "/app/control/parameter" },
              ].map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `block rounded-md px-3 py-2 text-sm transition ${isActive ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-white/10 hover:text-white"}`
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
            onClick={() => setEventosAbierto((abierto) => !abierto)}
            className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm transition ${
              estaEnEventos ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-white/10 hover:text-white"
            }`}
            aria-expanded={eventosAbierto}
          >
            <BellRing className="h-4 w-4" />
            Eventos
            {eventosAbierto ? <ChevronDown className="ml-auto h-4 w-4" /> : <ChevronRight className="ml-auto h-4 w-4" />}
          </button>
          {eventosAbierto ? (
            <div className="ml-7 mt-1 space-y-1 border-l border-white/10 pl-2">
              {[
                { label: "Todos los eventos", to: "/app/event/all-events" },
                { label: "Eventos de alarma", to: "/app/event/alarm-event" },
                { label: "Eventos push", to: "/app/event/push-event" },
              ].map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `block rounded-md px-3 py-2 text-sm transition ${isActive ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-white/10 hover:text-white"}`
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
                isActive ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
