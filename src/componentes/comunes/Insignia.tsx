interface InsigniaProps {
  children: string;
  tono?: "verde" | "rojo" | "amarillo" | "azul" | "gris";
}

const tonos = {
  verde: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  rojo: "bg-red-50 text-red-700 ring-red-100",
  amarillo: "bg-amber-50 text-amber-700 ring-amber-100",
  azul: "bg-blue-50 text-blue-700 ring-blue-100",
  gris: "bg-slate-100 text-slate-700 ring-slate-200",
};

export function Insignia({ children, tono = "gris" }: InsigniaProps) {
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${tonos[tono]}`}>{children}</span>;
}
