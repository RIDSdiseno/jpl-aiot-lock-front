import { api } from "../librerias/api";
import type {
  DevicesResponse,
  GeofencesResponse,
  MonitoringDevice,
  MonitoringStatusFilter,
} from "../types/monitoring.types";

type DevicesApiResponse = DevicesResponse & { data?: MonitoringDevice[] };
type GeofencesApiResponse = GeofencesResponse & { data?: GeofencesResponse["geofences"] };

function normalizeDevice(device: MonitoringDevice): MonitoringDevice {
  const status = String(device.status).toLowerCase() as MonitoringDevice["status"];
  return { ...device, status };
}

export async function getMonitoringDevices(status: MonitoringStatusFilter = "all", q = "") {
  const response = await api.get<DevicesApiResponse>("/monitoring/devices", {
    params: { status: status === "all" ? undefined : status, q: q || undefined },
  });
  return (response.data.devices ?? response.data.data ?? []).map(normalizeDevice);
}

export async function searchMonitoringDevices(q: string) {
  const response = await api.get<DevicesApiResponse>("/monitoring/devices/search", { params: { q } });
  return (response.data.devices ?? response.data.data ?? []).map(normalizeDevice);
}

export async function getDeviceStatus(deviceId: string) {
  const response = await api.get<{ ok: boolean; data?: DevicesResponse["devices"][number]; device?: DevicesResponse["devices"][number] }>(
    `/monitoring/devices/${deviceId}/status`,
  );
  return normalizeDevice(response.data.device ?? response.data.data!);
}

export async function getDeviceTrajectory(deviceId: string) {
  const response = await api.get("/monitoring/devices/" + deviceId + "/trajectory");
  return response.data.trajectory;
}

export async function getGeoFences(q = "") {
  const response = await api.get<GeofencesApiResponse>("/monitoring/geofences", { params: { q: q || undefined } });
  return response.data.geofences ?? response.data.data ?? [];
}

export async function searchGeoFences(q: string) {
  const response = await api.get<GeofencesApiResponse>("/monitoring/geofences/search", { params: { q } });
  return response.data.geofences ?? response.data.data ?? [];
}
