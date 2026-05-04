import { CampoTexto } from "../comunes/CampoTexto";
import { Selector } from "../comunes/Selector";
import { DEVICE_TYPE_LABELS } from "../../librerias/constantes";

export function FormularioDispositivo() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <CampoTexto etiqueta="Nombre" />
      <CampoTexto etiqueta="Código interno" />
      <Selector etiqueta="Tipo" opciones={Object.entries(DEVICE_TYPE_LABELS).map(([value, label]) => ({ value, label }))} />
    </div>
  );
}
