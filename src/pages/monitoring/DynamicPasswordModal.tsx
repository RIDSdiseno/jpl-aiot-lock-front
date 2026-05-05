import { useQuery } from "@tanstack/react-query";
import { getDynamicPassword } from "../../services/deviceCommands.service";
import type { MonitoringDevice } from "../../types/monitoring.types";
import { ModalShell } from "./TrajectoryModal";

export function DynamicPasswordModal({ device, open, onClose }: { device?: MonitoringDevice; open: boolean; onClose: () => void }) {
  const query = useQuery({ queryKey: ["monitoring", "password", device?.id, open], queryFn: () => getDynamicPassword(device?.id ?? ""), enabled: open && Boolean(device) });
  if (!open || !device) return null;
  return (
    <ModalShell title={`Dynamic password - ${device.name}`} onClose={onClose}>
      <div className="rounded border border-slate-200 bg-slate-50 p-4 text-center">
        <div className="text-3xl font-semibold tracking-widest text-slate-950">{query.data?.password ?? "------"}</div>
        <div className="mt-2 text-sm text-slate-500">Expires: {query.data ? new Date(query.data.expiresAt).toLocaleString() : "-"}</div>
      </div>
    </ModalShell>
  );
}
