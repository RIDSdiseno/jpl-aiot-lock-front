import { useState } from "react";
import { CampoTexto } from "../../../componentes/comunes/CampoTexto";
import { EstadoCarga } from "../../../componentes/comunes/EstadoCarga";
import { Selector } from "../../../componentes/comunes/Selector";
import { TablaDatos } from "../../../componentes/comunes/TablaDatos";
import { EncabezadoPagina } from "../../../componentes/layout/EncabezadoPagina";
import { formatearFecha } from "../../../librerias/fechas";
import { formatearPorcentaje } from "../../../librerias/formatos";
import { useEventos } from "../hooks/useEventos";

export function PaginaEventos() {
  const [filtros, setFiltros] = useState<Record<string, string>>({});
  const { data = [], isLoading } = useEventos(filtros);
  return (
    <>
      <EncabezadoPagina titulo="Eventos" descripcion="Trazabilidad de eventos recibidos desde dispositivos." />
      <div className="mb-4 grid gap-3 rounded-lg border border-slate-200 bg-white p-4 md:grid-cols-4">
        <CampoTexto etiqueta="Desde" type="date" onChange={(e) => setFiltros({ ...filtros, from: e.target.value })} />
        <CampoTexto etiqueta="Hasta" type="date" onChange={(e) => setFiltros({ ...filtros, to: e.target.value })} />
        <CampoTexto etiqueta="Dispositivo" placeholder="ID o nombre" onChange={(e) => setFiltros({ ...filtros, device: e.target.value })} />
        <Selector etiqueta="Tipo de evento" opciones={[{ value: "", label: "Todos" }, { value: "OPEN", label: "Apertura" }, { value: "CLOSE", label: "Cierre" }, { value: "ALERT", label: "Alerta" }]} onChange={(e) => setFiltros({ ...filtros, type: e.target.value })} />
      </div>
      {isLoading ? <EstadoCarga /> : <TablaDatos datos={data} obtenerClave={(e) => e.id} columnas={[
        { key: "tipo", titulo: "Tipo", render: (e) => e.type ?? "N/D" },
        { key: "dispositivo", titulo: "Dispositivo", render: (e) => e.deviceName ?? e.deviceId ?? "N/D" },
        { key: "mensaje", titulo: "Mensaje", render: (e) => e.message ?? "N/D" },
        { key: "usuario", titulo: "Usuario", render: (e) => e.userName ?? "N/D" },
        { key: "energia", titulo: "Batería / señal", render: (e) => `${formatearPorcentaje(e.batteryLevel)} / ${formatearPorcentaje(e.signalLevel)}` },
        { key: "fecha", titulo: "Fecha", render: (e) => formatearFecha(e.createdAt) },
      ]} />}
    </>
  );
}
