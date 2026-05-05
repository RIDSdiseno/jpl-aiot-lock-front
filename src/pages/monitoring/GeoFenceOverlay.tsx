import { Circle } from "react-leaflet";
import type { MonitoringGeoFence } from "../../types/monitoring.types";

export function GeoFenceOverlay({ geofence }: { geofence: MonitoringGeoFence }) {
  return (
    <Circle
      center={[geofence.centerLat, geofence.centerLng]}
      radius={geofence.radiusMt}
      pathOptions={{ color: "#2563eb", fillColor: "#3b82f6", fillOpacity: 0.08, weight: 2 }}
    />
  );
}
