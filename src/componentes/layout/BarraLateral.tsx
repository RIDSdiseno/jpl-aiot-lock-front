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
} from "lucide-react";
import { NavLink } from "react-router-dom";

const items = [
  { label: "Inicio", to: "/app/inicio", icon: Home },
  { label: "Monitoreo", to: "/app/monitoreo", icon: Monitor },
  { label: "Control", to: "/app/control", icon: Gauge },
  { label: "Eventos", to: "/app/eventos", icon: BellRing },
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
      </nav>
    </aside>
  );
}
