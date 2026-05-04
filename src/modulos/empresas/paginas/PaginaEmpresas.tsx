import { EstadoCarga } from "../../../componentes/comunes/EstadoCarga";
import { TablaDatos } from "../../../componentes/comunes/TablaDatos";
import { EncabezadoPagina } from "../../../componentes/layout/EncabezadoPagina";
import { useEmpresas } from "../hooks/useEmpresas";

export function PaginaEmpresas() {
  const { data = [], isLoading } = useEmpresas();
  return (
    <>
      <EncabezadoPagina titulo="Empresas" descripcion="Administración de empresas asociadas a la plataforma." />
      {isLoading ? <EstadoCarga /> : <TablaDatos datos={data} obtenerClave={(e) => e.id} columnas={[
        { key: "nombre", titulo: "Nombre", render: (e) => e.name },
        { key: "rut", titulo: "RUT", render: (e) => e.rut ?? "N/D" },
        { key: "email", titulo: "Email", render: (e) => e.email ?? "N/D" },
        { key: "telefono", titulo: "Teléfono", render: (e) => e.phone ?? "N/D" },
        { key: "estado", titulo: "Estado", render: (e) => e.status ?? "N/D" },
        { key: "usuarios", titulo: "Usuarios", render: (e) => e.usersCount ?? "N/D" },
        { key: "dispositivos", titulo: "Dispositivos", render: (e) => e.devicesCount ?? "N/D" },
      ]} />}
    </>
  );
}
