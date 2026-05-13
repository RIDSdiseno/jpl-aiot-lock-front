import type { DevicePagination as Pagination } from "../../../types/device.types";

export function DevicePagination({
  pagination,
  onPageChange,
  onLimitChange,
}: {
  pagination: Pagination;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}) {
  const totalPages = Math.max(pagination.totalPages, 1);
  return (
    <div className="flex flex-col gap-3 border-t border-slate-200 px-4 py-3 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
      <div>Total {pagination.total} records</div>
      <div className="flex items-center gap-2">
        <button type="button" className="rounded-md border border-slate-200 px-3 py-1 disabled:opacity-50" disabled={pagination.page <= 1} onClick={() => onPageChange(pagination.page - 1)}>
          Previous
        </button>
        <span>Page {pagination.page} / {totalPages}</span>
        <button type="button" className="rounded-md border border-slate-200 px-3 py-1 disabled:opacity-50" disabled={pagination.page >= totalPages} onClick={() => onPageChange(pagination.page + 1)}>
          Next
        </button>
        <select className="rounded-md border border-slate-200 px-2 py-1" value={pagination.limit} onChange={(event) => onLimitChange(Number(event.target.value))}>
          {[20, 50, 100].map((limit) => <option key={limit} value={limit}>{limit}/page</option>)}
        </select>
      </div>
    </div>
  );
}
