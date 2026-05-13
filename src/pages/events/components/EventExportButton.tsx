import { Download } from "lucide-react";
import { Boton } from "../../../componentes/comunes/Boton";
import { useAppText } from "../../../i18n/text";

export function EventExportButton({ disabled, onExport }: { disabled?: boolean; onExport: () => void }) {
  const tr = useAppText();
  return (
    <Boton variante="secundario" icono={<Download className="h-4 w-4" />} disabled={disabled} onClick={onExport} type="button">
      {tr("Export")}
    </Boton>
  );
}
