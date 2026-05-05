import { X } from "lucide-react";
import type { ReactNode } from "react";
import { useDeviceTrajectory } from "../../hooks/useDeviceTrajectory";
import type { MonitoringDevice } from "../../types/monitoring.types";

export function TrajectoryModal({ device, open, onClose }: { device?: MonitoringDevice; open: boolean; onClose: () => void }) {
  const trajectory = useDeviceTrajectory(device?.id, open);
  if (!open || !device) return null;
  return (
    <ModalShell title={`Trajectory - ${device.name}`} onClose={onClose}>
      <div className="max-h-72 overflow-auto rounded border border-slate-200">
        {(trajectory.data ?? []).map((point) => (
          <div key={point.recordedAt} className="grid grid-cols-4 gap-2 border-b border-slate-100 px-3 py-2 text-xs">
            <span>{point.latitude.toFixed(5)}</span>
            <span>{point.longitude.toFixed(5)}</span>
            <span>{point.speed} km/h</span>
            <span>{new Date(point.recordedAt).toLocaleTimeString()}</span>
          </div>
        ))}
      </div>
    </ModalShell>
  );
}

export function ModalShell({ title, children, onClose }: { title: string; children: ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-950/40 p-4">
      <div className="w-full max-w-xl rounded bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
          <h2 className="font-semibold text-slate-900">{title}</h2>
          <button type="button" onClick={onClose} className="rounded p-1 hover:bg-slate-100" title="Close">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
