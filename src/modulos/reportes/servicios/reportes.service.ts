import { api, extraerDatos } from "../../../librerias/api";

export async function obtenerReportes() {
  const respuesta = await api.get<unknown[] | { data: unknown[] }>("/reports");
  return extraerDatos<unknown[]>(respuesta) ?? [];
}
