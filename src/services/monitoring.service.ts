import { api } from "../librerias/api";
import type {
  DevicesResponse,
  GeofencesResponse,
  MonitoringCompanyGroup,
  MonitoringDevice,
  MonitoringGeoFence,
  MonitoringStatusFilter,
} from "../types/monitoring.types";

type DevicesApiResponse = DevicesResponse;
type GeofencesApiResponse = GeofencesResponse;

function isCompanyGroup(value: MonitoringDevice | MonitoringCompanyGroup): value is MonitoringCompanyGroup {
  return "devices" in value && Array.isArray(value.devices);
}

function flattenDevices(payload?: MonitoringDevice[] | MonitoringCompanyGroup[]) {
  if (!payload) return [];
  return payload.flatMap((item) => (isCompanyGroup(item) ? item.devices : item));
}

function normalizeDevice(device: MonitoringDevice): MonitoringDevice {
  const hasActiveAlarm = Boolean(device.hasActiveAlarm) || String(device.status).toUpperCase() === "ALARM";
  const status = hasActiveAlarm
    ? "alarm"
    : String(device.status).toUpperCase() === "ONLINE" || device.isOnline
      ? "online"
      : "offline";
  const latitude = Number(device.latitude ?? 22.68808);
  const longitude = Number(device.longitude ?? 113.797646);

  return {
    ...device,
    name: device.name || device.deviceId,
    companyId: device.companyId || "demo",
    companyName: device.companyName || "DEMO",
    status,
    battery: Number(device.battery ?? device.batteryLevel ?? 0),
    signal: Number(device.signal ?? device.signalLevel ?? 0),
    latitude,
    longitude,
    connectionMode: device.connectionMode ?? "LTE",
    deviceStatus: device.deviceStatus ?? (status === "online" ? "Active" : status === "alarm" ? "Alarm" : "Offline"),
    speed: Number(device.speed ?? 0),
    sim: device.sim ?? "N/A",
    lockStatus: device.lockStatus ?? "sealed",
    shackleStatus: device.shackleStatus ?? "closed",
    alarmStatus: device.alarmStatus ?? device.alarmType ?? "Normal",
    events: device.events ?? [],
    positioningTime: device.positioningTime ?? device.lastPositioningAt ?? device.lastSeenAt ?? "",
    location: device.location ?? `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
    lastSeenAt: device.lastSeenAt ?? device.lastConnectionAt ?? device.lastPositioningAt ?? "",
  };
}

function normalizeGeofence(geofence: MonitoringGeoFence): MonitoringGeoFence {
  return {
    ...geofence,
    companyId: geofence.companyId ?? "demo",
    companyName: geofence.companyName ?? "DEMO",
    type: geofence.type ?? "circle",
    centerLat: geofence.centerLat ?? 22.68808,
    centerLng: geofence.centerLng ?? 113.797646,
    radiusMt: geofence.radiusMt ?? geofence.radiusMeters ?? 500,
    isActive: geofence.isActive ?? geofence.status === "ACTIVE",
  };
}

export async function getMonitoringDevices(status: MonitoringStatusFilter = "all", q = "") {
  const response = await api.get<DevicesApiResponse>("/monitoring/devices", {
    params: { status: status === "all" ? undefined : status, q: q || undefined },
  });
  return flattenDevices(response.data.devices ?? response.data.data).map(normalizeDevice);
}

export async function searchMonitoringDevices(q: string) {
  const response = await api.get<DevicesApiResponse>("/monitoring/devices/search", { params: { q } });
  return flattenDevices(response.data.devices ?? response.data.data).map(normalizeDevice);
}

export async function getDeviceStatus(deviceId: string) {
  const response = await api.get<{ ok: boolean; data?: MonitoringDevice; device?: MonitoringDevice }>(
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
  return (response.data.geofences ?? response.data.data ?? []).map(normalizeGeofence);
}

export async function searchGeoFences(q: string) {
  const response = await api.get<GeofencesApiResponse>("/monitoring/geofences/search", { params: { q } });
  return (response.data.geofences ?? response.data.data ?? []).map(normalizeGeofence);
}
