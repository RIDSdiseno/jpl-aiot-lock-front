import { api, extraerDatos } from "../../../librerias/api";
import type { EventoDispositivo } from "../tipos/evento.types";

export async function obtenerEventos(filtros?: Record<string, string>) {
  const respuesta = await api.get<EventoDispositivo[] | { data: EventoDispositivo[] }>("/events", { params: filtros });
  return extraerDatos<EventoDispositivo[]>(respuesta) ?? [];
}

export async function obtenerEventosDispositivo(id: string) {
  const respuesta = await api.get<EventoDispositivo[] | { data: EventoDispositivo[] }>(`/devices/${id}/events`);
  return extraerDatos<EventoDispositivo[]>(respuesta) ?? [];
}
