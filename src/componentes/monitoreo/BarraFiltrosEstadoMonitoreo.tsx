import { MONITORING_STATUS_LABELS } from "../../librerias/constantes";
import type { EstadoFiltroMonitoreo, ResumenMonitoreo } from "../../modulos/monitoreo/tipos/monitoreo.types";

const filtros: Array<{
  estado: EstadoFiltroMonitoreo;
  contador: keyof ResumenMonitoreo;
  claseBase: string;
  claseActiva: string;
}> = [
  { estado: "ALL", contador: "total", claseBase: "border-blue-200 text-blue-700", claseActiva: "border-blue-600 bg-blue-600 text-white" },
  { estado: "ONLINE", contador: "online", claseBase: "border-emerald-200 text-emerald-700", claseActiva: "border-emerald-600 bg-emerald-600 text-white" },
  { estado: "OFFLINE", contador: "offline", claseBase: "border-slate-300 text-slate-700", claseActiva: "border-slate-700 bg-slate-700 text-white" },
  { estado: "SLEEP", contador: "sleep", claseBase: "border-orange-200 text-orange-700", claseActiva: "border-orange-500 bg-orange-500 text-white" },
  { estado: "ALARM", contador: "alarm", claseBase: "border-red-200 text-red-700", claseActiva: "border-red-600 bg-red-600 text-white" },
];

export function BarraFiltrosEstadoMonitoreo({
  estadoActual,
  resumen,
  onCambiarEstado,
}: {
  estadoActual: EstadoFiltroMonitoreo;
  resumen?: ResumenMonitoreo;
  onCambiarEstado: (estado: EstadoFiltroMonitoreo) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 bg-white px-4 py-3">
      {filtros.map((filtro) => {
        const activo = estadoActual === filtro.estado;
        return (
          <button
            key={filtro.estado}
            type="button"
            onClick={() => onCambiarEstado(filtro.estado)}
            className={`min-w-28 rounded border px-3 py-2 text-sm font-semibold shadow-sm transition ${
              activo ? filtro.claseActiva : `bg-white hover:bg-slate-50 ${filtro.claseBase}`
            }`}
          >
            <span>{MONITORING_STATUS_LABELS[filtro.estado]}</span>
            <span className={`ml-2 rounded px-1.5 py-0.5 text-xs ${activo ? "bg-white/20" : "bg-slate-100 text-slate-700"}`}>
              {resumen?.[filtro.contador] ?? 0}
            </span>
          </button>
        );
      })}
    </div>
  );
}
