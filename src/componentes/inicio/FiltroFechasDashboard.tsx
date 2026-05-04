import { CampoTexto } from "../comunes/CampoTexto";

export function FiltroFechasDashboard() {
  return (
    <div className="grid gap-3 rounded-lg border border-slate-200 bg-white p-4 sm:grid-cols-2">
      <CampoTexto etiqueta="Desde" type="date" />
      <CampoTexto etiqueta="Hasta" type="date" />
    </div>
  );
}
