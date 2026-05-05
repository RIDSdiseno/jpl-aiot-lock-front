import { api } from "../librerias/api";
import type { GeofencesResponse } from "../types/monitoring.types";

export function getDeviceGeoFences(deviceId: string) {
  return api
    .get<GeofencesResponse>(`/monitoring/devices/${deviceId}/geofences`)
    .then((response) => response.data.geofences);
}

export function syncDeviceGeoFence(deviceId: string, geofenceId: string) {
  return api
    .post<{ ok: boolean; sync: { deviceId: string; geofenceId: string; syncedAt: string } }>(
      `/monitoring/devices/${deviceId}/geofences/${geofenceId}/sync`,
    )
    .then((response) => response.data.sync);
}
