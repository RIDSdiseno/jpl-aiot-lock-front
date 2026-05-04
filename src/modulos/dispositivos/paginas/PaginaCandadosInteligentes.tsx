import { History, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Boton } from "../../../componentes/comunes/Boton";
import { EstadoCarga } from "../../../componentes/comunes/EstadoCarga";
import { BotonesComandoDispositivo } from "../../../componentes/dispositivos/BotonesComandoDispositivo";
import { TarjetaDispositivo } from "../../../componentes/dispositivos/TarjetaDispositivo";
import { EncabezadoPagina } from "../../../componentes/layout/EncabezadoPagina";
import { useDispositivos } from "../hooks/useDispositivos";

export function PaginaCandadosInteligentes() {
  const { data = [], isLoading } = useDispositivos({ type: "SMART_LOCK" });
  return (
    <>
      <EncabezadoPagina titulo="Candados inteligentes" descripcion="Control operacional de dispositivos SMART_LOCK." />
      {isLoading ? <EstadoCarga /> : (
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {data.map((dispositivo) => (
            <div key={dispositivo.id} className="space-y-3">
              <TarjetaDispositivo dispositivo={dispositivo} />
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <BotonesComandoDispositivo dispositivoId={dispositivo.id} />
                <div className="mt-3 flex flex-wrap gap-2">
                  <Boton variante="secundario" icono={<History className="h-4 w-4" />}>Ver historial</Boton>
                  <Boton variante="secundario" icono={<MapPin className="h-4 w-4" />}>Ver ubicación</Boton>
                  <Link to={`/app/dispositivos/${dispositivo.id}`}><Boton variante="secundario">Ver detalle</Boton></Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
