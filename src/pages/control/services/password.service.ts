import { api, extraerDatos } from "../../../librerias/api";
import type { ApiEnvelope, DynamicPasswordResponse } from "../types/control.types";

export async function getDynamicPassword(deviceId: string) {
  const response = await api.get<ApiEnvelope<DynamicPasswordResponse>>(`/control/devices/${deviceId}/dynamic-password`);
  return extraerDatos<DynamicPasswordResponse>(response);
}
