import type { ResumenTipoDispositivo } from "../../modulos/inicio/tipos/inicio.types";
import { TarjetaResumenDispositivo } from "./TarjetaResumenDispositivo";

export function TarjetasResumenDispositivos({ items }: { items: ResumenTipoDispositivo[] }) {
  return <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">{items.map((item) => <TarjetaResumenDispositivo key={item.type} {...item} />)}</div>;
}
