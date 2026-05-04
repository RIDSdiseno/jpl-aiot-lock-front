export function EstadoCarga({ texto = "Cargando información..." }: { texto?: string }) {
  return <div className="rounded-lg border border-slate-200 bg-white p-6 text-sm text-slate-500">{texto}</div>;
}
