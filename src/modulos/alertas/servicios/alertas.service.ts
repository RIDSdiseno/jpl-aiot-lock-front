import { api, extraerDatos } from "../../../librerias/api";
import type { Alerta } from "../tipos/alerta.types";

export async function obtenerAlertas() {
  const respuesta = await api.get<Alerta[] | { data: Alerta[] }>("/alerts");
  return extraerDatos<Alerta[]>(respuesta) ?? [];
}

export async function actualizarAlerta(id: string, data: Partial<Alerta>) {
  const respuesta = await api.patch<Alerta | { data: Alerta }>(`/alerts/${id}`, data);
  return extraerDatos<Alerta>(respuesta);
}
