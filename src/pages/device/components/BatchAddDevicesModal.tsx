import { useMemo, useState } from "react";
import { Modal } from "../../../componentes/comunes/Modal";
import type { DeviceInput, DeviceOptions } from "../../../types/device.types";

function parseCsv(text: string, options?: DeviceOptions) {
  const rows = text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const seen = new Set<string>();
  return rows.map((line, index) => {
    const [deviceId, deviceName, deviceType, productModel, affiliatedCompany, simIccid, phoneNumber, description] = line.split(",").map((part) => part?.trim() ?? "");
    const company = options?.companies.find((item) => item.id === affiliatedCompany || item.name === affiliatedCompany);
    const errors = [
      !deviceId ? "Device ID required" : "",
      !deviceType ? "Device type required" : "",
      !productModel ? "Product model required" : "",
      !company ? "Affiliated company not found" : "",
      seen.has(deviceId) ? "Duplicate in preview" : "",
    ].filter(Boolean);
    seen.add(deviceId);
    return {
      row: index + 1,
      valid: errors.length === 0,
      errors,
      device: { deviceId, deviceName, deviceType, productModel, affiliatedCompanyId: company?.id ?? "", simIccid, phoneNumber, description } as DeviceInput,
    };
  });
}

export function BatchAddDevicesModal({ open, options, busy, onClose, onSubmit }: { open: boolean; options?: DeviceOptions; busy?: boolean; onClose: () => void; onSubmit: (devices: DeviceInput[]) => void }) {
  const [text, setText] = useState("");
  const preview = useMemo(() => parseCsv(text, options), [text, options]);
  const validRows = preview.filter((row) => row.valid);

  return (
    <Modal abierto={open} titulo="Batch add devices" onCerrar={onClose}>
      <div className="space-y-3">
        <p className="text-sm text-slate-600">CSV columns: deviceId, deviceName, deviceType, productModel, affiliatedCompany, simIccid, phoneNumber, description</p>
        <textarea className="h-40 w-full rounded-md border border-slate-200 p-3 font-mono text-xs" value={text} onChange={(event) => setText(event.target.value)} />
        <div className="rounded-md bg-slate-50 p-3 text-sm text-slate-700">
          Valid rows: {validRows.length} · Rows with error: {preview.length - validRows.length}
        </div>
        {preview.slice(0, 5).map((row) => (
          <div key={row.row} className={`rounded-md border px-3 py-2 text-xs ${row.valid ? "border-emerald-200 text-emerald-700" : "border-red-200 text-red-700"}`}>
            Row {row.row}: {row.valid ? row.device.deviceId : row.errors.join(", ")}
          </div>
        ))}
        <div className="flex justify-end gap-2">
          <button type="button" className="rounded-md border border-slate-200 px-4 py-2 text-sm" onClick={onClose}>Cancel</button>
          <button disabled={busy || validRows.length === 0} className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-60" onClick={() => onSubmit(validRows.map((row) => row.device))}>Confirm</button>
        </div>
      </div>
    </Modal>
  );
}
