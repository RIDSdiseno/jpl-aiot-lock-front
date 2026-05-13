import type { DeviceCommandRecord, DeviceParameterField } from "../pages/control/types/control.types";

export type ParameterStatus = "SUCCESS" | "FAILED" | "PENDING" | "OFFLINE";

export interface ParameterCategory {
  key: string;
  label: string;
}

export interface ParameterSchemaResponse {
  categories: ParameterCategory[];
  parameters: DeviceParameterField[];
}

export interface ParameterLatestResponse {
  deviceId: string;
  readAt: string | null;
  parameters: Record<string, DeviceParameterField[]>;
  lastSnapshot?: ParameterSnapshot | null;
}

export interface ParameterReadResponse {
  ok?: boolean;
  status: ParameterStatus;
  message?: string;
  data?: {
    deviceId: string;
    readAt: string;
    parameters: Record<string, DeviceParameterField[]>;
  };
  lastSnapshot?: ParameterSnapshot | null;
  deviceId?: string;
  readTime?: string;
  fields?: DeviceParameterField[];
}

export interface ParameterUpdateInput {
  key: string;
  value: string | number | boolean | null;
}

export interface ParameterUpdateResponse {
  ok?: boolean;
  status: ParameterStatus;
  message?: string;
  commandId?: string;
  data?: { commandId?: string; updatedParameters?: ParameterUpdateInput[] };
  fields?: DeviceParameterField[];
  lastSnapshot?: ParameterSnapshot | null;
}

export interface ParameterSnapshot {
  id: string;
  deviceId: string;
  source: string;
  parameters: Record<string, DeviceParameterField[]>;
  readAt: string;
  createdAt: string;
}

export interface ParameterHistoryResponse {
  snapshots: ParameterSnapshot[];
  commands: DeviceCommandRecord[];
}
