import { useParams } from "react-router-dom";
import { EstadoCarga } from "../../../componentes/comunes/EstadoCarga";
import { EstadoVacio } from "../../../componentes/comunes/EstadoVacio";
import { Tarjeta } from "../../../componentes/comunes/Tarjeta";
import { EncabezadoPagina } from "../../../componentes/layout/EncabezadoPagina";
import { useEmpresaDetalle } from "../hooks/useEmpresas";

export function PaginaDetalleEmpresa() {
  const { empresaId } = useParams();
  const { data, isLoading } = useEmpresaDetalle(empresaId);
  if (isLoading) return <EstadoCarga />;
  if (!data) return <EstadoVacio titulo="Empresa no encontrada" />;
  return <><EncabezadoPagina titulo={data.name} /><Tarjeta><p className="text-sm text-slate-600">{data.email ?? "Sin email registrado"}</p></Tarjeta></>;
}
