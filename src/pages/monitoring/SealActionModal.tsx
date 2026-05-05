import { useDeviceCommands } from "../../hooks/useDeviceCommands";
import type { MonitoringDevice } from "../../types/monitoring.types";
import { ModalShell } from "./TrajectoryModal";

export function SealActionModal({
  device,
  open,
  mode,
  onClose,
}: {
  device?: MonitoringDevice;
  open: boolean;
  mode: "seal" | "unseal";
  onClose: () => void;
}) {
  const commands = useDeviceCommands(device?.id);
  if (!open || !device) return null;
  const mutation = mode === "seal" ? commands.seal : commands.unseal;
  return (
    <ModalShell title={`${mode === "seal" ? "Seal" : "Unseal"} - ${device.name}`} onClose={onClose}>
      <p className="text-sm text-slate-600">Direct commands are queued automatically when the device is offline.</p>
      <button type="button" onClick={() => mutation.mutate()} className="mt-4 rounded bg-slate-900 px-3 py-2 text-sm font-medium text-white">
        Confirm {mode}
      </button>
      {mutation.data ? <p className="mt-3 text-sm text-slate-600">{mutation.data.message}</p> : null}
      {mutation.error ? <p className="mt-3 text-sm text-rose-600">{mutation.error.message}</p> : null}
    </ModalShell>
  );
}
