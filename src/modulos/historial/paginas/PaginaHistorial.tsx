import { EstadoVacio } from "../../../componentes/comunes/EstadoVacio";
import { EncabezadoPagina } from "../../../componentes/layout/EncabezadoPagina";

export function PaginaHistorial() {
  return <><EncabezadoPagina titulo="Historial" descripcion="Historial global de operación." /><EstadoVacio titulo="Historial listo para integrar" /></>;
}
