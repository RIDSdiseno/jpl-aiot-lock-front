import { useState } from "react";
import { useDeviceCommands } from "../../hooks/useDeviceCommands";
import type { MonitoringDevice } from "../../types/monitoring.types";
import { ModalShell } from "./TrajectoryModal";

export function AdvanceCommandModal({ device, open, onClose }: { device?: MonitoringDevice; open: boolean; onClose: () => void }) {
  const [command, setCommand] = useState("REQUEST_STATUS");
  const commands = useDeviceCommands(device?.id);
  if (!open || !device) return null;
  return (
    <ModalShell title={`Advance command - ${device.name}`} onClose={onClose}>
      <label className="block text-sm font-medium text-slate-700">
        Command
        <select value={command} onChange={(event) => setCommand(event.target.value)} className="mt-1 w-full rounded border border-slate-200 px-3 py-2">
          <option>REQUEST_STATUS</option>
          <option>REQUEST_LOCATION</option>
          <option>SYNC</option>
          <option>RESET</option>
        </select>
      </label>
      <button
        type="button"
        onClick={() => commands.advance.mutate({ command })}
        className="mt-4 rounded bg-slate-900 px-3 py-2 text-sm font-medium text-white"
      >
        Send command
      </button>
      {commands.advance.data ? <p className="mt-3 text-sm text-slate-600">{commands.advance.data.message}</p> : null}
    </ModalShell>
  );
}
