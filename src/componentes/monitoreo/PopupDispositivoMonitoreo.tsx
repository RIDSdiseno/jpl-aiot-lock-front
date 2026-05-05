import { useNavigate } from "react-router-dom";
import { formatearFechaHora, formatearPorcentaje, obtenerLabelEstadoConexion, obtenerLabelTipoDispositivo } from "../../librerias/formatos";
import type { DispositivoMonitoreo } from "../../modulos/monitoreo/tipos/monitoreo.types";

export function PopupDispositivoMonitoreo({ dispositivo }: { dispositivo: DispositivoMonitoreo }) {
  const navigate = useNavigate();

  return (
    <div className="w-64 space-y-2 text-xs">
      <div>
        <div className="text-sm font-semibold text-slate-900">{dispositivo.name}</div>
        <div className="text-slate-500">{dispositivo.internalCode}</div>
      </div>
      <dl className="grid grid-cols-2 gap-x-3 gap-y-1">
        <dt className="text-slate-500">Tipo</dt>
        <dd className="text-right text-slate-800">{obtenerLabelTipoDispositivo(dispositivo.type)}</dd>
        <dt className="text-slate-500">Estado conexion</dt>
        <dd className="text-right text-slate-800">{obtenerLabelEstadoConexion(dispositivo.connectionStatus)}</dd>
        <dt className="text-slate-500">Bateria</dt>
        <dd className="text-right text-slate-800">{formatearPorcentaje(dispositivo.batteryLevel)}</dd>
        <dt className="text-slate-500">Senal</dt>
        <dd className="text-right text-slate-800">{formatearPorcentaje(dispositivo.signalLevel)}</dd>
        <dt className="text-slate-500">Ultima conexion</dt>
        <dd className="text-right text-slate-800">{formatearFechaHora(dispositivo.lastConnectionAt)}</dd>
        <dt className="text-slate-500">Empresa</dt>
        <dd className="text-right text-slate-800">{dispositivo.company?.name ?? "N/D"}</dd>
        <dt className="text-slate-500">Ubicacion</dt>
        <dd className="text-right text-slate-800">{formatearFechaHora(dispositivo.location?.recordedAt)}</dd>
      </dl>
      <button
        type="button"
        onClick={() => navigate(`/app/dispositivos/${dispositivo.id}`)}
        className="w-full rounded bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700"
      >
        Ver detalle
      </button>
    </div>
  );
}
