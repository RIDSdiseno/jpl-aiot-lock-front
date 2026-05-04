import { Plus } from "lucide-react";
import { useState } from "react";
import { Boton } from "../../../componentes/comunes/Boton";
import { EstadoCarga } from "../../../componentes/comunes/EstadoCarga";
import { FiltrosDispositivos } from "../../../componentes/dispositivos/FiltrosDispositivos";
import { TablaDispositivos } from "../../../componentes/dispositivos/TablaDispositivos";
import { EncabezadoPagina } from "../../../componentes/layout/EncabezadoPagina";
import { useDispositivos } from "../hooks/useDispositivos";
import type { FiltrosDispositivos as Filtros } from "../tipos/dispositivo.types";

export function PaginaDispositivos() {
  const [filtros, setFiltros] = useState<Filtros>({});
  const { data = [], isLoading } = useDispositivos(filtros);
  return (
    <>
      <EncabezadoPagina titulo="Dispositivos" descripcion="Administración de dispositivos AIoT." acciones={<Boton icono={<Plus className="h-4 w-4" />}>Nuevo dispositivo</Boton>} />
      <div className="space-y-4">
        <FiltrosDispositivos filtros={filtros} onCambiar={setFiltros} />
        {isLoading ? <EstadoCarga /> : <TablaDispositivos dispositivos={data} />}
      </div>
    </>
  );
}
