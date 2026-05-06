import { Boton } from "../../../../componentes/comunes/Boton";
import { Modal } from "../../../../componentes/comunes/Modal";

export function ClearNfcConfirmModal({ open, onClose, onConfirm }: { open: boolean; onClose: () => void; onConfirm: () => void }) {
  return (
    <Modal abierto={open} titulo="Clear NFC data" onCerrar={onClose}>
      <div className="space-y-4">
        <p className="text-sm text-slate-600">This action clears the mock NFC card list for the selected device.</p>
        <div className="flex justify-end gap-2">
          <Boton type="button" variante="secundario" onClick={onClose}>
            Cancel
          </Boton>
          <Boton type="button" variante="peligro" onClick={onConfirm}>
            Clear data
          </Boton>
        </div>
      </div>
    </Modal>
  );
}
