import { Battery, Cpu, LockKeyhole, MapPin, Router, ShieldCheck } from "lucide-react";
import { obtenerColorEstadoMonitoreo } from "../../librerias/constantes";
import { formatearPorcentaje } from "../../librerias/formatos";
import type { DispositivoArbolMonitoreo } from "../../modulos/monitoreo/tipos/monitoreo.types";

function IconoDispositivo({ tipo }: { tipo: string }) {
  if (tipo === "SMART_LOCK") return <LockKeyhole className="h-3.5 w-3.5" />;
  if (tipo === "SMART_GATEWAY") return <Router className="h-3.5 w-3.5" />;
  if (tipo === "E_SEAL") return <ShieldCheck className="h-3.5 w-3.5" />;
  if (tipo === "GPS_TRACKER") return <MapPin className="h-3.5 w-3.5" />;
  return <Cpu className="h-3.5 w-3.5" />;
}

export function ItemDispositivoMonitoreo({
  dispositivo,
  visible,
  seleccionado,
  onAlternarVisible,
  onSeleccionar,
}: {
  dispositivo: DispositivoArbolMonitoreo;
  visible: boolean;
  seleccionado: boolean;
  onAlternarVisible: () => void;
  onSeleccionar: () => void;
}) {
  const color = obtenerColorEstadoMonitoreo(dispositivo.connectionStatus);

  return (
    <div className={`flex items-center gap-2 rounded px-2 py-1.5 text-xs ${seleccionado ? "bg-blue-50" : "hover:bg-slate-50"}`}>
      <input
        type="checkbox"
        checked={visible}
        onChange={onAlternarVisible}
        className="h-3.5 w-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
        aria-label={`Mostrar ${dispositivo.name}`}
      />
      <span className="shrink-0 text-slate-500">
        <IconoDispositivo tipo={dispositivo.type} />
      </span>
      <button type="button" onClick={onSeleccionar} className="min-w-0 flex-1 text-left">
        <span className={`block truncate font-medium ${dispositivo.hasLocation ? "text-slate-800" : "text-slate-400"}`}>
          {dispositivo.internalCode || dispositivo.name}
        </span>
        <span className="block truncate text-[11px] text-slate-500">{dispositivo.name}</span>
      </button>
      {dispositivo.batteryLevel !== null && dispositivo.batteryLevel !== undefined ? (
        <span className="hidden items-center gap-1 text-[11px] text-slate-500 2xl:inline-flex">
          <Battery className="h-3 w-3" />
          {formatearPorcentaje(dispositivo.batteryLevel)}
        </span>
      ) : null}
      {!dispositivo.hasLocation ? <MapPin className="h-3.5 w-3.5 text-slate-300" /> : null}
      <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: color }} title={dispositivo.connectionStatus} />
    </div>
  );
}
