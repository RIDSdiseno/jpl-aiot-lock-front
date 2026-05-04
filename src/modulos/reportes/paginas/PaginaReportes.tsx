import { EstadoVacio } from "../../../componentes/comunes/EstadoVacio";
import { EncabezadoPagina } from "../../../componentes/layout/EncabezadoPagina";

export function PaginaReportes() {
  return <><EncabezadoPagina titulo="Reportes" descripcion="Reportes operacionales y exportaciones futuras." /><EstadoVacio titulo="Reportes listos para integrar" /></>;
}
