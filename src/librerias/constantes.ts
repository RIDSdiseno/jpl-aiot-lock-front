import type {
  DeviceConnectionStatus,
  DeviceStatus,
  DeviceType,
} from "../modulos/dispositivos/tipos/dispositivo.types";

export const DEVICE_TYPE_LABELS: Record<DeviceType, string> = {
  SMART_LOCK: "Candado inteligente",
  SMART_SENSOR: "Sensor inteligente",
  GPS_TRACKER: "Rastreador GPS",
  E_SEAL: "Sello electrónico",
  SMART_GATEWAY: "Gateway inteligente",
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
  ONLINE: "En línea",
  OFFLINE: "Sin conexión",
  SLEEP: "Reposo",
  LOST_SIGNAL: "Señal perdida",
  UNKNOWN: "Desconocido",
};

export const MONITORING_STATUS_LABELS = {
  ALL: "Todos",
  ONLINE: "En línea",
  OFFLINE: "Sin conexión",
  SLEEP: "Reposo",
  LOST_SIGNAL: "Señal perdida",
  UNKNOWN: "Desconocido",
  ALARM: "Alarma",
} as const;

export function obtenerColorEstadoMonitoreo(status?: string | null, hasOpenAlert?: boolean) {
  if (hasOpenAlert) return "#dc2626";
  if (status === "ONLINE") return "#16a34a";
  if (status === "OFFLINE") return "#334155";
  if (status === "SLEEP") return "#f97316";
  if (status === "LOST_SIGNAL") return "#ca8a04";
  return "#94a3b8";
}

export const ALERT_SEVERITY_LABELS: Record<string, string> = {
  LOW: "Baja",
  MEDIUM: "Media",
  HIGH: "Alta",
  CRITICAL: "Critica",
};
