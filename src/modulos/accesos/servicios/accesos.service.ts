import { api, extraerDatos } from "../../../librerias/api";

export async function obtenerAccesosDispositivo(dispositivoId: string) {
  const respuesta = await api.get<unknown[] | { data: unknown[] }>(`/devices/${dispositivoId}/access`);
  return extraerDatos<unknown[]>(respuesta) ?? [];
}
