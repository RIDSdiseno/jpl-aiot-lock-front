import { CalendarClock, FileClock, Radio, Save, UploadCloud } from "lucide-react";
import { Boton } from "../../../../componentes/comunes/Boton";
import { useAppText } from "../../../../i18n/text";

export function ParameterActions({
  onBatchReserve,
  onReservationRecord,
  onReservation,
  onRead,
  onUpdate,
  disabled,
  busy,
}: {
  onBatchReserve: () => void;
  onReservationRecord: () => void;
  onReservation: () => void;
  onRead: () => void;
  onUpdate: () => void;
  disabled?: boolean;
  busy?: boolean;
}) {
  const tr = useAppText();
  return (
    <div className="flex flex-wrap gap-2 rounded border border-slate-200 bg-white p-4">
      <Boton type="button" variante="secundario" icono={<UploadCloud className="h-4 w-4" />} onClick={onBatchReserve} disabled={disabled}>
        {tr("Batch Reserve Command")}
      </Boton>
      <Boton type="button" variante="secundario" icono={<FileClock className="h-4 w-4" />} onClick={onReservationRecord} disabled={disabled}>
        {tr("Reservation CMD record")}
      </Boton>
      <Boton type="button" variante="secundario" icono={<CalendarClock className="h-4 w-4" />} onClick={onReservation} disabled={disabled}>
        {tr("Reservation CMD")}
      </Boton>
      <Boton type="button" variante="secundario" icono={<Radio className="h-4 w-4" />} onClick={onRead} disabled={busy}>
        {busy ? tr("Reading...") : tr("Read")}
      </Boton>
      <Boton type="button" icono={<Save className="h-4 w-4" />} onClick={onUpdate} disabled={busy}>
        {tr("Parameter update")}
      </Boton>
    </div>
  );
}
