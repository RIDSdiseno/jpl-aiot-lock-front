import { api } from "../librerias/api";
import type { DeviceCommandResult, DeviceParameters, DynamicPassword } from "../types/monitoring.types";

export function sendSealCommand(deviceId: string) {
  return api
    .post<{ ok: boolean; command: DeviceCommandResult }>(`/monitoring/devices/${deviceId}/commands/seal`)
    .then((response) => response.data.command);
}

export function sendUnsealCommand(deviceId: string) {
  return api
    .post<{ ok: boolean; command: DeviceCommandResult }>(`/monitoring/devices/${deviceId}/commands/unseal`)
    .then((response) => response.data.command);
}

export function sendAdvanceCommand(deviceId: string, payload: Record<string, unknown>) {
  return api
    .post<{ ok: boolean; command: DeviceCommandResult }>(`/monitoring/devices/${deviceId}/commands/advance`, payload)
    .then((response) => response.data.command);
}

export function getDeviceParameters(deviceId: string) {
  return api
    .get<{ ok: boolean; parameters: DeviceParameters }>(`/monitoring/devices/${deviceId}/parameters`)
    .then((response) => response.data.parameters);
}

export function readDeviceParameters(deviceId: string) {
  return api
    .post<{ ok: boolean; parameters: DeviceParameters }>(`/monitoring/devices/${deviceId}/parameters/read`)
    .then((response) => response.data.parameters);
}

export function updateDeviceParameters(deviceId: string, parameters: Partial<DeviceParameters>) {
  return api
    .patch<{ ok: boolean; parameters: DeviceParameters }>(`/monitoring/devices/${deviceId}/parameters`, parameters)
    .then((response) => response.data.parameters);
}

export function getDynamicPassword(deviceId: string) {
  return api
    .get<{ ok: boolean; dynamicPassword: DynamicPassword }>(`/monitoring/devices/${deviceId}/dynamic-password`)
    .then((response) => response.data.dynamicPassword);
}
