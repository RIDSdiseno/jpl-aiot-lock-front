import type { DeviceType } from "../../modulos/dispositivos/tipos/dispositivo.types";
import { DEVICE_TYPE_LABELS } from "../../librerias/constantes";

export function TarjetaResumenDispositivo({ type, total }: { type: DeviceType; total: number }) {
  return (
    <div className="rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 p-5 text-white shadow-suave">
      <div className="text-sm text-blue-100">{DEVICE_TYPE_LABELS[type]}</div>
      <div className="mt-3 text-3xl font-semibold">{total}</div>
      <div className="mt-2 text-xs text-blue-100">{type}</div>
    </div>
  );
}
