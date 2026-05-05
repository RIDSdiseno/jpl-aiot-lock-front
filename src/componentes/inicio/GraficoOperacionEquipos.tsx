import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { DEVICE_CONNECTION_STATUS_LABELS } from "../../librerias/constantes";
import type { ResumenConexion } from "../../modulos/inicio/tipos/inicio.types";
import { Tarjeta } from "../comunes/Tarjeta";

const colores = ["#10b981", "#ef4444", "#f59e0b", "#6366f1", "#94a3b8"];

export function GraficoOperacionEquipos({ datos }: { datos: ResumenConexion[] }) {
  const data = datos.map((item) => ({ name: DEVICE_CONNECTION_STATUS_LABELS[item.status], value: item.total }));
  return (
    <Tarjeta>
      <h2 className="mb-4 font-semibold text-slate-900">Ratio de operación de equipos</h2>
      <div className="h-[280px] min-h-[280px] w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} innerRadius={70} outerRadius={105} dataKey="value" nameKey="name" paddingAngle={3}>
              {data.map((_, index) => <Cell key={index} fill={colores[index % colores.length]} />)}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
        {data.map((item, index) => <span key={item.name}><span className="mr-2 inline-block h-2 w-2 rounded-full" style={{ backgroundColor: colores[index] }} />{item.name}: {item.value}</span>)}
      </div>
    </Tarjeta>
  );
}
