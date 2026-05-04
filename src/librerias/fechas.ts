export function formatearFecha(fecha?: string | null) {
  if (!fecha) return "N/D";
  const valor = new Date(fecha);
  if (Number.isNaN(valor.getTime())) return "N/D";
  return new Intl.DateTimeFormat("es-CL", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(valor);
}
