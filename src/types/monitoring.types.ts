export type MonitoringStatus = "online" | "offline" | "alarm";
export type MonitoringStatusFilter = "all" | "online" | "offline" | "alarm";
export type MonitoringDeviceStatus = "ONLINE" | "OFFLINE" | "ALARM";

export interface MonitoringDevice {
  id: string;
  deviceId: string;
  name: string;
  companyId: string;
  companyName: string;
  status: MonitoringStatus;
  isOnline?: boolean;
  hasActiveAlarm?: boolean;
  alarmType?: string | null;
  model?: string;
  type?: string;
  battery: number;
  signal: number;
  batteryLevel?: number;
  signalLevel?: number;
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
  lastConnectionAt?: string;
  lastPositioningAt?: string;
}

export interface MonitoringCompanyGroup {
  companyId: string;
  companyName: string;
  devices: MonitoringDevice[];
}

export interface MonitoringGeoFence {
  id: string;
  name: string;
  companyId?: string;
  companyName?: string;
  type?: "circle";
  shapeType?: "CIRCLE" | "POLYGON";
  centerLat?: number;
  centerLng?: number;
  radiusMt?: number;
  radiusMeters?: number;
  coordinates?: Array<{ lat: number; lng: number }>;
  isActive?: boolean;
  status?: "ACTIVE" | "INACTIVE";
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
  devices?: MonitoringDevice[];
  data?: MonitoringDevice[] | MonitoringCompanyGroup[];
}

export interface GeofencesResponse {
  ok: boolean;
  geofences?: MonitoringGeoFence[];
  data?: MonitoringGeoFence[];
}
