import { Modal } from "../../../componentes/comunes/Modal";

export function DeleteDeviceConfirmModal({ open, title, busy, onClose, onConfirm }: { open: boolean; title: string; busy?: boolean; onClose: () => void; onConfirm: () => void }) {
  return (
    <Modal abierto={open} titulo={title} onCerrar={onClose}>
      <div className="space-y-4">
        <p className="text-sm text-slate-700">This action will remove selected devices from active inventory.</p>
        <div className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
          Devices are soft deleted so audit history can be preserved.
        </div>
        <div className="flex justify-end gap-2">
          <button type="button" className="rounded-md border border-slate-200 px-4 py-2 text-sm" onClick={onClose}>Cancel</button>
          <button disabled={busy} className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-60" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </Modal>
  );
}
