import { api, extraerDatos } from "../../../librerias/api";
import type { ApiEnvelope, DeviceCommandRecord } from "../types/control.types";

export interface PresetPayload {
  expirationTime: string;
  serverAddress?: string;
  tcpPort?: string;
  reportInterval?: string;
  heartbeatInterval?: string;
  sealUnsealCmd?: string;
  automaticCardBindingMinutes?: string;
  staticPassword?: string;
  vibrationDetection?: boolean;
  shutdownAfterShacklePullingOut?: boolean;
}

export async function createPreset(deviceIds: string[], payload: PresetPayload) {
  const response = await api.post<ApiEnvelope<{ commands: DeviceCommandRecord[] }>>("/control/preset", { deviceIds, payload });
  return extraerDatos<{ commands: DeviceCommandRecord[] }>(response);
}

export async function createBatchCardBinding(deviceIds: string[], cards: string[], expirationTime: string) {
  const response = await api.post<ApiEnvelope<{ commands: DeviceCommandRecord[] }>>("/control/preset/batch-card-binding", {
    deviceIds,
    cards,
    expirationTime,
  });
  return extraerDatos<{ commands: DeviceCommandRecord[] }>(response);
}
