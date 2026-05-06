import { api, extraerDatos } from "../../../librerias/api";
import type { ApiEnvelope, DeviceCommandRecord } from "../types/control.types";

export interface CommandRecordFilters {
  deviceId?: string;
  content?: string;
  type?: string;
  status?: string;
}

export async function getCommandRecords(params: CommandRecordFilters) {
  const response = await api.get<ApiEnvelope<DeviceCommandRecord[]>>("/control/commands", { params });
  return extraerDatos<DeviceCommandRecord[]>(response);
}

export async function cancelCommandRecord(commandId: string) {
  const response = await api.post<ApiEnvelope<DeviceCommandRecord>>(`/control/commands/${commandId}/cancel`);
  return extraerDatos<DeviceCommandRecord>(response);
}
