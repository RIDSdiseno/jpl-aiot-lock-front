import { DEVICE_TYPE_LABELS } from "../../librerias/constantes";
import type { DeviceType } from "../../modulos/dispositivos/tipos/dispositivo.types";
import { Insignia } from "../comunes/Insignia";

export function InsigniaTipoDispositivo({ tipo }: { tipo: DeviceType }) {
  return <Insignia tono="azul">{DEVICE_TYPE_LABELS[tipo]}</Insignia>;
}
