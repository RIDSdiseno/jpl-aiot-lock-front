import { EstadoCarga } from "../../../componentes/comunes/EstadoCarga";
import { TablaDatos } from "../../../componentes/comunes/TablaDatos";
import { EncabezadoPagina } from "../../../componentes/layout/EncabezadoPagina";
import { formatearFecha } from "../../../librerias/fechas";
import { useUsuarios } from "../hooks/useUsuarios";

export function PaginaUsuarios() {
  const { data = [], isLoading } = useUsuarios();
  return (
    <>
      <EncabezadoPagina titulo="Usuarios" descripcion="Administración de usuarios, roles y estados." />
      {isLoading ? <EstadoCarga /> : <TablaDatos datos={data} obtenerClave={(u) => u.id} columnas={[
        { key: "nombre", titulo: "Nombre", render: (u) => u.name ?? "N/D" },
        { key: "email", titulo: "Email", render: (u) => u.email },
        { key: "empresa", titulo: "Empresa", render: (u) => u.companyName ?? "N/D" },
        { key: "rol", titulo: "Rol", render: (u) => u.role ?? "N/D" },
        { key: "estado", titulo: "Estado", render: (u) => u.status ?? "N/D" },
        { key: "ultimo", titulo: "Último login", render: (u) => formatearFecha(u.lastLoginAt) },
        { key: "acciones", titulo: "Acciones", render: () => "Ver / Editar" },
      ]} />}
    </>
  );
}
