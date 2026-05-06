import type { MonitoringDevice, MonitoringGeoFence, MonitoringStatusFilter } from "../../types/monitoring.types";
import { DeviceSearchInput } from "./DeviceSearchInput";
import { DeviceStatusTabs } from "./DeviceStatusTabs";
import { DeviceTree } from "./DeviceTree";
import { FenceSearchInput } from "./FenceSearchInput";

export function MonitoringSidebar({
  devices,
  geofences,
  selectedDeviceId,
  status,
  deviceSearch,
  fenceSearch,
  onStatusChange,
  onDeviceSearchChange,
  onFenceSearchChange,
  onSelectDevice,
}: {
  devices: MonitoringDevice[];
  geofences: MonitoringGeoFence[];
  selectedDeviceId?: string;
  status: MonitoringStatusFilter;
  deviceSearch: string;
  fenceSearch: string;
  onStatusChange: (status: MonitoringStatusFilter) => void;
  onDeviceSearchChange: (value: string) => void;
  onFenceSearchChange: (value: string) => void;
  onSelectDevice: (device: MonitoringDevice) => void;
}) {
  const counts = {
    all: devices.length,
    online: devices.filter((device) => device.status === "online").length,
    offline: devices.filter((device) => device.status === "offline").length,
    alarm: devices.filter((device) => device.status === "alarm").length,
  };

  return (
    <aside className="flex min-h-0 flex-col gap-3 border-r border-slate-200 bg-slate-50 p-3">
      <DeviceStatusTabs value={status} onChange={onStatusChange} counts={counts} />
      <DeviceSearchInput value={deviceSearch} onChange={onDeviceSearchChange} />
      <FenceSearchInput value={fenceSearch} onChange={onFenceSearchChange} />
      <div className="min-h-0 flex-1 overflow-auto pr-1">
        <DeviceTree devices={devices} selectedId={selectedDeviceId} onSelect={onSelectDevice} />
      </div>
      <div className="rounded border border-slate-200 bg-white p-3">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Fence List</h3>
        <div className="mt-2 space-y-1">
          {geofences.map((fence) => (
            <div key={fence.id} className="flex items-center justify-between gap-2 text-sm text-slate-700">
              <span className="truncate">{fence.name}</span>
              <span className="text-xs text-slate-500">{Math.round(fence.radiusMt ?? fence.radiusMeters ?? 0)} m</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
