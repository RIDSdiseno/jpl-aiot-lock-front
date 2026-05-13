export function EmptyReportState() {
  return (
    <div className="grid min-h-56 place-items-center bg-white p-8 text-center">
      <div>
        <div className="text-sm font-semibold text-slate-800">No data found for the selected filters.</div>
        <div className="mt-1 text-sm text-slate-500">Adjust the filters or reset the report.</div>
      </div>
    </div>
  );
}
