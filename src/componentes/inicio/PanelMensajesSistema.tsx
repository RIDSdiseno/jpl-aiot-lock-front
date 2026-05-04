import { formatearFecha } from "../../librerias/fechas";
import type { MensajeSistema } from "../../modulos/inicio/tipos/inicio.types";
import { EstadoVacio } from "../comunes/EstadoVacio";
import { Tarjeta } from "../comunes/Tarjeta";

export function PanelMensajesSistema({ mensajes }: { mensajes: MensajeSistema[] }) {
  return (
    <Tarjeta>
      <h2 className="mb-4 font-semibold text-slate-900">Mensajes del sistema</h2>
      {!mensajes.length ? <EstadoVacio titulo="Sin mensajes" /> : mensajes.map((mensaje) => (
        <div key={mensaje.id} className="border-b border-slate-100 py-3 last:border-0">
          <p className="text-sm font-medium text-slate-800">{mensaje.titulo}</p>
          <p className="text-xs text-slate-500">{mensaje.descripcion} · {formatearFecha(mensaje.fecha)}</p>
        </div>
      ))}
    </Tarjeta>
  );
}
