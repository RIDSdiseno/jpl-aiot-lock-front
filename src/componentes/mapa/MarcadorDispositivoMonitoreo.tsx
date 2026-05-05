import L from "leaflet";
import { Marker, Popup } from "react-leaflet";
import { obtenerColorEstadoMonitoreo } from "../../librerias/constantes";
import type { DispositivoMonitoreo } from "../../modulos/monitoreo/tipos/monitoreo.types";
import { PopupDispositivoMonitoreo } from "../monitoreo/PopupDispositivoMonitoreo";

function crearIcono(color: string, seleccionado: boolean) {
  const size = seleccionado ? 28 : 22;
  const inner = seleccionado ? 14 : 11;
  return L.divIcon({
    className: "",
    html: `<div style="width:${size}px;height:${size}px;border-radius:9999px;background:white;border:2px solid ${color};box-shadow:0 8px 20px rgba(15,23,42,.35);display:flex;align-items:center;justify-content:center;"><span style="width:${inner}px;height:${inner}px;border-radius:9999px;background:${color};display:block;"></span></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -(size / 2)],
  });
}

export function MarcadorDispositivoMonitoreo({
  dispositivo,
  seleccionado,
  onSeleccionarDispositivo,
}: {
  dispositivo: DispositivoMonitoreo;
  seleccionado: boolean;
  onSeleccionarDispositivo: (dispositivo: DispositivoMonitoreo) => void;
}) {
  if (!dispositivo.location) return null;
  const color = obtenerColorEstadoMonitoreo(dispositivo.connectionStatus, dispositivo.hasOpenAlert);

  return (
    <Marker
      position={[dispositivo.location.latitude, dispositivo.location.longitude]}
      icon={crearIcono(color, seleccionado)}
      zIndexOffset={seleccionado ? 800 : 0}
      eventHandlers={{ click: () => onSeleccionarDispositivo(dispositivo) }}
    >
      <Popup>
        <PopupDispositivoMonitoreo dispositivo={dispositivo} />
      </Popup>
    </Marker>
  );
}
