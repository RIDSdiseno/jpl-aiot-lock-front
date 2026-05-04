import { Boton } from "./Boton";
import { Modal } from "./Modal";

export function DialogoConfirmacion({
  abierto,
  titulo,
  descripcion,
  onConfirmar,
  onCerrar,
}: {
  abierto: boolean;
  titulo: string;
  descripcion: string;
  onConfirmar: () => void;
  onCerrar: () => void;
}) {
  return (
    <Modal abierto={abierto} titulo={titulo} onCerrar={onCerrar}>
      <p className="text-sm text-slate-600">{descripcion}</p>
      <div className="mt-5 flex justify-end gap-2">
        <Boton variante="secundario" onClick={onCerrar}>Cancelar</Boton>
        <Boton variante="peligro" onClick={onConfirmar}>Confirmar</Boton>
      </div>
    </Modal>
  );
}
