import { formatearFecha } from "../../librerias/fechas";
import type { EventoPush } from "../../modulos/inicio/tipos/inicio.types";
import { EstadoVacio } from "../comunes/EstadoVacio";
import { Tarjeta } from "../comunes/Tarjeta";

export function PanelEventosPush({ eventos }: { eventos: EventoPush[] }) {
  return (
    <Tarjeta>
      <h2 className="mb-4 font-semibold text-slate-900">Eventos Push</h2>
      {!eventos.length ? <EstadoVacio titulo="Sin eventos push" /> : eventos.map((evento) => (
        <div key={evento.id} className="border-b border-slate-100 py-3 last:border-0">
          <p className="text-sm font-medium text-slate-800">{evento.mensaje}</p>
          <p className="text-xs text-slate-500">{evento.dispositivo} · {formatearFecha(evento.fecha)}</p>
        </div>
      ))}
    </Tarjeta>
  );
}
