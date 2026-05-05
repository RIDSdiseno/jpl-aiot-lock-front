import L from "leaflet";
import { Marker, Popup } from "react-leaflet";
import type { MonitoringDevice } from "../../types/monitoring.types";
import { DeviceStatusPopup, type MonitoringAction } from "./DeviceStatusPopup";

function markerIcon(status: MonitoringDevice["status"]) {
  const color = status === "alarm" ? "#e11d48" : status === "online" ? "#10b981" : "#64748b";
  return L.divIcon({
    className: "",
    html: `<div style="width:18px;height:18px;border-radius:50%;background:${color};border:3px solid white;box-shadow:0 2px 8px rgba(15,23,42,.35)"></div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });
}

export function DeviceMarker({
  device,
  onSelect,
  onAction,
}: {
  device: MonitoringDevice;
  onSelect: (device: MonitoringDevice) => void;
  onAction: (device: MonitoringDevice, action: MonitoringAction) => void;
}) {
  return (
    <Marker position={[device.latitude, device.longitude]} icon={markerIcon(device.status)} eventHandlers={{ click: () => onSelect(device) }}>
      <Popup>
        <DeviceStatusPopup device={device} onAction={(action) => onAction(device, action)} />
      </Popup>
    </Marker>
  );
}
