import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { useMap } from "react-leaflet";
import type { MonitoringDevice, MonitoringGeoFence } from "../../types/monitoring.types";
import { DeviceMarker } from "./DeviceMarker";
import type { MonitoringAction } from "./DeviceStatusPopup";
import { GeoFenceOverlay } from "./GeoFenceOverlay";
import { MonitoringLegend } from "./MonitoringLegend";

export function MonitoringMap({
  devices,
  geofences,
  selectedDevice,
  onSelectDevice,
  onAction,
}: {
  devices: MonitoringDevice[];
  geofences: MonitoringGeoFence[];
  selectedDevice?: MonitoringDevice;
  onSelectDevice: (device: MonitoringDevice) => void;
  onAction: (device: MonitoringDevice, action: MonitoringAction) => void;
}) {
  const centerDevice = selectedDevice ?? devices[0];
  const center: [number, number] = centerDevice ? [centerDevice.latitude, centerDevice.longitude] : [22.68808, 113.797646];

  return (
    <div className="relative h-full min-h-[560px] bg-slate-100">
      <MapContainer center={center} zoom={11} scrollWheelZoom className="h-full min-h-[560px] w-full">
        <MapCenter device={selectedDevice} />
        <TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {geofences.map((geofence) => <GeoFenceOverlay key={geofence.id} geofence={geofence} />)}
        {devices.map((device) => <DeviceMarker key={device.id} device={device} onSelect={onSelectDevice} onAction={onAction} />)}
      </MapContainer>
      <MonitoringLegend />
    </div>
  );
}

function MapCenter({ device }: { device?: MonitoringDevice }) {
  const map = useMap();

  useEffect(() => {
    if (device) {
      map.setView([device.latitude, device.longitude], Math.max(map.getZoom(), 13), { animate: true });
    }
  }, [device, map]);

  return null;
}
