import { MapContainer, TileLayer } from "react-leaflet";
import type { UbicacionDispositivo } from "../../modulos/gis/tipos/gis.types";
import { EstadoVacio } from "../comunes/EstadoVacio";
import { MarcadorDispositivo } from "./MarcadorDispositivo";

export function MapaDispositivos({ ubicaciones }: { ubicaciones: UbicacionDispositivo[] }) {
  if (!ubicaciones.length) return <EstadoVacio titulo="Sin ubicaciones" descripcion="No hay dispositivos con coordenadas disponibles." />;
  const centro = ubicaciones[0];

  return (
    <MapContainer center={[centro.latitude, centro.longitude]} zoom={12} scrollWheelZoom className="shadow-suave">
      <TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {ubicaciones.map((ubicacion) => <MarcadorDispositivo key={ubicacion.deviceId} ubicacion={ubicacion} />)}
    </MapContainer>
  );
}
