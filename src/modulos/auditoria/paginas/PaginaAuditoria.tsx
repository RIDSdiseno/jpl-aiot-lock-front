import { EstadoCarga } from "../../../componentes/comunes/EstadoCarga";
import { TablaDatos } from "../../../componentes/comunes/TablaDatos";
import { EncabezadoPagina } from "../../../componentes/layout/EncabezadoPagina";
import { formatearFecha } from "../../../librerias/fechas";
import { useAuditoria } from "../hooks/useAuditoria";

export function PaginaAuditoria() {
  const { data = [], isLoading } = useAuditoria();
  return (
    <>
      <EncabezadoPagina titulo="Auditoría" descripcion="Logs de acciones de usuarios y sistema." />
      {isLoading ? <EstadoCarga /> : <TablaDatos datos={data} obtenerClave={(r) => r.id} columnas={[
        { key: "usuario", titulo: "Usuario", render: (r) => r.userName ?? "N/D" },
        { key: "accion", titulo: "Acción", render: (r) => r.action ?? "N/D" },
        { key: "entidad", titulo: "Entidad", render: (r) => r.entity ?? "N/D" },
        { key: "descripcion", titulo: "Descripción", render: (r) => r.description ?? "N/D" },
        { key: "ip", titulo: "IP", render: (r) => r.ip ?? "N/D" },
        { key: "userAgent", titulo: "User agent", render: (r) => r.userAgent ?? "N/D" },
        { key: "fecha", titulo: "Fecha", render: (r) => formatearFecha(r.createdAt) },
      ]} />}
    </>
  );
}
