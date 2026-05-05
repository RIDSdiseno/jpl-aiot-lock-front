import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import type { MonitoringDevice, MonitoringGeoFence } from "../../types/monitoring.types";
import { DeviceMarker } from "./DeviceMarker";
import type { MonitoringAction } from "./DeviceStatusPopup";
import { GeoFenceOverlay } from "./GeoFenceOverlay";
import { MonitoringLegend } from "./MonitoringLegend";

export function MonitoringMap({
  devices,
  geofences,
  onSelectDevice,
  onAction,
}: {
  devices: MonitoringDevice[];
  geofences: MonitoringGeoFence[];
  onSelectDevice: (device: MonitoringDevice) => void;
  onAction: (device: MonitoringDevice, action: MonitoringAction) => void;
}) {
  const center: [number, number] = devices[0] ? [devices[0].latitude, devices[0].longitude] : [-33.4489, -70.6693];

  return (
    <div className="relative h-full min-h-[560px] bg-slate-100">
      <MapContainer center={center} zoom={11} scrollWheelZoom className="h-full min-h-[560px] w-full">
        <TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {geofences.map((geofence) => <GeoFenceOverlay key={geofence.id} geofence={geofence} />)}
        {devices.map((device) => <DeviceMarker key={device.id} device={device} onSelect={onSelectDevice} onAction={onAction} />)}
      </MapContainer>
      <MonitoringLegend />
    </div>
  );
}
