import L from "leaflet";
import { Marker, Popup } from "react-leaflet";
import { PopupDispositivo } from "../monitoreo/PopupDispositivo";
import { DEVICE_CONNECTION_STATUS_LABELS, DEVICE_TYPE_LABELS } from "../../librerias/constantes";
import { formatearFecha } from "../../librerias/fechas";
import { formatearPorcentaje } from "../../librerias/formatos";
import type { UbicacionDispositivo } from "../../modulos/gis/tipos/gis.types";
import type { DispositivoMonitoreo } from "../../modulos/monitoreo/tipos/monitoreo.types";

function colorMarcador(dispositivo: DispositivoMonitoreo) {
  if (dispositivo.hasOpenAlert) return "#dc2626";
  if (dispositivo.connectionStatus === "ONLINE") return "#10b981";
  if (dispositivo.connectionStatus === "SLEEP") return "#f97316";
  if (dispositivo.connectionStatus === "LOST_SIGNAL") return "#f59e0b";
  if (dispositivo.connectionStatus === "UNKNOWN") return "#334155";
  return "#94a3b8";
}

function crearIcono(color: string) {
  return L.divIcon({
    className: "",
    html: `<span style="display:block;width:18px;height:18px;border-radius:9999px;background:${color};border:3px solid white;box-shadow:0 8px 18px rgba(15,23,42,.35);"></span>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
    popupAnchor: [0, -9],
  });
}

export function MarcadorDispositivo({
  ubicacion,
  dispositivo,
  onSeleccionarDispositivo,
}: {
  ubicacion?: UbicacionDispositivo;
  dispositivo?: DispositivoMonitoreo;
  onSeleccionarDispositivo?: (dispositivo: DispositivoMonitoreo) => void;
}) {
  if (dispositivo?.location) {
    return (
      <Marker
        position={[dispositivo.location.latitude, dispositivo.location.longitude]}
        icon={crearIcono(colorMarcador(dispositivo))}
        eventHandlers={{ click: () => onSeleccionarDispositivo?.(dispositivo) }}
      >
        <Popup>
          <PopupDispositivo dispositivo={dispositivo} />
        </Popup>
      </Marker>
    );
  }

  if (!ubicacion) return null;

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
