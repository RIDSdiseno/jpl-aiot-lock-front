export interface Alerta {
  id: string;
  severity?: string | null;
  status?: string | null;
  message?: string | null;
  deviceName?: string | null;
  deviceId?: string | null;
  createdAt?: string | null;
}
