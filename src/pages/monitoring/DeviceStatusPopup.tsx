import type { ReactNode } from "react";
import { CircleDot, KeyRound, MapPinned, Route, Settings, Shield, SlidersHorizontal, Tag } from "lucide-react";
import type { MonitoringDevice } from "../../types/monitoring.types";

export type MonitoringAction = "unseal" | "seal" | "advance" | "parameter" | "fence" | "password" | "trajectory" | "nfc";

const fields: Array<[keyof MonitoringDevice, string]> = [
  ["deviceId", "Device ID"],
  ["battery", "Battery"],
  ["signal", "Signal"],
  ["connectionMode", "Connection mode"],
  ["deviceStatus", "Device status"],
  ["speed", "Speed"],
  ["sim", "SIM"],
  ["lockStatus", "Lock status"],
  ["shackleStatus", "Shackle status"],
  ["alarmStatus", "Alarm status"],
  ["positioningTime", "Positioning time"],
  ["location", "Location"],
];

export function DeviceStatusPopup({
  device,
  onAction,
}: {
  device: MonitoringDevice;
  onAction: (action: MonitoringAction) => void;
}) {
  return (
    <div className="w-[340px] max-w-[82vw] text-slate-800">
      <div className="mb-2 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold">{device.name}</h3>
          <p className="text-xs text-slate-500">{device.companyName}</p>
        </div>
        <span className={`rounded px-2 py-1 text-xs font-semibold text-white ${device.status === "alarm" ? "bg-rose-600" : device.status === "online" ? "bg-emerald-600" : "bg-slate-500"}`}>
          {device.status}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
        <div className="col-span-2">Coordinates: {device.latitude.toFixed(6)}, {device.longitude.toFixed(6)}</div>
        {fields.map(([key, label]) => (
          <div key={key} className="min-w-0">
            <span className="text-slate-500">{label}: </span>
            <span className="font-medium">{String(device[key])}{key === "battery" || key === "signal" ? "%" : key === "speed" ? " km/h" : ""}</span>
          </div>
        ))}
        <div className="col-span-2">
          <span className="text-slate-500">Events: </span>
          <span className="font-medium">{device.events.join(", ")}</span>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-4 gap-1.5">
        <PopupButton label="Unseal" icon={<KeyRound className="h-3.5 w-3.5" />} onClick={() => onAction("unseal")} />
        <PopupButton label="Seal" icon={<Shield className="h-3.5 w-3.5" />} onClick={() => onAction("seal")} />
        <PopupButton label="Advance" icon={<SlidersHorizontal className="h-3.5 w-3.5" />} onClick={() => onAction("advance")} />
        <PopupButton label="Parameter" icon={<Settings className="h-3.5 w-3.5" />} onClick={() => onAction("parameter")} />
        <PopupButton label="Fence" icon={<MapPinned className="h-3.5 w-3.5" />} onClick={() => onAction("fence")} />
        <PopupButton label="Password" icon={<CircleDot className="h-3.5 w-3.5" />} onClick={() => onAction("password")} />
        <PopupButton label="Trajectory" icon={<Route className="h-3.5 w-3.5" />} onClick={() => onAction("trajectory")} />
        <PopupButton label="NFC" icon={<Tag className="h-3.5 w-3.5" />} onClick={() => onAction("nfc")} />
      </div>
    </div>
  );
}

function PopupButton({ label, icon, onClick }: { label: string; icon: ReactNode; onClick: () => void }) {
  return (
    <button type="button" title={label} onClick={onClick} className="flex items-center justify-center gap-1 rounded bg-slate-900 px-2 py-1.5 text-[11px] font-medium text-white hover:bg-slate-700">
      {icon}
      {label}
    </button>
  );
}
