import type { DeviceConnectionStatus, DeviceType } from "../../dispositivos/tipos/dispositivo.types";

export interface ResumenTipoDispositivo {
  type: DeviceType;
  total: number;
}

export interface ResumenConexion {
  status: DeviceConnectionStatus;
  total: number;
}

export interface MensajeSistema {
  id: string;
  titulo: string;
  descripcion?: string;
  fecha?: string;
}

export interface EventoPush {
  id: string;
  mensaje: string;
  dispositivo?: string;
  fecha?: string;
}

export interface ResumenInicio {
  devicesByType: ResumenTipoDispositivo[];
  operationRatio: ResumenConexion[];
  systemMessages?: MensajeSistema[];
  pushEvents?: EventoPush[];
}
