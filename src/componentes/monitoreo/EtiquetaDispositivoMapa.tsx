import L from "leaflet";
import { Marker } from "react-leaflet";
import type { DispositivoMonitoreo } from "../../modulos/monitoreo/tipos/monitoreo.types";

export function EtiquetaDispositivoMapa({ dispositivo }: { dispositivo: DispositivoMonitoreo }) {
  if (!dispositivo.location) return null;

  const texto = `${dispositivo.internalCode} - ${dispositivo.name}`;
  const icon = L.divIcon({
    className: "",
    html: `<div style="white-space:nowrap;border:1px solid #cbd5e1;background:white;color:#0f172a;border-radius:3px;padding:4px 8px;font-size:12px;font-weight:600;box-shadow:0 6px 18px rgba(15,23,42,.22);">${texto}</div>`,
    iconSize: [Math.min(420, Math.max(120, texto.length * 7)), 26],
    iconAnchor: [-12, 32],
  });

  return <Marker interactive={false} position={[dispositivo.location.latitude, dispositivo.location.longitude]} icon={icon} zIndexOffset={900} />;
}
