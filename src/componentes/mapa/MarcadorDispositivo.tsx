import { Marker, Popup } from "react-leaflet";
import { DEVICE_CONNECTION_STATUS_LABELS, DEVICE_TYPE_LABELS } from "../../librerias/constantes";
import { formatearFecha } from "../../librerias/fechas";
import { formatearPorcentaje } from "../../librerias/formatos";
import type { UbicacionDispositivo } from "../../modulos/gis/tipos/gis.types";

export function MarcadorDispositivo({ ubicacion }: { ubicacion: UbicacionDispositivo }) {
  return (
    <Marker position={[ubicacion.latitude, ubicacion.longitude]}>
      <Popup>
        <div className="space-y-1 text-sm">
          <div className="font-semibold">{ubicacion.deviceName ?? ubicacion.deviceId}</div>
          <div>Tipo: {ubicacion.type ? DEVICE_TYPE_LABELS[ubicacion.type] : "N/D"}</div>
          <div>Conexión: {ubicacion.connectionStatus ? DEVICE_CONNECTION_STATUS_LABELS[ubicacion.connectionStatus] : "N/D"}</div>
          <div>Batería: {formatearPorcentaje(ubicacion.batteryLevel)}</div>
          <div>Última conexión: {formatearFecha(ubicacion.lastConnectionAt)}</div>
        </div>
      </Popup>
    </Marker>
  );
}
