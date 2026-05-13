import { Modal } from "../../../componentes/comunes/Modal";

export function ReportImageModal({ abierto, imageUrl, onCerrar }: { abierto: boolean; imageUrl?: string | null; onCerrar: () => void }) {
  return (
    <Modal abierto={abierto} titulo="Event image" onCerrar={onCerrar}>
      {imageUrl ? <img src={imageUrl} alt="Event evidence" className="max-h-[70vh] w-full rounded-md object-contain" /> : <p className="text-sm text-slate-600">No event image available.</p>}
    </Modal>
  );
}
