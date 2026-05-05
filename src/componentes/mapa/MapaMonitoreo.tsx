import "leaflet/dist/leaflet.css";
import { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import type { DispositivoMonitoreo, GeocercaMonitoreo } from "../../modulos/monitoreo/tipos/monitoreo.types";
import { BuscadorMapa } from "../monitoreo/BuscadorMapa";
import { EtiquetaDispositivoMapa } from "../monitoreo/EtiquetaDispositivoMapa";
import { LeyendaEstadosMapa } from "../monitoreo/LeyendaEstadosMapa";
import { SelectorCapaMapa, type TipoMapaMonitoreo } from "../monitoreo/SelectorCapaMapa";
import { CirculoGeocerca } from "./CirculoGeocerca";
import { ControlCentrarMapa } from "./ControlCentrarMapa";
import { MarcadorDispositivoMonitoreo } from "./MarcadorDispositivoMonitoreo";

const centroSantiago: [number, number] = [-33.4489, -70.6693];

function ControlVista({
  dispositivoSeleccionado,
  centroInicial,
}: {
  dispositivoSeleccionado?: DispositivoMonitoreo | null;
  centroInicial: [number, number];
}) {
  const map = useMap();

  useEffect(() => {
    if (dispositivoSeleccionado?.location) {
      map.flyTo([dispositivoSeleccionado.location.latitude, dispositivoSeleccionado.location.longitude], 15, { duration: 0.7 });
      return;
    }
    map.setView(centroInicial, 12);
  }, [centroInicial, dispositivoSeleccionado, map]);

  return null;
}

export function MapaMonitoreo({
  dispositivos,
  dispositivoSeleccionado,
  geocercas,
  idsDispositivosVisibles,
  idsGeocercasVisibles,
  tipoMapa,
  onCambiarTipoMapa,
  onSeleccionarDispositivo,
}: {
  dispositivos: DispositivoMonitoreo[];
  dispositivoSeleccionado: DispositivoMonitoreo | null;
  geocercas: GeocercaMonitoreo[];
  idsDispositivosVisibles: Set<string>;
  idsGeocercasVisibles: Set<string>;
  tipoMapa: TipoMapaMonitoreo;
  onCambiarTipoMapa: (tipo: TipoMapaMonitoreo) => void;
  onSeleccionarDispositivo: (dispositivo: DispositivoMonitoreo) => void;
}) {
  const dispositivosConUbicacion = useMemo(() => {
    return dispositivos.filter((dispositivo) => {
      if (!dispositivo.location) return false;
      if (!idsDispositivosVisibles.size) return true;
      return idsDispositivosVisibles.has(dispositivo.id);
    });
  }, [dispositivos, idsDispositivosVisibles]);

  const centroInicial = useMemo<[number, number]>(() => {
    if (dispositivoSeleccionado?.location) return [dispositivoSeleccionado.location.latitude, dispositivoSeleccionado.location.longitude];
    const primero = dispositivosConUbicacion[0]?.location;
    return primero ? [primero.latitude, primero.longitude] : centroSantiago;
  }, [dispositivoSeleccionado, dispositivosConUbicacion]);

  return (
    <div className="relative h-full min-h-[520px] overflow-hidden bg-slate-100">
      <MapContainer center={centroInicial} zoom={12} scrollWheelZoom className="h-full min-h-[520px] w-full">
        <ControlVista dispositivoSeleccionado={dispositivoSeleccionado} centroInicial={centroInicial} />
        <TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {dispositivosConUbicacion.map((dispositivo) => (
          <MarcadorDispositivoMonitoreo
            key={dispositivo.id}
            dispositivo={dispositivo}
            seleccionado={dispositivoSeleccionado?.id === dispositivo.id}
            onSeleccionarDispositivo={onSeleccionarDispositivo}
          />
        ))}
        {dispositivoSeleccionado?.location ? <EtiquetaDispositivoMapa dispositivo={dispositivoSeleccionado} /> : null}
        {geocercas
          .filter((geocerca) => idsGeocercasVisibles.has(geocerca.id))
          .map((geocerca) => (
            <CirculoGeocerca key={geocerca.id} geocerca={geocerca} />
          ))}
        <ControlCentrarMapa centro={centroInicial} zoom={dispositivoSeleccionado?.location ? 15 : 12} />
      </MapContainer>
      <BuscadorMapa />
      <SelectorCapaMapa tipoMapa={tipoMapa} onCambiarTipoMapa={onCambiarTipoMapa} />
      <LeyendaEstadosMapa />
      {!dispositivos.length ? (
        <div className="absolute left-1/2 top-16 z-[500] -translate-x-1/2 rounded border border-slate-200 bg-white/95 px-4 py-2 text-sm text-slate-600 shadow-md">
          No hay dispositivos disponibles para monitoreo.
        </div>
      ) : !dispositivos.filter((dispositivo) => dispositivo.location).length ? (
        <div className="absolute left-1/2 top-16 z-[500] -translate-x-1/2 rounded border border-slate-200 bg-white/95 px-4 py-2 text-sm text-slate-600 shadow-md">
          No hay dispositivos con ubicacion registrada.
        </div>
      ) : null}
    </div>
  );
}
