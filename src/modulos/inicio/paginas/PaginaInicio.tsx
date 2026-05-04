import { EncabezadoPagina } from "../../../componentes/layout/EncabezadoPagina";
import { EstadoCarga } from "../../../componentes/comunes/EstadoCarga";
import { FiltroFechasDashboard } from "../../../componentes/inicio/FiltroFechasDashboard";
import { GraficoOperacionEquipos } from "../../../componentes/inicio/GraficoOperacionEquipos";
import { PanelEventosPush } from "../../../componentes/inicio/PanelEventosPush";
import { PanelMensajesSistema } from "../../../componentes/inicio/PanelMensajesSistema";
import { TarjetasResumenDispositivos } from "../../../componentes/inicio/TarjetasResumenDispositivos";
import { useResumenInicio } from "../hooks/useResumenInicio";

export function PaginaInicio() {
  const { data, isLoading } = useResumenInicio();
  if (isLoading || !data) return <EstadoCarga />;
  return (
    <>
      <EncabezadoPagina titulo="Inicio" descripcion="Resumen operacional de dispositivos AIoT." />
      <div className="space-y-5">
        <TarjetasResumenDispositivos items={data.devicesByType} />
        <FiltroFechasDashboard />
        <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
          <GraficoOperacionEquipos datos={data.operationRatio} />
          <div className="space-y-5">
            <PanelMensajesSistema mensajes={data.systemMessages ?? []} />
            <PanelEventosPush eventos={data.pushEvents ?? []} />
          </div>
        </div>
      </div>
    </>
  );
}
