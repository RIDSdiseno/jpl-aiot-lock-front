import { useMemo, useState } from "react";
import { Battery, Building2, ChevronDown, ChevronRight, Cpu, LockKeyhole, MapPin, Router, Search, ShieldCheck } from "lucide-react";
import { formatearPorcentaje, obtenerLabelEstadoConexion, obtenerLabelTipoDispositivo } from "../../librerias/formatos";
import type { DispositivoArbolMonitoreo, EmpresaArbolMonitoreo } from "../../modulos/monitoreo/tipos/monitoreo.types";

function IconoDispositivo({ tipo }: { tipo: string }) {
  if (tipo === "SMART_LOCK") return <LockKeyhole className="h-4 w-4" />;
  if (tipo === "SMART_GATEWAY") return <Router className="h-4 w-4" />;
  if (tipo === "E_SEAL") return <ShieldCheck className="h-4 w-4" />;
  if (tipo === "GPS_TRACKER") return <MapPin className="h-4 w-4" />;
  return <Cpu className="h-4 w-4" />;
}

export function PanelArbolDispositivos({
  empresas,
  busqueda,
  onCambiarBusqueda,
  onSeleccionarDispositivo,
  dispositivoSeleccionadoId,
}: {
  empresas: EmpresaArbolMonitoreo[];
  busqueda: string;
  onCambiarBusqueda: (valor: string) => void;
  onSeleccionarDispositivo: (dispositivo: DispositivoArbolMonitoreo) => void;
  dispositivoSeleccionadoId?: string | null;
}) {
  const [empresasAbiertas, setEmpresasAbiertas] = useState<Set<string>>(new Set());

  const empresasFiltradas = useMemo(() => {
    const termino = busqueda.trim().toLowerCase();
    if (!termino) return empresas;
    return empresas
      .map((empresa) => ({
        ...empresa,
        devices: empresa.devices.filter(
          (dispositivo) =>
            dispositivo.name.toLowerCase().includes(termino) ||
            dispositivo.internalCode.toLowerCase().includes(termino) ||
            empresa.name.toLowerCase().includes(termino),
        ),
      }))
      .filter((empresa) => empresa.name.toLowerCase().includes(termino) || empresa.devices.length > 0);
  }, [busqueda, empresas]);

  function alternarEmpresa(id: string) {
    setEmpresasAbiertas((actual) => {
      const siguiente = new Set(actual);
      if (siguiente.has(id)) siguiente.delete(id);
      else siguiente.add(id);
      return siguiente;
    });
  }

  return (
    <section className="flex min-h-0 flex-1 flex-col rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 p-3">
        <label className="relative block">
          <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            value={busqueda}
            onChange={(event) => onCambiarBusqueda(event.target.value)}
            placeholder="Buscar empresa o dispositivo"
            className="w-full rounded-md border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </label>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto p-2">
        {!empresasFiltradas.length ? (
          <div className="p-4 text-sm text-slate-500">No hay empresas o dispositivos para mostrar.</div>
        ) : (
          empresasFiltradas.map((empresa) => {
            const abierta = empresasAbiertas.has(empresa.id) || Boolean(busqueda.trim());
            return (
              <div key={empresa.id} className="mb-2 rounded-md border border-slate-100">
                <button
                  type="button"
                  onClick={() => alternarEmpresa(empresa.id)}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-slate-50"
                >
                  {abierta ? <ChevronDown className="h-4 w-4 text-slate-400" /> : <ChevronRight className="h-4 w-4 text-slate-400" />}
                  <Building2 className="h-4 w-4 text-blue-600" />
                  <span className="min-w-0 flex-1 truncate font-medium text-slate-800">{empresa.name}</span>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">{empresa.totalDevices}</span>
                </button>
                {abierta ? (
                  <div className="space-y-1 border-t border-slate-100 p-2">
                    {!empresa.devices.length ? (
                      <div className="px-2 py-2 text-xs text-slate-500">Sin dispositivos.</div>
                    ) : (
                      empresa.devices.map((dispositivo) => (
                        <button
                          type="button"
                          key={dispositivo.id}
                          onClick={() => onSeleccionarDispositivo(dispositivo)}
                          className={`w-full rounded-md px-2 py-2 text-left text-sm transition ${
                            dispositivoSeleccionadoId === dispositivo.id ? "bg-blue-50 text-blue-800" : "hover:bg-slate-50"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-slate-500"><IconoDispositivo tipo={dispositivo.type} /></span>
                            <span className="min-w-0 flex-1 truncate font-medium">{dispositivo.name}</span>
                          </div>
                          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 pl-6 text-xs text-slate-500">
                            <span>{dispositivo.internalCode}</span>
                            <span>{obtenerLabelEstadoConexion(dispositivo.connectionStatus)}</span>
                            <span title={obtenerLabelTipoDispositivo(dispositivo.type)}>{obtenerLabelTipoDispositivo(dispositivo.type)}</span>
                            {dispositivo.batteryLevel !== null && dispositivo.batteryLevel !== undefined ? (
                              <span className="inline-flex items-center gap-1">
                                <Battery className="h-3 w-3" />
                                {formatearPorcentaje(dispositivo.batteryLevel)}
                              </span>
                            ) : null}
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                ) : null}
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
