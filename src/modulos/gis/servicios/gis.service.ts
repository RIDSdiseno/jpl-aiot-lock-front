import { api, extraerDatos } from "../../../librerias/api";
import type { UbicacionDispositivo } from "../tipos/gis.types";

export async function obtenerUbicacionActual(id: string) {
  const respuesta = await api.get<UbicacionDispositivo | { data: UbicacionDispositivo }>(`/devices/${id}/location`);
  return extraerDatos<UbicacionDispositivo>(respuesta);
}

export async function obtenerHistorialUbicaciones(id: string) {
  const respuesta = await api.get<UbicacionDispositivo[] | { data: UbicacionDispositivo[] }>(`/devices/${id}/locations/history`);
  return extraerDatos<UbicacionDispositivo[]>(respuesta) ?? [];
}

export async function obtenerUbicacionesDispositivos() {
  const respuesta = await api.get<UbicacionDispositivo[] | { data: UbicacionDispositivo[] }>("/devices", {
    params: { withLocation: true },
  });
  const datos = extraerDatos<unknown[]>(respuesta) ?? [];
  return datos
    .map((item) => item as Partial<UbicacionDispositivo> & { id?: string; name?: string })
    .filter((item) => typeof item.latitude === "number" && typeof item.longitude === "number")
    .map((item) => ({
      deviceId: item.deviceId ?? item.id ?? "",
      deviceName: item.deviceName ?? item.name,
      type: item.type,
      connectionStatus: item.connectionStatus,
      batteryLevel: item.batteryLevel,
      latitude: item.latitude!,
      longitude: item.longitude!,
      lastConnectionAt: item.lastConnectionAt,
    }));
}
