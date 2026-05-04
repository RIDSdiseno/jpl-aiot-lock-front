export function formatearPorcentaje(valor?: number | null) {
  if (valor === null || valor === undefined) return "N/D";
  return `${valor}%`;
}

export function formatearTexto(valor?: string | number | null) {
  return valor === null || valor === undefined || valor === "" ? "N/D" : String(valor);
}
