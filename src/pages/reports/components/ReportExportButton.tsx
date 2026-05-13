import { Download } from "lucide-react";
import { Boton } from "../../../componentes/comunes/Boton";

export function ReportExportButton({ onExport }: { onExport: () => void }) {
  return <Boton variante="secundario" icono={<Download className="h-4 w-4" />} onClick={onExport} type="button">Export</Boton>;
}
