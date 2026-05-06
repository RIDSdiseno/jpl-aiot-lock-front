import { Circle } from "react-leaflet";
import type { MonitoringGeoFence } from "../../types/monitoring.types";

export function GeoFenceOverlay({ geofence }: { geofence: MonitoringGeoFence }) {
  const centerLat = geofence.centerLat ?? 22.68808;
  const centerLng = geofence.centerLng ?? 113.797646;
  const radiusMt = geofence.radiusMt ?? geofence.radiusMeters ?? 500;

  return (
    <Circle
      center={[centerLat, centerLng]}
      radius={radiusMt}
      pathOptions={{ color: "#2563eb", fillColor: "#3b82f6", fillOpacity: 0.08, weight: 2 }}
    />
  );
}
