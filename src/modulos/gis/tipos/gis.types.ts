import type { DeviceConnectionStatus, DeviceType } from "../../dispositivos/tipos/dispositivo.types";

export interface UbicacionDispositivo {
  id?: string;
  deviceId: string;
  deviceName?: string;
  type?: DeviceType;
  connectionStatus?: DeviceConnectionStatus;
  batteryLevel?: number | null;
  latitude: number;
  longitude: number;
  lastConnectionAt?: string | null;
  createdAt?: string | null;
}
