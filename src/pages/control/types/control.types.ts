export type ControlDeviceStatus = "ONLINE" | "OFFLINE" | "SLEEP" | "ALARM";
export type ControlStatusFilter = "all" | "online" | "offline" | "sleep";

export interface ControlDevice {
  id: string;
  deviceId: string;
  name?: string;
  companyId: string;
  companyName: string;
  model?: string;
  type?: string;
  status: ControlDeviceStatus;
  isOnline: boolean;
  isSleep?: boolean;
  hasActiveAlarm: boolean;
  alarmType?: string | null;
  selected?: boolean;
}

export interface ControlCompanyGroup {
  companyId: string;
  companyName: string;
  devices: ControlDevice[];
}

export interface NfcCardItem {
  id: string;
  deviceId: string;
  cardNumber: string;
  blockNumber?: string;
  status: "ACTIVE" | "PENDING_SYNC" | "REMOVED";
  syncedAt?: string;
}

export interface DynamicPasswordResponse {
  deviceId: string;
  hasPassword: boolean;
  password?: string;
  generatedAt?: string;
  warning: string;
}

export type DeviceCommandStatus =
  | "PENDING"
  | "RESERVED"
  | "SENT"
  | "RECEIVED"
  | "EXECUTED"
  | "FAILED"
  | "CANCELLED"
  | "EXPIRED";

export interface DeviceCommandRecord {
  id: string;
  sortNo?: number;
  deviceId: string;
  commandContent?: string;
  commandType: string;
  status: DeviceCommandStatus;
  executionTime?: string;
  responseContent?: string;
  submittedReservedCommand?: boolean;
  operator?: string;
  createdAt: string;
}

export interface DeviceParameterCategory {
  key: string;
  label: string;
}

export interface DeviceParameterField {
  key: string;
  label: string;
  value?: string;
  placeholder?: string;
  sensitive?: boolean;
  category: string;
}

export interface ApiEnvelope<T> {
  ok: boolean;
  data: T;
}
