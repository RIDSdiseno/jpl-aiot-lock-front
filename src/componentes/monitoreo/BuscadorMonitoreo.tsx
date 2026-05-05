import { Search } from "lucide-react";
import { useEffect, useState } from "react";

export function BuscadorMonitoreo({
  valor,
  onCambiar,
}: {
  valor: string;
  onCambiar: (valor: string) => void;
}) {
  const [texto, setTexto] = useState(valor);

  useEffect(() => setTexto(valor), [valor]);

  useEffect(() => {
    const timeout = window.setTimeout(() => onCambiar(texto), 300);
    return () => window.clearTimeout(timeout);
  }, [onCambiar, texto]);

  return (
    <label className="relative block">
      <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
      <input
        value={texto}
        onChange={(event) => setTexto(event.target.value)}
        placeholder="Empresa / Informacion del dispositivo"
        className="h-9 w-full rounded border border-slate-300 bg-white pl-9 pr-3 text-xs outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </label>
  );
}
