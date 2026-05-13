import { Boton } from "../../../componentes/comunes/Boton";
import { Modal } from "../../../componentes/comunes/Modal";
import { useAppText } from "../../../i18n/text";

export function DeleteConfirmModal({
  open,
  title,
  description,
  loading,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  title: string;
  description: string;
  loading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const tr = useAppText();
  return (
    <Modal abierto={open} titulo={title} onCerrar={onCancel}>
      <div className="space-y-4">
        <p className="text-sm text-slate-600">{description}</p>
        <div className="flex justify-end gap-2">
          <Boton type="button" variante="secundario" onClick={onCancel}>{tr("Cancel")}</Boton>
          <Boton type="button" variante="peligro" disabled={loading} onClick={onConfirm}>{tr("Delete")}</Boton>
        </div>
      </div>
    </Modal>
  );
}
