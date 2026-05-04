export type DeviceType =
  | "SMART_LOCK"
  | "SMART_SENSOR"
  | "GPS_TRACKER"
  | "E_SEAL"
  | "SMART_GATEWAY"
  | "SMART_BOX";

export type DeviceStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "MAINTENANCE"
  | "BLOCKED"
  | "DELETED";

export type DeviceConnectionStatus =
  | "ONLINE"
  | "OFFLINE"
  | "SLEEP"
  | "LOST_SIGNAL"
  | "UNKNOWN";

export type DeviceConnectionType =
  | "IOT"
  | "BLUETOOTH"
  | "LORA"
  | "NB_IOT"
  | "LTE"
  | "WIFI"
  | "API_EXTERNAL"
  | "UNKNOWN";

export interface Dispositivo {
  id: string;
  name: string;
  internalCode: string;
  serialNumber?: string | null;
  imei?: string | null;
  macAddress?: string | null;
  type: DeviceType;
  status: DeviceStatus;
  connectionStatus: DeviceConnectionStatus;
  connectionType: DeviceConnectionType;
  batteryLevel?: number | null;
  signalLevel?: number | null;
  firmwareVersion?: string | null;
  hardwareVersion?: string | null;
  lastConnectionAt?: string | null;
  lastSyncAt?: string | null;
  companyId?: string | null;
  branchId?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface FiltrosDispositivos {
  type?: DeviceType | "";
  status?: DeviceStatus | "";
  connectionStatus?: DeviceConnectionStatus | "";
  search?: string;
}

export type EntradaDispositivo = Partial<Omit<Dispositivo, "id" | "createdAt" | "updatedAt">>;
