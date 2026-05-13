import type { ReportPagination as Pagination } from "../../../types/report.types";

export function ReportPagination({ pagination, onPageChange, onLimitChange }: { pagination: Pagination; onPageChange: (page: number) => void; onLimitChange: (limit: number) => void }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
      <div>Total {pagination.total} records</div>
      <div className="flex items-center gap-2">
        <select className="rounded-md border border-slate-200 px-2 py-1" value={pagination.limit} onChange={(event) => onLimitChange(Number(event.target.value))}>
          {[20, 50, 100].map((limit) => <option key={limit} value={limit}>{limit}/page</option>)}
        </select>
        <button className="rounded-md border border-slate-200 px-3 py-1 disabled:opacity-50" disabled={pagination.page <= 1} onClick={() => onPageChange(pagination.page - 1)} type="button">Prev</button>
        <span>Page {pagination.page} of {Math.max(1, pagination.totalPages)}</span>
        <button className="rounded-md border border-slate-200 px-3 py-1 disabled:opacity-50" disabled={pagination.page >= pagination.totalPages} onClick={() => onPageChange(pagination.page + 1)} type="button">Next</button>
      </div>
    </div>
  );
}
