import type { Pagination } from "../../../types/userCenter.types";
import { useAppText } from "../../../i18n/text";

export function UserCenterPagination({
  pagination,
  onPageChange,
  onLimitChange,
}: {
  pagination: Pagination;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}) {
  const tr = useAppText();
  const from = pagination.total === 0 ? 0 : (pagination.page - 1) * pagination.limit + 1;
  const to = Math.min(pagination.page * pagination.limit, pagination.total);
  return (
    <div className="flex flex-col gap-3 border-t border-slate-100 px-4 py-3 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
      <span>{from}-{to} {tr("of")} {pagination.total}</span>
      <div className="flex items-center gap-2">
        <select className="rounded-md border border-slate-200 px-2 py-1" value={pagination.limit} onChange={(event) => onLimitChange(Number(event.target.value))}>
          {[20, 50, 100].map((limit) => <option key={limit} value={limit}>{limit}/{tr("page")}</option>)}
        </select>
        <button className="rounded-md border border-slate-200 px-3 py-1 disabled:opacity-50" disabled={pagination.page <= 1} onClick={() => onPageChange(pagination.page - 1)}>{tr("Prev")}</button>
        <span className="min-w-16 text-center">{pagination.page} / {Math.max(pagination.totalPages, 1)}</span>
        <button className="rounded-md border border-slate-200 px-3 py-1 disabled:opacity-50" disabled={pagination.page >= pagination.totalPages} onClick={() => onPageChange(pagination.page + 1)}>{tr("Next")}</button>
      </div>
    </div>
  );
}
