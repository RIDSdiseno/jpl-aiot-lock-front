import { useState } from "react";
import { Boton } from "../../../../componentes/comunes/Boton";
import { Modal } from "../../../../componentes/comunes/Modal";

export function AddNfcCardModal({ open, onClose, onSubmit }: { open: boolean; onClose: () => void; onSubmit: (cardNumber: string) => void }) {
  const [cardNumber, setCardNumber] = useState("");

  return (
    <Modal abierto={open} titulo="Add card number" onCerrar={onClose}>
      <div className="space-y-4">
        <input
          value={cardNumber}
          onChange={(event) => setCardNumber(event.target.value)}
          placeholder="Card number"
          className="w-full rounded border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
        />
        <div className="flex justify-end gap-2">
          <Boton type="button" variante="secundario" onClick={onClose}>
            Cancel
          </Boton>
          <Boton
            type="button"
            onClick={() => {
              if (cardNumber.trim()) {
                onSubmit(cardNumber.trim());
                setCardNumber("");
              }
            }}
          >
            Add
          </Boton>
        </div>
      </div>
    </Modal>
  );
}
