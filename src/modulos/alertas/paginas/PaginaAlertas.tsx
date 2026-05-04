import { Boton } from "../../../componentes/comunes/Boton";
import { EstadoCarga } from "../../../componentes/comunes/EstadoCarga";
import { Insignia } from "../../../componentes/comunes/Insignia";
import { TablaDatos } from "../../../componentes/comunes/TablaDatos";
import { EncabezadoPagina } from "../../../componentes/layout/EncabezadoPagina";
import { ALERT_SEVERITY_LABELS } from "../../../librerias/constantes";
import { formatearFecha } from "../../../librerias/fechas";
import { useAlertas } from "../hooks/useAlertas";

export function PaginaAlertas() {
  const { alertas, actualizar } = useAlertas();
  return (
    <>
      <EncabezadoPagina titulo="Alertas" descripcion="Gestión de alertas operacionales." />
      {alertas.isLoading ? <EstadoCarga /> : <TablaDatos datos={alertas.data ?? []} obtenerClave={(a) => a.id} columnas={[
        { key: "severidad", titulo: "Severidad", render: (a) => <Insignia tono={a.severity === "CRITICAL" ? "rojo" : "amarillo"}>{ALERT_SEVERITY_LABELS[a.severity ?? ""] ?? a.severity ?? "N/D"}</Insignia> },
        { key: "estado", titulo: "Estado", render: (a) => a.status ?? "N/D" },
        { key: "dispositivo", titulo: "Dispositivo", render: (a) => a.deviceName ?? a.deviceId ?? "N/D" },
        { key: "mensaje", titulo: "Mensaje", render: (a) => a.message ?? "N/D" },
        { key: "fecha", titulo: "Fecha", render: (a) => formatearFecha(a.createdAt) },
        { key: "accion", titulo: "Acción", render: (a) => <Boton variante="secundario" disabled={actualizar.isPending} onClick={() => actualizar.mutate({ id: a.id, data: { status: "RESOLVED" } })}>Marcar resuelta</Boton> },
      ]} />}
    </>
  );
}
