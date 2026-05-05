import { Crosshair } from "lucide-react";
import { useMap } from "react-leaflet";

export function ControlCentrarMapa({ centro, zoom = 14 }: { centro: [number, number]; zoom?: number }) {
  const map = useMap();

  return (
    <button
      type="button"
      onClick={() => map.flyTo(centro, zoom, { duration: 0.7 })}
      className="absolute bottom-4 right-4 z-[500] inline-flex h-10 w-10 items-center justify-center rounded border border-slate-200 bg-white text-slate-700 shadow-md hover:bg-slate-50"
      title="Centrar mapa"
    >
      <Crosshair className="h-4 w-4" />
    </button>
  );
}
