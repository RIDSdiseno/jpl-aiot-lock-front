export type DeviceStatus = "ONLINE" | "OFFLINE" | "SLEEP" | "DORMANT" | "UNKNOWN" | "DELETED";

export interface Device {
  id: string;
  sortNo?: number;
  deviceName?: string | null;
  name?: string | null;
  deviceId: string;
  imei?: string | null;
  deviceType?: string | null;
  productModel?: string | null;
  affiliatedCompanyId?: string | null;
  affiliatedCompany?: string | null;
  status?: DeviceStatus | string | null;
  onlineStatus?: DeviceStatus | string | null;
  lastSeenAt?: string | null;
  batteryLevel?: number | null;
  signalLevel?: number | null;
  simIccid?: string | null;
  phoneNumber?: string | null;
  firmwareVersion?: string | null;
  hardwareVersion?: string | null;
  description?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export interface DeviceSummary {
  total: number;
  online: number;
  offline: number;
  sleep: number;
  dormant: number;
  totalNumber?: number;
  totalOnline?: number;
  totalOffline?: number;
  dormantCount?: number;
}

export interface DeviceCompanyOption {
  id: string;
  name: string;
}

export interface DeviceOptions {
  deviceTypes: string[];
  productModels: string[];
  statuses: string[];
  companies: DeviceCompanyOption[];
}

export interface DeviceFiltersState {
  deviceType?: string;
  productModel?: string;
  deviceId?: string;
  affiliatedCompanyId?: string;
  deviceName?: string;
  status?: string;
  page: number;
  limit: number;
  sortBy?: "deviceName" | "deviceId" | "status" | "createdAt";
  sortOrder?: "asc" | "desc";
}

export interface DevicePagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface DeviceListResponse {
  data: Device[];
  pagination: DevicePagination;
}

export interface DeviceInput {
  deviceId: string;
  deviceName?: string;
  deviceType: string;
  productModel: string;
  affiliatedCompanyId: string;
  simIccid?: string;
  phoneNumber?: string;
  description?: string;
}

export interface BatchImportResult {
  created: number;
  skipped: number;
  errors: Array<{ row: number; deviceId?: string; message: string }>;
}
