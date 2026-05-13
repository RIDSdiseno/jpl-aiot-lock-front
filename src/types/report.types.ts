export type SortOrder = "ASC" | "DESC";

export interface ReportPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface LockUnlockReportFilters {
  productModel?: string;
  deviceId?: string;
  sealUnsealType?: string;
  startDate?: string;
  endDate?: string;
  dataType?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
}

export interface LockUnlockReportItem {
  id: string;
  sortNo?: number;
  deviceId: string;
  deviceName?: string;
  productModel?: string;
  gpsTime?: string;
  event?: string;
  eventType?: string;
  operatingInfo?: string;
  dataType?: string;
  eventImageUrl?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  operateUser?: string;
  description?: string;
  source?: string;
  rawPayload?: unknown;
  createdAt?: string;
}

export interface ReportListResponse<T> {
  ok: boolean;
  data: T[];
  pagination: ReportPagination;
  filters?: {
    applied: Record<string, unknown>;
  };
}

export interface ReportOptions {
  productModels: string[];
  productTypes: string[];
  operationTypes: string[];
  sealUnsealTypes: string[];
  dataTypes: string[];
  fenceEvents: string[];
  userLogActions: string[];
}
