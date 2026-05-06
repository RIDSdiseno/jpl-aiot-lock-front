import { api, extraerDatos } from "../../../librerias/api";
import type { Dispositivo, EntradaDispositivo, FiltrosDispositivos } from "../tipos/dispositivo.types";

export async function obtenerDispositivos(filtros?: FiltrosDispositivos) {
  const respuesta = await api.get<Dispositivo[] | { data: Dispositivo[] }>("/devices", { params: filtros });
  return extraerDatos<Dispositivo[]>(respuesta) ?? [];
}

export async function obtenerResumenDispositivos(filtros?: FiltrosDispositivos) {
  const respuesta = await api.get<{ data: { totalNumber: number; totalOnline: number; totalOffline: number; dormantCount: number } }>("/devices/summary", { params: filtros });
  return extraerDatos<{ totalNumber: number; totalOnline: number; totalOffline: number; dormantCount: number }>(respuesta);
}

export async function obtenerDispositivoPorId(id: string) {
  const respuesta = await api.get<Dispositivo | { data: Dispositivo }>(`/devices/${id}`);
  return extraerDatos<Dispositivo>(respuesta);
}

export async function crearDispositivo(data: EntradaDispositivo) {
  const respuesta = await api.post<Dispositivo | { data: Dispositivo }>("/devices", data);
  return extraerDatos<Dispositivo>(respuesta);
}

export async function actualizarDispositivo(id: string, data: EntradaDispositivo) {
  const respuesta = await api.patch<Dispositivo | { data: Dispositivo }>(`/devices/${id}`, data);
  return extraerDatos<Dispositivo>(respuesta);
}

export async function eliminarDispositivo(id: string) {
  const respuesta = await api.delete(`/devices/${id}`);
  return respuesta.data;
}

export async function crearDispositivosPorLote(devices: EntradaDispositivo[]) {
  const respuesta = await api.post("/devices/batch", { devices });
  return respuesta.data;
}

export async function eliminarDispositivosPorLote(deviceIds: string[]) {
  const respuesta = await api.post("/devices/batch-delete", { deviceIds });
  return respuesta.data;
}

export async function modificarDispositivosPorLote(deviceIds: string[], updates: EntradaDispositivo) {
  const respuesta = await api.post("/devices/batch-modify", { deviceIds, updates });
  return respuesta.data;
}

export async function asignarEmpresaPorLote(deviceIds: string[], companyId: string, remarks?: string) {
  const respuesta = await api.post("/devices/batch-assign-company", { deviceIds, companyId, remarks });
  return respuesta.data;
}

export async function guardarPoliticaAlarmaPorLote(payload: {
  deviceIds: string[];
  receivePhones?: string;
  receiveEmails?: string;
  pushTypes: Array<"SMS" | "EMAIL">;
  sendingEventTypes: string[];
  enabled: boolean;
  remarks?: string;
}) {
  const respuesta = await api.post("/devices/batch-alarm-policy", payload);
  return respuesta.data;
}

export async function obtenerEstrategiaAlarma(id: string) {
  const respuesta = await api.get<{ data: unknown[] }>(`/devices/${id}/alarm-strategy`);
  return extraerDatos<unknown[]>(respuesta);
}

export async function exportarDispositivos(deviceIds?: string[], filtros?: FiltrosDispositivos) {
  const respuesta = await api.post("/devices/export", { deviceIds, filters: filtros }, { responseType: "blob" });
  return respuesta.data as Blob;
}
