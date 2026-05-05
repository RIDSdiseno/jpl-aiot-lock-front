import { Building2, ChevronDown, ChevronRight } from "lucide-react";
import type { DispositivoArbolMonitoreo, EmpresaArbolMonitoreo } from "../../modulos/monitoreo/tipos/monitoreo.types";
import { ItemDispositivoMonitoreo } from "./ItemDispositivoMonitoreo";

export function ArbolEmpresaDispositivos({
  empresas,
  empresaExpandida,
  idsDispositivosVisibles,
  dispositivoSeleccionadoId,
  onAlternarEmpresa,
  onAlternarDispositivoVisible,
  onSeleccionarDispositivo,
}: {
  empresas: EmpresaArbolMonitoreo[];
  empresaExpandida: Set<string>;
  idsDispositivosVisibles: Set<string>;
  dispositivoSeleccionadoId?: string | null;
  onAlternarEmpresa: (id: string) => void;
  onAlternarDispositivoVisible: (id: string) => void;
  onSeleccionarDispositivo: (dispositivo: DispositivoArbolMonitoreo) => void;
}) {
  if (!empresas.length) {
    return <div className="px-3 py-4 text-xs text-slate-500">No hay empresas o dispositivos para mostrar.</div>;
  }

  return (
    <div className="space-y-1 p-2">
      {empresas.map((empresa) => {
        const abierta = empresaExpandida.has(empresa.id);
        return (
          <section key={empresa.id} className="overflow-hidden rounded border border-slate-200">
            <button
              type="button"
              onClick={() => onAlternarEmpresa(empresa.id)}
              className="flex w-full items-center gap-1.5 bg-white px-2 py-2 text-left text-xs hover:bg-slate-50"
            >
              {abierta ? <ChevronDown className="h-3.5 w-3.5 text-slate-500" /> : <ChevronRight className="h-3.5 w-3.5 text-slate-500" />}
              <Building2 className="h-3.5 w-3.5 text-blue-600" />
              <span className="min-w-0 flex-1 truncate font-semibold text-slate-800">{empresa.name}</span>
              <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[11px] text-slate-600">{empresa.totalDevices}</span>
            </button>
            {abierta ? (
              <div className="border-t border-slate-100 bg-white">
                <div className="flex gap-1 px-2 py-1.5 text-[10px] text-slate-500">
                  <span>Online {empresa.online}</span>
                  <span>Offline {empresa.offline}</span>
                  <span>Sleep {empresa.sleep}</span>
                  <span>Alarm {empresa.alarm}</span>
                </div>
                {!empresa.devices.length ? (
                  <div className="px-3 py-3 text-xs text-slate-500">Sin dispositivos.</div>
                ) : (
                  empresa.devices.map((dispositivo) => (
                    <ItemDispositivoMonitoreo
                      key={dispositivo.id}
                      dispositivo={dispositivo}
                      visible={idsDispositivosVisibles.has(dispositivo.id)}
                      seleccionado={dispositivoSeleccionadoId === dispositivo.id}
                      onAlternarVisible={() => onAlternarDispositivoVisible(dispositivo.id)}
                      onSeleccionar={() => onSeleccionarDispositivo(dispositivo)}
                    />
                  ))
                )}
              </div>
            ) : null}
          </section>
        );
      })}
    </div>
  );
}
