import { useNavigate } from "react-router-dom";
import { formatearFechaHora, formatearPorcentaje, obtenerLabelEstadoConexion, obtenerLabelTipoDispositivo } from "../../librerias/formatos";
import type { DispositivoMonitoreo } from "../../modulos/monitoreo/tipos/monitoreo.types";

export function PopupDispositivo({ dispositivo }: { dispositivo: DispositivoMonitoreo }) {
  const navigate = useNavigate();

  return (
    <div className="w-64 space-y-2 text-sm">
      <div>
        <div className="font-semibold text-slate-900">{dispositivo.name}</div>
        <div className="text-xs text-slate-500">{dispositivo.internalCode}</div>
      </div>
      {dispositivo.type === "SMART_LOCK" ? <div className="rounded bg-blue-50 px-2 py-1 text-xs text-blue-700">Candado inteligente</div> : null}
      <dl className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
        <dt className="text-slate-500">Tipo</dt>
        <dd className="text-right text-slate-800">{obtenerLabelTipoDispositivo(dispositivo.type)}</dd>
        <dt className="text-slate-500">Conexión</dt>
        <dd className="text-right text-slate-800">{obtenerLabelEstadoConexion(dispositivo.connectionStatus)}</dd>
        <dt className="text-slate-500">Batería</dt>
        <dd className="text-right text-slate-800">{formatearPorcentaje(dispositivo.batteryLevel)}</dd>
        <dt className="text-slate-500">Señal</dt>
        <dd className="text-right text-slate-800">{formatearPorcentaje(dispositivo.signalLevel)}</dd>
        <dt className="text-slate-500">Última conexión</dt>
        <dd className="text-right text-slate-800">{formatearFechaHora(dispositivo.lastConnectionAt)}</dd>
        <dt className="text-slate-500">Empresa</dt>
        <dd className="text-right text-slate-800">{dispositivo.company?.name ?? "N/D"}</dd>
      </dl>
      <button
        type="button"
        onClick={() => navigate(`/app/dispositivos/${dispositivo.id}`)}
        className="w-full rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        Ver detalle
      </button>
    </div>
  );
}
