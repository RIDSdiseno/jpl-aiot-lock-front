import { Download } from "lucide-react";
import { Boton } from "../../../componentes/comunes/Boton";

export function EventExportButton({ disabled, onExport }: { disabled?: boolean; onExport: () => void }) {
  return (
    <Boton variante="secundario" icono={<Download className="h-4 w-4" />} disabled={disabled} onClick={onExport} type="button">
      Export
    </Boton>
  );
}
