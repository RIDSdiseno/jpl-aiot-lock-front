import { DEVICE_CONNECTION_STATUS_LABELS, DEVICE_STATUS_LABELS, DEVICE_TYPE_LABELS } from "../../librerias/constantes";
import type { FiltrosDispositivos as Filtros } from "../../modulos/dispositivos/tipos/dispositivo.types";
import { Buscador } from "../comunes/Buscador";
import { Selector } from "../comunes/Selector";

export function FiltrosDispositivos({ filtros, onCambiar }: { filtros: Filtros; onCambiar: (filtros: Filtros) => void }) {
  return (
    <div className="grid gap-3 rounded-lg border border-slate-200 bg-white p-4 md:grid-cols-4">
      <Buscador value={filtros.search ?? ""} onChange={(search) => onCambiar({ ...filtros, search })} placeholder="Buscar nombre, código, IMEI o serial" />
      <Selector value={filtros.type ?? ""} onChange={(e) => onCambiar({ ...filtros, type: e.target.value as Filtros["type"] })} opciones={[{ value: "", label: "Todos los tipos" }, ...Object.entries(DEVICE_TYPE_LABELS).map(([value, label]) => ({ value, label }))]} />
      <Selector value={filtros.status ?? ""} onChange={(e) => onCambiar({ ...filtros, status: e.target.value as Filtros["status"] })} opciones={[{ value: "", label: "Todos los estados" }, ...Object.entries(DEVICE_STATUS_LABELS).map(([value, label]) => ({ value, label }))]} />
      <Selector value={filtros.connectionStatus ?? ""} onChange={(e) => onCambiar({ ...filtros, connectionStatus: e.target.value as Filtros["connectionStatus"] })} opciones={[{ value: "", label: "Toda conexión" }, ...Object.entries(DEVICE_CONNECTION_STATUS_LABELS).map(([value, label]) => ({ value, label }))]} />
    </div>
  );
}
