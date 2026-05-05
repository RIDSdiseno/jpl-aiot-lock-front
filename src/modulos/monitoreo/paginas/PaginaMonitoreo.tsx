import { useMemo } from "react";
import { EstadoCarga } from "../../../componentes/comunes/EstadoCarga";
import { EstadoVacio } from "../../../componentes/comunes/EstadoVacio";
import { MigasPan } from "../../../componentes/layout/MigasPan";
import { MapaMonitoreo } from "../../../componentes/mapa/MapaMonitoreo";
import { BarraFiltrosEstadoMonitoreo } from "../../../componentes/monitoreo/BarraFiltrosEstadoMonitoreo";
import { PanelLateralMonitoreo } from "../../../componentes/monitoreo/PanelLateralMonitoreo";
import { useMonitoreo } from "../hooks/useMonitoreo";

export function PaginaMonitoreo() {
  const {
    estadoFiltro,
    cambiarEstadoFiltro,
    busqueda,
    cambiarBusqueda,
    resumen,
    dispositivos,
    geocercas,
    empresasTree,
    loading,
    error,
    seleccionarDispositivo,
    dispositivoSeleccionado,
    idsDispositivosVisibles,
    idsGeocercasVisibles,
    empresaExpandida,
    tipoMapa,
    cambiarTipoMapa,
    alternarDispositivoVisible,
    alternarGeocercaVisible,
    alternarEmpresaExpandida,
    refrescarMonitoreo,
  } = useMonitoreo();

  const dispositivosPorId = useMemo(() => new Map(dispositivos.map((dispositivo) => [dispositivo.id, dispositivo])), [dispositivos]);

  if (loading) {
    return <EstadoCarga texto="Cargando monitoreo en tiempo real..." />;
  }

  if (error) {
    return (
      <EstadoVacio
        titulo="No se pudo cargar el monitoreo en tiempo real."
        descripcion="Revisa que el backend este disponible y que tu sesion siga vigente."
      />
    );
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] min-h-[620px] flex-col overflow-hidden rounded border border-slate-200 bg-white shadow-sm">
      <header className="border-b border-slate-200 bg-white px-4 py-3">
        <MigasPan items={["Inicio", "Monitoreo en tiempo real", "Monitoreo"]} />
        <h1 className="mt-1 text-xl font-semibold text-slate-900">Monitoreo</h1>
      </header>

      <BarraFiltrosEstadoMonitoreo estadoActual={estadoFiltro} onCambiarEstado={cambiarEstadoFiltro} resumen={resumen} />

      <div className="grid min-h-0 flex-1 grid-cols-1 xl:grid-cols-[300px_minmax(0,1fr)]">
        <PanelLateralMonitoreo
          busqueda={busqueda}
          geocercas={geocercas}
          empresas={empresasTree}
          idsDispositivosVisibles={idsDispositivosVisibles}
          idsGeocercasVisibles={idsGeocercasVisibles}
          empresaExpandida={empresaExpandida}
          dispositivoSeleccionadoId={dispositivoSeleccionado?.id}
          onCambiarBusqueda={cambiarBusqueda}
          onRefrescar={refrescarMonitoreo}
          onAlternarDispositivoVisible={alternarDispositivoVisible}
          onAlternarGeocercaVisible={alternarGeocercaVisible}
          onAlternarEmpresaExpandida={alternarEmpresaExpandida}
          onSeleccionarDispositivo={(dispositivoArbol) => {
            const dispositivo = dispositivosPorId.get(dispositivoArbol.id);
            if (dispositivo) seleccionarDispositivo(dispositivo);
          }}
        />
        <main className="min-h-0">
          <MapaMonitoreo
            dispositivos={dispositivos}
            dispositivoSeleccionado={dispositivoSeleccionado}
            geocercas={geocercas}
            idsDispositivosVisibles={idsDispositivosVisibles}
            idsGeocercasVisibles={idsGeocercasVisibles}
            tipoMapa={tipoMapa}
            onCambiarTipoMapa={cambiarTipoMapa}
            onSeleccionarDispositivo={seleccionarDispositivo}
          />
        </main>
      </div>
    </div>
  );
}
