export type GeoFenceType = "POLYGON" | "CIRCLE";
export type GeoFenceStatus = "DRAFT" | "ACTIVE" | "SENT" | "FAILED" | "INACTIVE";
export type FenceRuleType =
  | "TOUCHING_SEAL"
  | "PASSWORD_SEAL_UNSEAL"
  | "CARD_SEAL_UNSEAL"
  | "TIMING_UNSEAL"
  | "SMS_SEAL_UNSEAL"
  | "BLE_SEAL_UNSEAL"
  | "REMOTE_SEAL_UNSEAL";
export type FenceSendStatus = "PENDING" | "SENDING" | "SENT" | "FAILED" | "STOPPED" | "PARTIAL";
export type DeviceFenceQueryType = "CIRCLE_FENCE_LIST" | "POLYGON_FENCE_LIST" | "FENCE_RULE_LIST";

export interface LatLngPoint {
  lat: number;
  lng: number;
}

export interface GeoFenceGeometry {
  center?: LatLngPoint;
  radiusMeters?: number;
  points?: LatLngPoint[];
}

export interface GeoFenceRule {
  ruleType: FenceRuleType;
  enabled: boolean;
  value?: string;
  startTime?: string;
  endTime?: string;
  expiresAt?: string;
  description?: string;
}

export interface GeoFence {
  id: string;
  name: string;
  type: GeoFenceType;
  status: GeoFenceStatus;
  geometryJson: GeoFenceGeometry;
  rulesJson: GeoFenceRule[];
  centerLat?: number | null;
  centerLng?: number | null;
  radiusMeters?: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface GeoFenceInput {
  name: string;
  type: GeoFenceType;
  status?: GeoFenceStatus;
  geometry: GeoFenceGeometry;
  rules: GeoFenceRule[];
}

export interface GisDevice {
  id: string;
  deviceId: string;
  name: string;
  companyId: string;
  companyName: string;
  status: string;
  isOnline: boolean;
}

export interface FenceRecord {
  id: string;
  geoFenceId: string;
  deviceId: string;
  deviceName?: string | null;
  status: FenceSendStatus;
  progress: number;
  polygonFenceCount: number;
  circleFenceCount: number;
  fenceRuleCount: number;
  createdAt: string;
  updatedAt: string;
}
