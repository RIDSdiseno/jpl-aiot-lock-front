import { api, extraerDatos } from "../../../librerias/api";

export async function obtenerMantenimiento() {
  const respuesta = await api.get<unknown[] | { data: unknown[] }>("/maintenance");
  return extraerDatos<unknown[]>(respuesta) ?? [];
}
