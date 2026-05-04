import { EstadoCarga } from "../../../componentes/comunes/EstadoCarga";
import { EncabezadoPagina } from "../../../componentes/layout/EncabezadoPagina";
import { MapaDispositivos } from "../../../componentes/mapa/MapaDispositivos";
import { useUbicacionesDispositivos } from "../hooks/useUbicacionesDispositivos";

export function PaginaMapa() {
  const { data = [], isLoading } = useUbicacionesDispositivos();
  return (
    <>
      <EncabezadoPagina titulo="GIS / Mapa" descripcion="Ubicación geográfica de dispositivos con coordenadas disponibles." />
      {isLoading ? <EstadoCarga /> : <MapaDispositivos ubicaciones={data} />}
    </>
  );
}
