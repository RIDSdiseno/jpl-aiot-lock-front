export type EventSeverity = "INFO" | "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export type DeviceEventType =
  | "LOCK"
  | "UNLOCK"
  | "SEAL"
  | "UNSEAL"
  | "ALARM"
  | "LOW_BATTERY"
  | "CUT"
  | "DISMANTLE"
  | "GEOFENCE_ENTER"
  | "GEOFENCE_EXIT"
  | "DEVICE_ONLINE"
  | "DEVICE_OFFLINE"
  | "PARAMETER_UPDATE"
  | "NFC_USED"
  | "PASSWORD_USED"
  | "COMMAND_EXECUTED"
  | "UNKNOWN";

export interface DeviceEventItem {
  id: string;
  sortNo?: number;
  deviceId: string;
  deviceName?: string;
  productModel?: string;
  gpsTime?: string;
  batteryLevel?: number;
  eventName?: string;
  events?: string;
  eventType: DeviceEventType | string;
  lockStatus?: string;
  dataType?: string;
  latitude?: number;
  longitude?: number;
  locationText?: string;
  eventImageUrl?: string | null;
  description?: string;
  source?: string;
  operatingInfo?: string;
  severity?: EventSeverity;
  rawPayload?: unknown;
  createdAt: string;
}

export interface AlarmEventItem {
  id: string;
  eventId?: string;
  sortNo?: number;
  deviceId: string;
  deviceName?: string;
  productModel?: string;
  gpsTime?: string;
  batteryLevel?: number;
  alarmType: string;
  alarmEvent?: string;
  alarmLevel: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  alarmReason?: string;
  operatingInfo?: string;
  lockStatus?: string;
  dataType?: string;
  latitude?: number;
  longitude?: number;
  locationText?: string;
  eventImageUrl?: string | null;
  description?: string;
  status: "NEW" | "REVIEWED" | "RESOLVED" | "DISMISSED";
  severity?: EventSeverity;
  handledStatus?: "NEW" | "REVIEWED" | "RESOLVED" | "DISMISSED";
  rawPayload?: unknown;
  createdAt: string;
}

export interface PushEventItem {
  id: string;
  sortNo?: number;
  deviceId: string;
  affiliatedCompany: string;
  pushType: "E-mail" | "App Push" | "SMS" | "Webhook" | string;
  sendingEventType: string;
  sendTo: string;
  sendingStatus: "PENDING" | "SENT" | "FAILED" | "RETRYING" | "UNKNOWN" | string;
  sendingContent: string;
  sendTime: string;
  createdAt: string;
}

export interface EventQueryParams {
  productModel?: string;
  deviceId?: string;
  gpsTimeFrom?: string;
  gpsTimeTo?: string;
  startDate?: string;
  endDate?: string;
  eventType?: string;
  alarmType?: string;
  alarmEvent?: string;
  dataType?: string;
  affiliatedCompany?: string;
  sendTimeFrom?: string;
  sendTimeTo?: string;
  pushType?: string;
  sendingStatus?: string;
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
  page?: number;
  pageSize?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface EventOptions {
  productModels: string[];
  eventTypes: string[];
  alarmTypes: string[];
  dataTypes: string[];
  lockStatuses: string[];
  pushTypes: string[];
  pushStatuses: string[];
}
