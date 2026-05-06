export type DeviceType = string;

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
  deviceName?: string;
  deviceId?: string;
  internalCode: string;
  serialNumber?: string | null;
  imei?: string | null;
  macAddress?: string | null;
  simNumber?: string | null;
  iccid?: string | null;
  type: DeviceType;
  deviceType?: string;
  productModel?: string;
  affiliatedCompany?: string | null;
  affiliatedCompanyId?: string | null;
  status: DeviceStatus;
  onlineStatus?: string;
  connectionStatus: DeviceConnectionStatus;
  connectionType: DeviceConnectionType;
  batteryLevel?: number | null;
  signalLevel?: number | null;
  signalStrength?: number | null;
  firmwareVersion?: string | null;
  hardwareVersion?: string | null;
  bluetoothName?: string | null;
  lockStatus?: string | null;
  shackleStatus?: string | null;
  lastAddress?: string | null;
  notes?: string | null;
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
  deviceType?: string;
  productModel?: string;
  deviceId?: string;
  deviceName?: string;
  companyId?: string;
  status?: string;
  onlineStatus?: string;
  connectionStatus?: DeviceConnectionStatus | "";
  search?: string;
}

export type EntradaDispositivo = Partial<Omit<Dispositivo, "id" | "createdAt" | "updatedAt">>;
