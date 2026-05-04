import { Eye, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { formatearFecha } from "../../librerias/fechas";
import { formatearPorcentaje } from "../../librerias/formatos";
import type { Dispositivo } from "../../modulos/dispositivos/tipos/dispositivo.types";
import { Boton } from "../comunes/Boton";
import { TablaDatos } from "../comunes/TablaDatos";
import { InsigniaEstadoDispositivo } from "./InsigniaEstadoDispositivo";
import { InsigniaTipoDispositivo } from "./InsigniaTipoDispositivo";

export function TablaDispositivos({ dispositivos }: { dispositivos: Dispositivo[] }) {
  return (
    <TablaDatos
      datos={dispositivos}
      obtenerClave={(item) => item.id}
      columnas={[
        { key: "nombre", titulo: "Dispositivo", render: (d) => <div><div className="font-medium text-slate-900">{d.name}</div><div className="text-xs text-slate-500">{d.internalCode}</div></div> },
        { key: "tipo", titulo: "Tipo", render: (d) => <InsigniaTipoDispositivo tipo={d.type} /> },
        { key: "estado", titulo: "Estado", render: (d) => <InsigniaEstadoDispositivo estado={d.status} /> },
        { key: "conexion", titulo: "Conexión", render: (d) => <InsigniaEstadoDispositivo estado={d.connectionStatus} /> },
        { key: "energia", titulo: "Batería / señal", render: (d) => <span>{formatearPorcentaje(d.batteryLevel)} / {formatearPorcentaje(d.signalLevel)}</span> },
        { key: "ultima", titulo: "Última conexión", render: (d) => formatearFecha(d.lastConnectionAt) },
        { key: "acciones", titulo: "Acciones", render: (d) => <div className="flex gap-1"><Link to={`/app/dispositivos/${d.id}`}><Boton variante="fantasma" icono={<Eye className="h-4 w-4" />} /></Link><Boton variante="fantasma" icono={<Pencil className="h-4 w-4" />} /><Boton variante="fantasma" icono={<Trash2 className="h-4 w-4" />} /></div> },
      ]}
    />
  );
}
