import { api, extraerDatos } from "../../../librerias/api";
import type { ComandoDispositivo } from "../tipos/comando.types";

export async function abrirDispositivo(id: string) {
  const respuesta = await api.post<ComandoDispositivo | { data: ComandoDispositivo }>(`/devices/${id}/commands/open`);
  return extraerDatos<ComandoDispositivo>(respuesta);
}

export async function cerrarDispositivo(id: string) {
  const respuesta = await api.post<ComandoDispositivo | { data: ComandoDispositivo }>(`/devices/${id}/commands/close`);
  return extraerDatos<ComandoDispositivo>(respuesta);
}

export async function obtenerComandosDispositivo(id: string) {
  const respuesta = await api.get<ComandoDispositivo[] | { data: ComandoDispositivo[] }>(`/devices/${id}/commands`);
  return extraerDatos<ComandoDispositivo[]>(respuesta) ?? [];
}
