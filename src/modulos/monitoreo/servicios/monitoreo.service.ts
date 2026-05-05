import { api } from "../../../librerias/api";
import type {
  FiltrosDispositivosMonitoreo,
  FiltrosGeocercasMonitoreo,
  RespuestaArbolEmpresasMonitoreo,
  RespuestaDispositivosMonitoreo,
  RespuestaGeocercasMonitoreo,
  RespuestaResumenMonitoreo,
} from "../tipos/monitoreo.types";

export async function obtenerResumenMonitoreo() {
  const response = await api.get<RespuestaResumenMonitoreo>("/monitoring/summary");
  return response.data;
}

export async function obtenerDispositivosMonitoreo(params?: FiltrosDispositivosMonitoreo) {
  const response = await api.get<RespuestaDispositivosMonitoreo>("/monitoring/devices", { params });
  return response.data;
}

export async function obtenerGeocercasMonitoreo(params?: FiltrosGeocercasMonitoreo) {
  const response = await api.get<RespuestaGeocercasMonitoreo>("/monitoring/geofences", { params });
  return response.data;
}

export async function obtenerArbolEmpresasMonitoreo() {
  const response = await api.get<RespuestaArbolEmpresasMonitoreo>("/monitoring/companies-tree");
  return response.data;
}
