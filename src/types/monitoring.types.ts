export type MonitoringStatus = "online" | "offline" | "alarm";
export type MonitoringStatusFilter = "all" | "online" | "offline" | "alarm";

export interface MonitoringDevice {
  id: string;
  deviceId: string;
  name: string;
  companyId: string;
  companyName: string;
  status: MonitoringStatus;
  battery: number;
  signal: number;
  latitude: number;
  longitude: number;
  connectionMode: string;
  deviceStatus: string;
  speed: number;
  sim: string;
  lockStatus: "sealed" | "unsealed";
  shackleStatus: "closed" | "open";
  alarmStatus: string;
  events: string[];
  positioningTime: string;
  location: string;
  lastSeenAt: string;
}

export interface MonitoringGeoFence {
  id: string;
  name: string;
  companyId: string;
  companyName: string;
  type: "circle";
  centerLat: number;
  centerLng: number;
  radiusMt: number;
  isActive: boolean;
}

export interface MonitoringTrajectoryPoint {
  latitude: number;
  longitude: number;
  speed: number;
  recordedAt: string;
}

export interface DeviceCommandResult {
  commandId: string;
  deviceId: string;
  command: string;
  status: string;
  queued: boolean;
  message: string;
  createdAt: string;
}

export interface DeviceParameters {
  heartbeatSeconds: number;
  gpsIntervalSeconds: number;
  overspeedLimitKmh: number;
  alarmEnabled: boolean;
}

export interface DynamicPassword {
  deviceId: string;
  password: string;
  expiresAt: string;
}

export interface NfcCard {
  id: string;
  cardNo: string;
  holder: string;
  status: "active" | "inactive";
  syncedAt?: string | null;
}

export interface DevicesResponse {
  ok: boolean;
  devices: MonitoringDevice[];
}

export interface GeofencesResponse {
  ok: boolean;
  geofences: MonitoringGeoFence[];
}
