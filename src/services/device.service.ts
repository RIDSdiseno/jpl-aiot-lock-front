import { api } from "../librerias/api";
import type {
  BatchImportResult,
  Device,
  DeviceFiltersState,
  DeviceInput,
  DeviceListResponse,
  DeviceOptions,
  DeviceSummary,
} from "../types/device.types";

interface ApiEnvelope<T> {
  ok: boolean;
  message?: string;
  data: T;
  pagination?: DeviceListResponse["pagination"];
}

function paramsFromFilters(filters: DeviceFiltersState) {
  return Object.fromEntries(
    Object.entries(filters).filter(([, value]) => value !== undefined && value !== null && value !== ""),
  );
}

export async function fetchDevices(filters: DeviceFiltersState): Promise<DeviceListResponse> {
  const response = await api.get<ApiEnvelope<Device[]>>("/devices", { params: paramsFromFilters(filters) });
  return {
    data: response.data.data ?? [],
    pagination: response.data.pagination ?? { page: filters.page, limit: filters.limit, total: 0, totalPages: 0 },
  };
}

export async function fetchDeviceSummary(filters: DeviceFiltersState): Promise<DeviceSummary> {
  const response = await api.get<ApiEnvelope<DeviceSummary>>("/devices/summary", { params: paramsFromFilters(filters) });
  return response.data.data;
}

export async function fetchDeviceOptions(): Promise<DeviceOptions> {
  const response = await api.get<ApiEnvelope<DeviceOptions>>("/devices/options");
  return response.data.data;
}

export async function fetchDeviceDetail(id: string): Promise<Device> {
  const response = await api.get<ApiEnvelope<Device>>(`/devices/${id}`);
  return response.data.data;
}

export async function fetchSlaveDevices(id: string): Promise<Device[]> {
  const response = await api.get<ApiEnvelope<Device[]>>(`/devices/${id}/slaves`);
  return response.data.data ?? [];
}

export async function createDevice(payload: DeviceInput) {
  const response = await api.post<ApiEnvelope<{ id: string }>>("/devices", payload);
  return response.data;
}

export async function updateDevice(id: string, payload: Partial<DeviceInput>) {
  const response = await api.patch<ApiEnvelope<Device>>(`/devices/${id}`, payload);
  return response.data;
}

export async function batchCreateDevices(devices: DeviceInput[]): Promise<BatchImportResult> {
  const response = await api.post<ApiEnvelope<BatchImportResult>>("/devices/batch", { devices });
  return response.data.data;
}

export async function batchModifyDevices(deviceIds: string[], updates: Partial<DeviceInput & { onlineStatus: string }>) {
  const response = await api.patch<ApiEnvelope<{ updated: number }>>("/devices/batch", { deviceIds, updates });
  return response.data.data;
}

export async function batchAssignCompany(deviceIds: string[], companyId: string) {
  const response = await api.patch<ApiEnvelope<{ assigned: number }>>("/devices/batch/assign-company", { deviceIds, companyId });
  return response.data.data;
}

export async function deleteDevice(id: string) {
  const response = await api.delete<ApiEnvelope<{ deleted: number }>>(`/devices/${id}`);
  return response.data.data;
}

export async function batchDeleteDevices(deviceIds: string[]) {
  const response = await api.delete<ApiEnvelope<{ deleted: number }>>("/devices/batch", { data: { deviceIds } });
  return response.data.data;
}

export async function exportDevices(filters: DeviceFiltersState) {
  const response = await api.get("/devices/export", { params: paramsFromFilters(filters), responseType: "blob" });
  return response.data as Blob;
}
