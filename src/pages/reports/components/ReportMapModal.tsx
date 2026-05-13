import { Copy, ExternalLink } from "lucide-react";
import { Boton } from "../../../componentes/comunes/Boton";
import { Modal } from "../../../componentes/comunes/Modal";

export function ReportMapModal({ abierto, latitude, longitude, onCerrar }: { abierto: boolean; latitude?: number | null; longitude?: number | null; onCerrar: () => void }) {
  const valid = isValidCoordinate(latitude, longitude);
  const coords = valid ? `${latitude!.toFixed(6)}, ${longitude!.toFixed(6)}` : "";
  const mapsUrl = valid ? `https://www.google.com/maps?q=${latitude},${longitude}` : "";

  return (
    <Modal abierto={abierto} titulo="Report position" onCerrar={onCerrar}>
      {valid ? (
        <div className="space-y-4">
          <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
            <div className="text-xs font-medium uppercase text-slate-500">Coordinates</div>
            <div className="mt-1 font-mono text-sm text-slate-900">{coords}</div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Boton variante="secundario" icono={<Copy className="h-4 w-4" />} onClick={() => void navigator.clipboard?.writeText(coords)} type="button">Copy coordinates</Boton>
            <a className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700" href={mapsUrl} target="_blank" rel="noreferrer">
              <ExternalLink className="h-4 w-4" /> Open in Google Maps
            </a>
          </div>
        </div>
      ) : (
        <p className="text-sm text-slate-600">No valid GPS position available for this record.</p>
      )}
    </Modal>
  );
}

function isValidCoordinate(lat?: number | null, lng?: number | null) {
  return typeof lat === "number" && typeof lng === "number" && Number.isFinite(lat) && Number.isFinite(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
}
