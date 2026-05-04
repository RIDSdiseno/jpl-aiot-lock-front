export interface EventoDispositivo {
  id: string;
  deviceId?: string | null;
  deviceName?: string | null;
  type?: string | null;
  message?: string | null;
  userName?: string | null;
  batteryLevel?: number | null;
  signalLevel?: number | null;
  createdAt?: string | null;
}
