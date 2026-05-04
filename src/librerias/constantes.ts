import type {
  DeviceConnectionStatus,
  DeviceStatus,
  DeviceType,
} from "../modulos/dispositivos/tipos/dispositivo.types";

export const DEVICE_TYPE_LABELS: Record<DeviceType, string> = {
  SMART_LOCK: "Candado inteligente",
  SMART_SENSOR: "Sensor inteligente",
  GPS_TRACKER: "Rastreador GPS",
  E_SEAL: "Sello electronico",
  SMART_GATEWAY: "Gateway",
  SMART_BOX: "Caja inteligente",
};

export const DEVICE_STATUS_LABELS: Record<DeviceStatus, string> = {
  ACTIVE: "Activo",
  INACTIVE: "Inactivo",
  MAINTENANCE: "Mantenimiento",
  BLOCKED: "Bloqueado",
  DELETED: "Eliminado",
};

export const DEVICE_CONNECTION_STATUS_LABELS: Record<DeviceConnectionStatus, string> = {
  ONLINE: "En linea",
  OFFLINE: "Sin conexion",
  SLEEP: "Reposo",
  LOST_SIGNAL: "Senal perdida",
  UNKNOWN: "Desconocido",
};

export const ALERT_SEVERITY_LABELS: Record<string, string> = {
  LOW: "Baja",
  MEDIUM: "Media",
  HIGH: "Alta",
  CRITICAL: "Critica",
};
