export interface ComandoDispositivo {
  id: string;
  deviceId: string;
  type: "OPEN" | "CLOSE" | string;
  status?: string | null;
  createdAt?: string | null;
}
