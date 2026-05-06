import { useQuery } from "@tanstack/react-query";
import { getDeviceGeoFences, syncDeviceGeoFence } from "../../services/geofence.service";
import type { MonitoringDevice } from "../../types/monitoring.types";
import { ModalShell } from "./TrajectoryModal";

export function FenceModal({ device, open, onClose }: { device?: MonitoringDevice; open: boolean; onClose: () => void }) {
  const query = useQuery({ queryKey: ["monitoring", "device-fences", device?.id], queryFn: () => getDeviceGeoFences(device?.id ?? ""), enabled: open && Boolean(device) });
  if (!open || !device) return null;
  return (
    <ModalShell title={`Fence - ${device.name}`} onClose={onClose}>
      <div className="space-y-2">
        {(query.data ?? []).map((fence) => (
          <div key={fence.id} className="flex items-center justify-between rounded border border-slate-200 px-3 py-2 text-sm">
            <div>
              <div className="font-semibold text-slate-900">{fence.name}</div>
              <div className="text-xs text-slate-500">{Math.round(fence.radiusMt ?? fence.radiusMeters ?? 0)} m radius</div>
            </div>
            <button type="button" onClick={() => void syncDeviceGeoFence(device.id, fence.id)} className="rounded bg-slate-900 px-3 py-1.5 text-xs font-medium text-white">Sync</button>
          </div>
        ))}
      </div>
    </ModalShell>
  );
}
