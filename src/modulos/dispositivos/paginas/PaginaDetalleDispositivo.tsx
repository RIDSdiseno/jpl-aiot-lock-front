import { useParams } from "react-router-dom";
import { BotonesComandoDispositivo } from "../../../componentes/dispositivos/BotonesComandoDispositivo";
import { ResumenDispositivo } from "../../../componentes/dispositivos/ResumenDispositivo";
import { EstadoCarga } from "../../../componentes/comunes/EstadoCarga";
import { EstadoVacio } from "../../../componentes/comunes/EstadoVacio";
import { Tarjeta } from "../../../componentes/comunes/Tarjeta";
import { TablaDatos } from "../../../componentes/comunes/TablaDatos";
import { EncabezadoPagina } from "../../../componentes/layout/EncabezadoPagina";
import { formatearFecha } from "../../../librerias/fechas";
import { useComandosDispositivo } from "../../comandos/hooks/useComandosDispositivo";
import { useEventosDispositivo } from "../../eventos/hooks/useEventos";
import { useDetalleDispositivo } from "../hooks/useDetalleDispositivo";

export function PaginaDetalleDispositivo() {
  const { dispositivoId } = useParams();
  const { data: dispositivo, isLoading } = useDetalleDispositivo(dispositivoId);
  const { data: eventos = [] } = useEventosDispositivo(dispositivoId);
  const { comandos } = useComandosDispositivo(dispositivoId);
  if (isLoading) return <EstadoCarga />;
  if (!dispositivo) return <EstadoVacio titulo="Dispositivo no encontrado" />;
  return (
    <>
      <EncabezadoPagina titulo={dispositivo.name} descripcion={`Código interno: ${dispositivo.internalCode}`} acciones={dispositivo.type === "SMART_LOCK" ? <BotonesComandoDispositivo dispositivoId={dispositivo.id} /> : null} />
      <div className="grid gap-5 xl:grid-cols-[1fr_420px]">
        <ResumenDispositivo dispositivo={dispositivo} />
        <Tarjeta>
          <h2 className="mb-4 font-semibold">Ubicación actual</h2>
          {typeof dispositivo.latitude === "number" && typeof dispositivo.longitude === "number" ? <p className="text-sm">{dispositivo.latitude}, {dispositivo.longitude}</p> : <EstadoVacio titulo="Sin ubicación" />}
        </Tarjeta>
      </div>
      <div className="mt-5 grid gap-5 xl:grid-cols-2">
        <Tarjeta><h2 className="mb-4 font-semibold">Eventos recientes</h2><TablaDatos datos={eventos.slice(0, 5)} obtenerClave={(e) => e.id} columnas={[{ key: "tipo", titulo: "Tipo", render: (e) => e.type ?? "N/D" }, { key: "mensaje", titulo: "Mensaje", render: (e) => e.message ?? "N/D" }, { key: "fecha", titulo: "Fecha", render: (e) => formatearFecha(e.createdAt) }]} /></Tarjeta>
        <Tarjeta><h2 className="mb-4 font-semibold">Comandos recientes</h2><TablaDatos datos={(comandos.data ?? []).slice(0, 5)} obtenerClave={(c) => c.id} columnas={[{ key: "tipo", titulo: "Tipo", render: (c) => c.type }, { key: "estado", titulo: "Estado", render: (c) => c.status ?? "N/D" }, { key: "fecha", titulo: "Fecha", render: (c) => formatearFecha(c.createdAt) }]} /></Tarjeta>
      </div>
    </>
  );
}
