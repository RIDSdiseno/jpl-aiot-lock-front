import { Download, FilePenLine, FilePlus2, Plus, Trash2, Building2 } from "lucide-react";
import { useAppText } from "../../../i18n/text";

export function DeviceToolbar({
  selectedCount,
  onAdd,
  onBatchAdd,
  onBatchModify,
  onBatchDelete,
  onBatchAssign,
  onExport,
}: {
  selectedCount: number;
  onAdd: () => void;
  onBatchAdd: () => void;
  onBatchModify: () => void;
  onBatchDelete: () => void;
  onBatchAssign: () => void;
  onExport: () => void;
}) {
  const tr = useAppText();
  const disabled = selectedCount === 0;
  const secondary = "inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50";
  return (
    <div className="flex flex-wrap items-center gap-2">
      <button type="button" onClick={onAdd} className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700">
        <Plus className="h-4 w-4" />
        {tr("Add")}
      </button>
      <button type="button" onClick={onBatchAdd} className={secondary}><FilePlus2 className="h-4 w-4" />{tr("Batch add")}</button>
      <button type="button" disabled={disabled} onClick={onBatchModify} className={secondary}><FilePenLine className="h-4 w-4" />{tr("Batch modify device info")}</button>
      <button type="button" disabled={disabled} onClick={onBatchDelete} className="inline-flex items-center gap-2 rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50">
        <Trash2 className="h-4 w-4" />
        {tr("Batch delete")}
      </button>
      <button type="button" disabled={disabled} onClick={onBatchAssign} className={secondary}><Building2 className="h-4 w-4" />{tr("Batch assign companies")}</button>
      <button type="button" onClick={onExport} className={secondary}><Download className="h-4 w-4" />{tr("Export")}</button>
      {selectedCount > 0 ? <span className="ml-1 text-sm text-slate-500">{selectedCount} selected</span> : null}
    </div>
  );
}
