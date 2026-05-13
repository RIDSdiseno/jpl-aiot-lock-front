import type { AppLanguage } from "./types";
import { translateText } from "./text";

const enumLabels: Record<string, Record<AppLanguage, string>> = {
  ONLINE: { es: "En linea", en: "Online", zh: "在线" },
  OFFLINE: { es: "Fuera de linea", en: "Offline", zh: "离线" },
  SLEEP: { es: "Reposo", en: "Sleep", zh: "休眠" },
  UNKNOWN: { es: "Desconocido", en: "Unknown", zh: "未知" },
  REAL_TIME: { es: "Tiempo real", en: "Real-time", zh: "实时" },
  COMMAND_RESPONSE: { es: "Respuesta de comando", en: "Command response", zh: "命令响应" },
  LOW_BATTERY: { es: "Bateria baja", en: "Low battery", zh: "低电量" },
  LOW: { es: "Bajo", en: "Low", zh: "低" },
  MEDIUM: { es: "Medio", en: "Medium", zh: "中" },
  HIGH: { es: "Alto", en: "High", zh: "高" },
  CRITICAL: { es: "Critico", en: "Critical", zh: "严重" },
  NEW: { es: "Nuevo", en: "New", zh: "新建" },
  REVIEWED: { es: "Revisado", en: "Reviewed", zh: "已查看" },
  RESOLVED: { es: "Resuelto", en: "Resolved", zh: "已解决" },
  DISMISSED: { es: "Descartado", en: "Dismissed", zh: "已忽略" },
  PENDING: { es: "Pendiente", en: "Pending", zh: "待处理" },
  SENT: { es: "Enviado", en: "Sent", zh: "已发送" },
  FAILED: { es: "Fallido", en: "Failed", zh: "失败" },
  RETRYING: { es: "Reintentando", en: "Retrying", zh: "重试中" },
};

export function translateEnum(language: AppLanguage, value?: string | null): string {
  if (!value) return "";
  const normalized = value.toUpperCase();
  return enumLabels[normalized]?.[language] ?? translateText(language, value);
}

export const translateDeviceStatus = translateEnum;
export const translateEventType = translateEnum;
export const translateAlarmLevel = translateEnum;
export const translateCommandStatus = translateEnum;
export const translateDataType = translateEnum;
export const translateLockStatus = translateEnum;

