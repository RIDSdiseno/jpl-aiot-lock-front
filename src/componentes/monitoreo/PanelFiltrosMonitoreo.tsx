import { MONITORING_STATUS_LABELS } from "../../librerias/constantes";
import type { EstadoFiltroMonitoreo, ResumenMonitoreo } from "../../modulos/monitoreo/tipos/monitoreo.types";

const filtros: Array<{
  estado: EstadoFiltroMonitoreo;
  contador: keyof ResumenMonitoreo;
  clases: string;
  activo: string;
}> = [
  { estado: "ALL", contador: "total", clases: "border-blue-200 text-blue-700", activo: "bg-blue-600 text-white border-blue-600" },
  { estado: "ONLINE", contador: "online", clases: "border-emerald-200 text-emerald-700", activo: "bg-emerald-600 text-white border-emerald-600" },
  { estado: "OFFLINE", contador: "offline", clases: "border-slate-200 text-slate-600", activo: "bg-slate-700 text-white border-slate-700" },
  { estado: "SLEEP", contador: "sleep", clases: "border-orange-200 text-orange-700", activo: "bg-orange-500 text-white border-orange-500" },
  { estado: "LOST_SIGNAL", contador: "lostSignal", clases: "border-amber-200 text-amber-700", activo: "bg-amber-500 text-white border-amber-500" },
  { estado: "ALARM", contador: "alarm", clases: "border-red-200 text-red-700", activo: "bg-red-600 text-white border-red-600" },
];

export function PanelFiltrosMonitoreo({
  estadoActual,
  onCambiarEstado,
  resumen,
}: {
  estadoActual: EstadoFiltroMonitoreo;
  onCambiarEstado: (estado: EstadoFiltroMonitoreo) => void;
  resumen?: ResumenMonitoreo;
}) {
  return (
    <div className="flex flex-wrap gap-2 rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
      {filtros.map((filtro) => {
        const activo = estadoActual === filtro.estado;
        return (
          <button
            key={filtro.estado}
            type="button"
            onClick={() => onCambiarEstado(filtro.estado)}
            className={`flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium transition ${
              activo ? filtro.activo : `bg-white hover:bg-slate-50 ${filtro.clases}`
            }`}
          >
            <span>{MONITORING_STATUS_LABELS[filtro.estado]}</span>
            <span className={`rounded-full px-2 py-0.5 text-xs ${activo ? "bg-white/20" : "bg-slate-100 text-slate-700"}`}>
              {resumen?.[filtro.contador] ?? 0}
            </span>
          </button>
        );
      })}
    </div>
  );
}
