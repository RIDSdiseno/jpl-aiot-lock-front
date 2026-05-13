import { useState } from "react";

export function ParameterReserveCommandModal({
  open,
  title,
  deviceLabel,
  onClose,
  onConfirm,
}: {
  open: boolean;
  title: string;
  deviceLabel?: string;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const [reservedFor, setReservedFor] = useState("");
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
      <div className="w-full max-w-md rounded border border-slate-200 bg-white shadow-xl">
        <div className="border-b border-slate-100 px-4 py-3">
          <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
        </div>
        <div className="space-y-3 p-4 text-sm">
          <div className="rounded bg-slate-50 px-3 py-2 text-slate-600">{deviceLabel ?? "No device selected"}</div>
          <label className="block space-y-1">
            <span className="text-xs font-medium text-slate-600">Reservation time</span>
            <input
              type="datetime-local"
              value={reservedFor}
              onChange={(event) => setReservedFor(event.target.value)}
              className="w-full rounded border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
            />
          </label>
        </div>
        <div className="flex justify-end gap-2 border-t border-slate-100 px-4 py-3">
          <button type="button" onClick={onClose} className="rounded border border-slate-200 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50">
            Cancel
          </button>
          <button type="button" onClick={onConfirm} className="rounded bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700">
            Save reservation
          </button>
        </div>
      </div>
    </div>
  );
}
