import { useState } from "react";
import { Modal } from "../../../componentes/comunes/Modal";

export function EventImageModal({ abierto, imageUrl, onCerrar }: { abierto: boolean; imageUrl?: string | null; onCerrar: () => void }) {
  const [failed, setFailed] = useState(false);
  return (
    <Modal abierto={abierto} titulo="Event image" onCerrar={onCerrar}>
      {imageUrl && !failed ? (
        <img className="max-h-[60vh] w-full rounded-md object-contain" src={imageUrl} alt="Event evidence" onError={() => setFailed(true)} />
      ) : (
        <p className="text-sm text-slate-600">Image not available.</p>
      )}
    </Modal>
  );
}
