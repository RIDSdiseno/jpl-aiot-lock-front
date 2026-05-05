import { Circle, Popup } from "react-leaflet";
import type { GeocercaMonitoreo } from "../../modulos/monitoreo/tipos/monitoreo.types";

export function CirculoGeocerca({
  geocerca,
  latitud,
  longitud,
  radio = 300,
}: {
  geocerca?: GeocercaMonitoreo;
  latitud?: number;
  longitud?: number;
  radio?: number;
}) {
  const centerLat = geocerca?.centerLat ?? latitud;
  const centerLng = geocerca?.centerLng ?? longitud;
  const radius = geocerca?.radiusMt ?? radio;

  if (centerLat === undefined || centerLng === undefined) return null;

  return (
    <Circle center={[centerLat, centerLng]} radius={radius} pathOptions={{ color: "#2563eb", fillOpacity: 0.08, weight: 2 }}>
      {geocerca ? (
        <Popup>
          <div className="space-y-1 text-sm">
            <div className="font-semibold">{geocerca.name}</div>
            {geocerca.description ? <div className="text-slate-600">{geocerca.description}</div> : null}
          </div>
        </Popup>
      ) : null}
    </Circle>
  );
}
