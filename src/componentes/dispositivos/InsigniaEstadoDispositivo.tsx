import { DEVICE_CONNECTION_STATUS_LABELS, DEVICE_STATUS_LABELS } from "../../librerias/constantes";
import type { DeviceConnectionStatus, DeviceStatus } from "../../modulos/dispositivos/tipos/dispositivo.types";
import { Insignia } from "../comunes/Insignia";

export function InsigniaEstadoDispositivo({ estado }: { estado: DeviceStatus | DeviceConnectionStatus }) {
  const label = estado in DEVICE_STATUS_LABELS
    ? DEVICE_STATUS_LABELS[estado as DeviceStatus]
    : DEVICE_CONNECTION_STATUS_LABELS[estado as DeviceConnectionStatus];
  const tono = estado === "ONLINE" || estado === "ACTIVE" ? "verde" : estado === "OFFLINE" || estado === "BLOCKED" ? "rojo" : "gris";
  return <Insignia tono={tono}>{label}</Insignia>;
}
