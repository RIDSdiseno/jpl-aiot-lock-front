import { api, extraerDatos } from "../../../librerias/api";
import type { Dispositivo, EntradaDispositivo, FiltrosDispositivos } from "../tipos/dispositivo.types";

export async function obtenerDispositivos(filtros?: FiltrosDispositivos) {
  const respuesta = await api.get<Dispositivo[] | { data: Dispositivo[] }>("/devices", { params: filtros });
  return extraerDatos<Dispositivo[]>(respuesta) ?? [];
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
