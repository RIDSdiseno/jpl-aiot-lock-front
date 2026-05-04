import { useParams } from "react-router-dom";
import { EstadoCarga } from "../../../componentes/comunes/EstadoCarga";
import { EstadoVacio } from "../../../componentes/comunes/EstadoVacio";
import { Tarjeta } from "../../../componentes/comunes/Tarjeta";
import { EncabezadoPagina } from "../../../componentes/layout/EncabezadoPagina";
import { useUsuarioDetalle } from "../hooks/useUsuarios";

export function PaginaDetalleUsuario() {
  const { usuarioId } = useParams();
  const { data, isLoading } = useUsuarioDetalle(usuarioId);
  if (isLoading) return <EstadoCarga />;
  if (!data) return <EstadoVacio titulo="Usuario no encontrado" />;
  return <><EncabezadoPagina titulo={data.name ?? data.email} /><Tarjeta><p className="text-sm text-slate-600">{data.email}</p></Tarjeta></>;
}
