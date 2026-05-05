import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import type { UbicacionDispositivo } from "../../modulos/gis/tipos/gis.types";
import type { DispositivoMonitoreo, GeocercaMonitoreo } from "../../modulos/monitoreo/tipos/monitoreo.types";
import { EstadoVacio } from "../comunes/EstadoVacio";
import { LeyendaMapa } from "../monitoreo/LeyendaMapa";
import { SelectorTipoMapa, type TipoMapaMonitoreo } from "../monitoreo/SelectorTipoMapa";
import { CirculoGeocerca } from "./CirculoGeocerca";
import { MarcadorDispositivo } from "./MarcadorDispositivo";

const centroSantiago: [number, number] = [-33.4489, -70.6693];

function MapController({
  dispositivoSeleccionado,
  geocercaSeleccionada,
}: {
  dispositivoSeleccionado?: DispositivoMonitoreo | null;
  geocercaSeleccionada?: GeocercaMonitoreo | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (dispositivoSeleccionado?.location) {
      map.flyTo([dispositivoSeleccionado.location.latitude, dispositivoSeleccionado.location.longitude], 15, { duration: 0.8 });
      return;
    }
    if (geocercaSeleccionada) {
      map.flyTo([geocercaSeleccionada.centerLat, geocercaSeleccionada.centerLng], 14, { duration: 0.8 });
    }
  }, [dispositivoSeleccionado, geocercaSeleccionada, map]);

  return null;
}

export function MapaDispositivos({
  ubicaciones,
  dispositivos,
  geocercas = [],
  geocercasVisibles = new Set<string>(),
  dispositivoSeleccionado,
  geocercaSeleccionada,
  tipoMapa = "mapa",
  onCambiarTipoMapa,
  onSeleccionarDispositivo,
}: {
  ubicaciones?: UbicacionDispositivo[];
  dispositivos?: DispositivoMonitoreo[];
  geocercas?: GeocercaMonitoreo[];
  geocercasVisibles?: Set<string>;
  dispositivoSeleccionado?: DispositivoMonitoreo | null;
  geocercaSeleccionada?: GeocercaMonitoreo | null;
  tipoMapa?: TipoMapaMonitoreo;
  onCambiarTipoMapa?: (tipo: TipoMapaMonitoreo) => void;
  onSeleccionarDispositivo?: (dispositivo: DispositivoMonitoreo) => void;
}) {
  if (ubicaciones) {
    if (!ubicaciones.length) return <EstadoVacio titulo="Sin ubicaciones" descripcion="No hay dispositivos con coordenadas disponibles." />;
    const centro = ubicaciones[0];

    return (
      <MapContainer center={[centro.latitude, centro.longitude]} zoom={12} scrollWheelZoom className="h-full min-h-[520px] shadow-sm">
        <TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {ubicaciones.map((ubicacion) => <MarcadorDispositivo key={ubicacion.deviceId} ubicacion={ubicacion} />)}
      </MapContainer>
    );
  }

  const dispositivosConUbicacion = (dispositivos ?? []).filter((dispositivo) => dispositivo.location);
  const centro = dispositivosConUbicacion[0]?.location
    ? ([dispositivosConUbicacion[0].location.latitude, dispositivosConUbicacion[0].location.longitude] as [number, number])
    : centroSantiago;

  return (
    <div className="relative h-full min-h-[520px] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <MapContainer center={centro} zoom={12} scrollWheelZoom className="h-full min-h-[520px] !rounded-lg">
        <MapController dispositivoSeleccionado={dispositivoSeleccionado} geocercaSeleccionada={geocercaSeleccionada} />
      <TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {dispositivosConUbicacion.map((dispositivo) => (
          <MarcadorDispositivo key={dispositivo.id} dispositivo={dispositivo} onSeleccionarDispositivo={onSeleccionarDispositivo} />
        ))}
        {geocercas
          .filter((geocerca) => geocercasVisibles.has(geocerca.id))
          .map((geocerca) => <CirculoGeocerca key={geocerca.id} geocerca={geocerca} />)}
      </MapContainer>
      <LeyendaMapa />
      <SelectorTipoMapa tipoMapa={tipoMapa} onCambiarTipoMapa={onCambiarTipoMapa ?? (() => undefined)} />
      {!(dispositivos ?? []).length ? (
        <div className="absolute left-1/2 top-6 z-[500] -translate-x-1/2 rounded-md bg-white/95 px-4 py-2 text-sm text-slate-600 shadow-md">
          No hay dispositivos disponibles para monitoreo.
        </div>
      ) : !dispositivosConUbicacion.length ? (
        <div className="absolute left-1/2 top-6 z-[500] -translate-x-1/2 rounded-md bg-white/95 px-4 py-2 text-sm text-slate-600 shadow-md">
          No hay dispositivos con ubicación registrada.
        </div>
      ) : null}
    </div>
  );
}
