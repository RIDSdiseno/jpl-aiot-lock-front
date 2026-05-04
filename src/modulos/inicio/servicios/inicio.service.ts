import { api, extraerDatos } from "../../../librerias/api";
import type { ResumenInicio } from "../tipos/inicio.types";

const resumenVacio: ResumenInicio = {
  devicesByType: [
    { type: "SMART_LOCK", total: 0 },
    { type: "SMART_SENSOR", total: 0 },
    { type: "GPS_TRACKER", total: 0 },
    { type: "E_SEAL", total: 0 },
    { type: "SMART_GATEWAY", total: 0 },
    { type: "SMART_BOX", total: 0 },
  ],
  operationRatio: [
    { status: "ONLINE", total: 0 },
    { status: "OFFLINE", total: 0 },
    { status: "SLEEP", total: 0 },
    { status: "LOST_SIGNAL", total: 0 },
    { status: "UNKNOWN", total: 0 },
  ],
  systemMessages: [],
  pushEvents: [],
};

export async function obtenerResumenInicio() {
  try {
    const respuesta = await api.get<ResumenInicio | { data: ResumenInicio }>("/dashboard/summary");
    return { ...resumenVacio, ...extraerDatos<ResumenInicio>(respuesta) };
  } catch {
    return resumenVacio;
  }
}
