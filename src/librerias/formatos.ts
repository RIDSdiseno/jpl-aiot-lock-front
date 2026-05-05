import { DEVICE_CONNECTION_STATUS_LABELS, DEVICE_TYPE_LABELS } from "./constantes";
import { formatearFecha } from "./fechas";

type ClaveEtiqueta<T> = keyof T;

export function formatearPorcentaje(valor?: number | null) {
  if (valor === null || valor === undefined) return "N/D";
  return `${valor}%`;
}

export function formatearTexto(valor?: string | number | null) {
  return valor === null || valor === undefined || valor === "" ? "N/D" : String(valor);
}

export function formatearFechaHora(fecha?: string | null) {
  return formatearFecha(fecha);
}

export function obtenerLabelTipoDispositivo(tipo?: string | null) {
  if (!tipo) return "N/D";
  return DEVICE_TYPE_LABELS[tipo as ClaveEtiqueta<typeof DEVICE_TYPE_LABELS>] ?? tipo;
}

export function obtenerLabelEstadoConexion(estado?: string | null) {
  if (!estado) return "N/D";
  return DEVICE_CONNECTION_STATUS_LABELS[estado as ClaveEtiqueta<typeof DEVICE_CONNECTION_STATUS_LABELS>] ?? estado;
}
