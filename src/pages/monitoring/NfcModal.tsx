import { useQuery } from "@tanstack/react-query";
import { getNfcCards, syncNfcCards } from "../../services/nfc.service";
import type { MonitoringDevice } from "../../types/monitoring.types";
import { ModalShell } from "./TrajectoryModal";

export function NfcModal({ device, open, onClose }: { device?: MonitoringDevice; open: boolean; onClose: () => void }) {
  const query = useQuery({ queryKey: ["monitoring", "nfc", device?.id], queryFn: () => getNfcCards(device?.id ?? ""), enabled: open && Boolean(device) });
  if (!open || !device) return null;
  return (
    <ModalShell title={`NFC - ${device.name}`} onClose={onClose}>
      <div className="space-y-2">
        {(query.data ?? []).map((card) => (
          <div key={card.id} className="flex items-center justify-between rounded border border-slate-200 px-3 py-2 text-sm">
            <div>
              <div className="font-semibold text-slate-900">{card.cardNo}</div>
              <div className="text-xs text-slate-500">{card.holder}</div>
            </div>
            <span className="rounded bg-slate-100 px-2 py-1 text-xs">{card.status}</span>
          </div>
        ))}
      </div>
      <button type="button" onClick={() => void syncNfcCards(device.id).then(() => query.refetch())} className="mt-4 rounded bg-slate-900 px-3 py-2 text-sm font-medium text-white">Sync NFC</button>
    </ModalShell>
  );
}
