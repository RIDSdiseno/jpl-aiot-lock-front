import { api, extraerDatos } from "../../../librerias/api";

export async function obtenerHistorial() {
  const respuesta = await api.get<unknown[] | { data: unknown[] }>("/history");
  return extraerDatos<unknown[]>(respuesta) ?? [];
}
