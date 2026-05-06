import { api, extraerDatos } from "../../librerias/api";
import type { DeviceFenceQueryType, FenceRecord, GeoFence, GeoFenceInput, GisDevice } from "./types";

export async function listGeoFences(search?: string) {
  const response = await api.get<GeoFence[] | { data: GeoFence[] }>("/gis/geofences", { params: { search } });
  return extraerDatos<GeoFence[]>(response) ?? [];
}

export async function saveGeoFence(input: GeoFenceInput, id?: string) {
  const response = id
    ? await api.patch<GeoFence | { data: GeoFence }>(`/gis/geofences/${id}`, input)
    : await api.post<GeoFence | { data: GeoFence }>("/gis/geofences", input);
  return extraerDatos<GeoFence>(response);
}

export async function deleteGeoFence(id: string) {
  await api.delete(`/gis/geofences/${id}`);
}

export async function batchDeleteGeoFences(ids: string[]) {
  await api.post("/gis/geofences/batch-delete", { ids });
}

export async function sendGeoFences(geoFenceIds: string[], devices: GisDevice[]) {
  const response = await api.post<FenceRecord[] | { data: FenceRecord[] }>("/gis/geofences/send", {
    geoFenceIds,
    devices: devices.map((device) => ({ deviceId: device.deviceId, deviceName: device.name, status: device.status })),
  });
  return extraerDatos<FenceRecord[]>(response) ?? [];
}

export async function listFenceRecords(filters: Record<string, string | undefined>) {
  const response = await api.get<FenceRecord[] | { data: FenceRecord[] }>("/gis/fence-records", { params: filters });
  return extraerDatos<FenceRecord[]>(response) ?? [];
}

export async function resendFenceRecord(id: string) {
  const response = await api.post<FenceRecord | { data: FenceRecord }>(`/gis/fence-records/${id}/resend`);
  return extraerDatos<FenceRecord>(response);
}

export async function stopFenceRecord(id: string) {
  const response = await api.post<FenceRecord | { data: FenceRecord }>(`/gis/fence-records/${id}/stop`);
  return extraerDatos<FenceRecord>(response);
}

export async function deleteFenceRecord(id: string) {
  await api.delete(`/gis/fence-records/${id}`);
}

export async function batchDeleteFenceRecords(ids: string[]) {
  await api.post("/gis/fence-records/batch-delete", { ids });
}

export async function stopSendingFenceRecords(ids: string[]) {
  await api.post("/gis/fence-records/stop-sending", { ids });
}

export async function readDeviceFences(deviceId: string, queryType: DeviceFenceQueryType, blockNumber: number) {
  const response = await api.post<{ resultJson?: unknown } | { data: { resultJson?: unknown } }>(`/gis/devices/${deviceId}/fences/read`, {
    queryType,
    blockNumber,
  });
  return extraerDatos<{ resultJson?: unknown }>(response);
}

export async function listGisDevices() {
  const response = await api.get<{ data?: Array<{ companyId: string; companyName: string; devices: GisDevice[] }>; devices?: GisDevice[] }>("/control/devices");
  const payload = response.data;
  if (payload.devices) return payload.devices;
  return (payload.data ?? []).flatMap((group) =>
    group.devices.map((device) => ({
      ...device,
      companyId: device.companyId ?? group.companyId,
      companyName: device.companyName ?? group.companyName,
      isOnline: device.isOnline ?? device.status === "ONLINE",
    })),
  );
}
