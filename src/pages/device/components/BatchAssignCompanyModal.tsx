import { useState } from "react";
import { Modal } from "../../../componentes/comunes/Modal";
import type { DeviceOptions } from "../../../types/device.types";

export function BatchAssignCompanyModal({ open, selectedCount, options, busy, onClose, onSubmit }: { open: boolean; selectedCount: number; options?: DeviceOptions; busy?: boolean; onClose: () => void; onSubmit: (companyId: string) => void }) {
  const [companyId, setCompanyId] = useState("");
  return (
    <Modal abierto={open} titulo="Batch assign companies" onCerrar={onClose}>
      <div className="space-y-3">
        <p className="text-sm text-slate-600">Apply to {selectedCount} selected devices.</p>
        <select className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm" value={companyId} onChange={(event) => setCompanyId(event.target.value)}>
          <option value="">Company</option>
          {(options?.companies ?? []).map((company) => <option key={company.id} value={company.id}>{company.name}</option>)}
        </select>
        <div className="flex justify-end gap-2">
          <button type="button" className="rounded-md border border-slate-200 px-4 py-2 text-sm" onClick={onClose}>Cancel</button>
          <button disabled={busy || !companyId} className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-60" onClick={() => onSubmit(companyId)}>Confirm</button>
        </div>
      </div>
    </Modal>
  );
}
