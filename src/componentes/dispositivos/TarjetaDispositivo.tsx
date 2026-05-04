import { Link } from "react-router-dom";
import { formatearPorcentaje } from "../../librerias/formatos";
import type { Dispositivo } from "../../modulos/dispositivos/tipos/dispositivo.types";
import { Tarjeta } from "../comunes/Tarjeta";
import { InsigniaEstadoDispositivo } from "./InsigniaEstadoDispositivo";

export function TarjetaDispositivo({ dispositivo }: { dispositivo: Dispositivo }) {
  return (
    <Tarjeta>
      <div className="flex items-start justify-between gap-3">
        <div>
          <Link className="font-semibold text-slate-900 hover:text-blue-600" to={`/app/dispositivos/${dispositivo.id}`}>{dispositivo.name}</Link>
          <p className="text-xs text-slate-500">{dispositivo.internalCode}</p>
        </div>
        <InsigniaEstadoDispositivo estado={dispositivo.connectionStatus} />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div><span className="text-slate-500">Batería</span><div className="font-medium">{formatearPorcentaje(dispositivo.batteryLevel)}</div></div>
        <div><span className="text-slate-500">Señal</span><div className="font-medium">{formatearPorcentaje(dispositivo.signalLevel)}</div></div>
      </div>
    </Tarjeta>
  );
}
