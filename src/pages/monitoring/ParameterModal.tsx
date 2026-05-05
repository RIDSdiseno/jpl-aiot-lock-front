import { useQuery } from "@tanstack/react-query";
import { getDeviceParameters, readDeviceParameters } from "../../services/deviceCommands.service";
import type { MonitoringDevice } from "../../types/monitoring.types";
import { ModalShell } from "./TrajectoryModal";

export function ParameterModal({ device, open, onClose }: { device?: MonitoringDevice; open: boolean; onClose: () => void }) {
  const query = useQuery({ queryKey: ["monitoring", "parameters", device?.id], queryFn: () => getDeviceParameters(device?.id ?? ""), enabled: open && Boolean(device) });
  if (!open || !device) return null;
  const parameters = query.data;
  return (
    <ModalShell title={`Parameter - ${device.name}`} onClose={onClose}>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <Info label="Heartbeat" value={`${parameters?.heartbeatSeconds ?? "-"} s`} />
        <Info label="GPS interval" value={`${parameters?.gpsIntervalSeconds ?? "-"} s`} />
        <Info label="Overspeed" value={`${parameters?.overspeedLimitKmh ?? "-"} km/h`} />
        <Info label="Alarm" value={parameters?.alarmEnabled ? "Enabled" : "Disabled"} />
      </div>
      <button type="button" onClick={() => void readDeviceParameters(device.id)} className="mt-4 rounded bg-slate-900 px-3 py-2 text-sm font-medium text-white">Read parameters</button>
    </ModalShell>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return <div className="rounded border border-slate-200 p-3"><div className="text-xs text-slate-500">{label}</div><div className="font-semibold text-slate-900">{value}</div></div>;
}
