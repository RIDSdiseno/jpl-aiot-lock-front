import { RefreshCw } from "lucide-react";
import type {
  DispositivoArbolMonitoreo,
  EmpresaArbolMonitoreo,
  GeocercaMonitoreo,
} from "../../modulos/monitoreo/tipos/monitoreo.types";
import { ArbolEmpresaDispositivos } from "./ArbolEmpresaDispositivos";
import { BuscadorMonitoreo } from "./BuscadorMonitoreo";
import { PanelGeocercasMonitoreo } from "./PanelGeocercasMonitoreo";

export function PanelLateralMonitoreo({
  busqueda,
  geocercas,
  empresas,
  idsDispositivosVisibles,
  idsGeocercasVisibles,
  empresaExpandida,
  dispositivoSeleccionadoId,
  onCambiarBusqueda,
  onRefrescar,
  onAlternarDispositivoVisible,
  onAlternarGeocercaVisible,
  onAlternarEmpresaExpandida,
  onSeleccionarDispositivo,
}: {
  busqueda: string;
  geocercas: GeocercaMonitoreo[];
  empresas: EmpresaArbolMonitoreo[];
  idsDispositivosVisibles: Set<string>;
  idsGeocercasVisibles: Set<string>;
  empresaExpandida: Set<string>;
  dispositivoSeleccionadoId?: string | null;
  onCambiarBusqueda: (valor: string) => void;
  onRefrescar: () => void;
  onAlternarDispositivoVisible: (id: string) => void;
  onAlternarGeocercaVisible: (id: string) => void;
  onAlternarEmpresaExpandida: (id: string) => void;
  onSeleccionarDispositivo: (dispositivo: DispositivoArbolMonitoreo) => void;
}) {
  return (
    <aside className="flex h-full min-h-0 w-full flex-col border-r border-slate-200 bg-white xl:w-[300px]">
      <div className="flex items-center gap-2 border-b border-slate-200 p-3">
        <div className="min-w-0 flex-1">
          <BuscadorMonitoreo valor={busqueda} onCambiar={onCambiarBusqueda} />
        </div>
        <button
          type="button"
          onClick={onRefrescar}
          className="inline-flex h-9 w-9 items-center justify-center rounded border border-slate-300 text-slate-600 hover:bg-slate-50"
          title="Refrescar"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>
      <PanelGeocercasMonitoreo
        geocercas={geocercas}
        idsGeocercasVisibles={idsGeocercasVisibles}
        onAlternarGeocerca={onAlternarGeocercaVisible}
      />
      <div className="min-h-0 flex-1 overflow-y-auto">
        <ArbolEmpresaDispositivos
          empresas={empresas}
          empresaExpandida={empresaExpandida}
          idsDispositivosVisibles={idsDispositivosVisibles}
          dispositivoSeleccionadoId={dispositivoSeleccionadoId}
          onAlternarEmpresa={onAlternarEmpresaExpandida}
          onAlternarDispositivoVisible={onAlternarDispositivoVisible}
          onSeleccionarDispositivo={onSeleccionarDispositivo}
        />
      </div>
    </aside>
  );
}
