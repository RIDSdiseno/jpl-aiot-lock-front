import { DEVICE_TYPE_LABELS } from "../../librerias/constantes";
import { formatearFecha } from "../../librerias/fechas";
import { formatearPorcentaje, formatearTexto } from "../../librerias/formatos";
import type { Dispositivo } from "../../modulos/dispositivos/tipos/dispositivo.types";
import { Tarjeta } from "../comunes/Tarjeta";
import { InsigniaEstadoDispositivo } from "./InsigniaEstadoDispositivo";

export function ResumenDispositivo({ dispositivo }: { dispositivo: Dispositivo }) {
  const filas = [
    ["Tipo", DEVICE_TYPE_LABELS[dispositivo.type]],
    ["Estado administrativo", <InsigniaEstadoDispositivo estado={dispositivo.status} />],
    ["Estado conexión", <InsigniaEstadoDispositivo estado={dispositivo.connectionStatus} />],
    ["Batería", formatearPorcentaje(dispositivo.batteryLevel)],
    ["Señal", formatearPorcentaje(dispositivo.signalLevel)],
    ["IMEI", formatearTexto(dispositivo.imei)],
    ["Serial", formatearTexto(dispositivo.serialNumber)],
    ["MAC", formatearTexto(dispositivo.macAddress)],
    ["Empresa", formatearTexto(dispositivo.companyId)],
    ["Última conexión", formatearFecha(dispositivo.lastConnectionAt)],
    ["Última sincronización", formatearFecha(dispositivo.lastSyncAt)],
  ];
  return (
    <Tarjeta>
      <h2 className="mb-4 font-semibold">Información general</h2>
      <dl className="grid gap-3 md:grid-cols-2">
        {filas.map(([label, valor]) => <div key={String(label)}><dt className="text-xs text-slate-500">{label}</dt><dd className="text-sm font-medium text-slate-900">{valor}</dd></div>)}
      </dl>
    </Tarjeta>
  );
}
