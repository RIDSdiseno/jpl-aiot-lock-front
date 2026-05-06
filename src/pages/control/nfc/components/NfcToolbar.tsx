import { Plus, Radio, RotateCw, Trash2, UploadCloud } from "lucide-react";
import { Boton } from "../../../../componentes/comunes/Boton";

export function NfcToolbar({
  block,
  onBlockChange,
  onRead,
  onAdd,
  onReserve,
  onClear,
  onSync,
  disabled,
}: {
  block: string;
  onBlockChange: (block: string) => void;
  onRead: () => void;
  onAdd: () => void;
  onReserve: () => void;
  onClear: () => void;
  onSync: () => void;
  disabled?: boolean;
}) {
  return (
    <div className="space-y-3 rounded border border-slate-200 bg-white p-4">
      <div className="flex flex-wrap items-center gap-2">
        <select value={block} onChange={(event) => onBlockChange(event.target.value)} className="rounded border border-slate-200 px-3 py-2 text-sm">
          <option>Block 1</option>
        </select>
        <Boton type="button" variante="secundario" icono={<Radio className="h-4 w-4" />} onClick={onRead} disabled={disabled}>
          Read
        </Boton>
        <Boton type="button" variante="secundario" icono={<Plus className="h-4 w-4" />} onClick={onAdd} disabled={disabled}>
          Add card number
        </Boton>
        <Boton type="button" variante="secundario" icono={<UploadCloud className="h-4 w-4" />} onClick={onReserve} disabled={disabled}>
          Batch Reserve Command
        </Boton>
      </div>
      <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3">
        <span className="mr-auto text-sm text-slate-600">Current writing IC card for {block}.</span>
        <Boton type="button" variante="peligro" icono={<Trash2 className="h-4 w-4" />} onClick={onClear} disabled={disabled}>
          Clear data
        </Boton>
        <Boton type="button" icono={<RotateCw className="h-4 w-4" />} onClick={onSync} disabled={disabled}>
          Sync
        </Boton>
      </div>
    </div>
  );
}
