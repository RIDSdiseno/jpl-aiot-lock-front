import { useState } from "react";
import { Modal } from "../../../componentes/comunes/Modal";
import type { DeviceOptions } from "../../../types/device.types";

export function BatchModifyDeviceModal({ open, selectedCount, options, busy, onClose, onSubmit }: { open: boolean; selectedCount: number; options?: DeviceOptions; busy?: boolean; onClose: () => void; onSubmit: (updates: Record<string, string>) => void }) {
  const [updates, setUpdates] = useState<Record<string, string>>({});
  const inputClass = "w-full rounded-md border border-slate-200 px-3 py-2 text-sm";
  return (
    <Modal abierto={open} titulo="Batch modify device info" onCerrar={onClose}>
      <div className="space-y-3">
        <p className="text-sm text-slate-600">{selectedCount} devices selected. Device ID cannot be modified in batch.</p>
        <select className={inputClass} value={updates.affiliatedCompanyId ?? ""} onChange={(event) => setUpdates({ ...updates, affiliatedCompanyId: event.target.value })}>
          <option value="">Affiliated company</option>
          {(options?.companies ?? []).map((company) => <option key={company.id} value={company.id}>{company.name}</option>)}
        </select>
        <select className={inputClass} value={updates.productModel ?? ""} onChange={(event) => setUpdates({ ...updates, productModel: event.target.value })}>
          <option value="">Product model</option>
          {(options?.productModels ?? []).map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
        <select className={inputClass} value={updates.deviceType ?? ""} onChange={(event) => setUpdates({ ...updates, deviceType: event.target.value })}>
          <option value="">Device type</option>
          {(options?.deviceTypes ?? []).map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
        <select className={inputClass} value={updates.onlineStatus ?? ""} onChange={(event) => setUpdates({ ...updates, onlineStatus: event.target.value })}>
          <option value="">Status manual</option>
          {(options?.statuses ?? []).filter((item) => item !== "DELETED").map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
        <textarea className={`${inputClass} min-h-20`} placeholder="Description" value={updates.description ?? ""} onChange={(event) => setUpdates({ ...updates, description: event.target.value })} />
        <div className="flex justify-end gap-2">
          <button type="button" className="rounded-md border border-slate-200 px-4 py-2 text-sm" onClick={onClose}>Cancel</button>
          <button disabled={busy || Object.values(updates).every((value) => !value)} className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-60" onClick={() => onSubmit(Object.fromEntries(Object.entries(updates).filter(([, value]) => value)))}>
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
}
