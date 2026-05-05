export type EstadoFiltroMonitoreo =
  | "ALL"
  | "ONLINE"
  | "OFFLINE"
  | "SLEEP"
  | "LOST_SIGNAL"
  | "UNKNOWN"
  | "ALARM";

export type TipoDispositivoMonitoreo =
  | "SMART_LOCK"
  | "SMART_SENSOR"
  | "GPS_TRACKER"
  | "E_SEAL"
  | "SMART_GATEWAY"
  | "SMART_BOX";

export interface ResumenMonitoreo {
  total: number;
  online: number;
  offline: number;
  sleep: number;
  lostSignal: number;
  unknown: number;
  alarm: number;
}

export interface UbicacionMonitoreo {
  latitude: number;
  longitude: number;
  recordedAt: string;
}

export interface EmpresaMonitoreo {
  id: string;
  name: string;
}

export interface SucursalMonitoreo {
  id: string;
  name: string;
}

export interface DispositivoMonitoreo {
  id: string;
  name: string;
  internalCode: string;
  serialNumber?: string | null;
  imei?: string | null;
  macAddress?: string | null;
  type: TipoDispositivoMonitoreo;
  status: string;
  connectionStatus: string;
  connectionType: string;
  batteryLevel?: number | null;
  signalLevel?: number | null;
  lastConnectionAt?: string | null;
  lastSyncAt?: string | null;
  company?: EmpresaMonitoreo | null;
  branch?: SucursalMonitoreo | null;
  location?: UbicacionMonitoreo | null;
  hasOpenAlert: boolean;
  openAlertCount: number;
}

export interface GeocercaMonitoreo {
  id: string;
  name: string;
  description?: string | null;
  centerLat: number;
  centerLng: number;
  radiusMt: number;
  isActive: boolean;
  company?: EmpresaMonitoreo | null;
}

export interface DispositivoArbolMonitoreo {
  id: string;
  name: string;
  internalCode: string;
  type: TipoDispositivoMonitoreo;
  connectionStatus: string;
  batteryLevel?: number | null;
  signalLevel?: number | null;
  hasLocation: boolean;
}

export interface EmpresaArbolMonitoreo {
  id: string;
  name: string;
  totalDevices: number;
  online: number;
  offline: number;
  sleep: number;
  alarm: number;
  devices: DispositivoArbolMonitoreo[];
}

export interface RespuestaResumenMonitoreo {
  ok: boolean;
  summary: ResumenMonitoreo;
}

export interface RespuestaDispositivosMonitoreo {
  ok: boolean;
  devices: DispositivoMonitoreo[];
}

export interface RespuestaGeocercasMonitoreo {
  ok: boolean;
  geofences: GeocercaMonitoreo[];
}

export interface RespuestaArbolEmpresasMonitoreo {
  ok: boolean;
  companies: EmpresaArbolMonitoreo[];
}

export interface FiltrosDispositivosMonitoreo {
  status?: EstadoFiltroMonitoreo;
  search?: string;
  companyId?: string;
  type?: TipoDispositivoMonitoreo;
}

export interface FiltrosGeocercasMonitoreo {
  companyId?: string;
  active?: boolean;
}
