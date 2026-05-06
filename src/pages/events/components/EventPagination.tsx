import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

export function EventPagination({ page, pageSize, total, onPageChange, onPageSizeChange }: Props) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const pages = Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
    const start = Math.max(1, Math.min(page - 2, totalPages - 4));
    return start + index;
  }).filter((item) => item <= totalPages);

  return (
    <div className="flex flex-col gap-3 border-t border-slate-100 bg-white px-4 py-3 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
      <span>Total {total} registros</span>
      <div className="flex flex-wrap items-center gap-2">
        <button className="rounded-md border border-slate-200 p-2 disabled:opacity-40" disabled={page <= 1} onClick={() => onPageChange(page - 1)} type="button">
          <ChevronLeft className="h-4 w-4" />
        </button>
        {pages.map((item) => (
          <button
            className={`h-9 min-w-9 rounded-md border px-3 ${item === page ? "border-blue-600 bg-blue-600 text-white" : "border-slate-200 bg-white text-slate-700"}`}
            key={item}
            onClick={() => onPageChange(item)}
            type="button"
          >
            {item}
          </button>
        ))}
        <button className="rounded-md border border-slate-200 p-2 disabled:opacity-40" disabled={page >= totalPages} onClick={() => onPageChange(page + 1)} type="button">
          <ChevronRight className="h-4 w-4" />
        </button>
        <select className="h-9 rounded-md border border-slate-200 bg-white px-2" value={pageSize} onChange={(event) => onPageSizeChange(Number(event.target.value))}>
          {[10, 20, 50].map((size) => (
            <option key={size} value={size}>
              {size}/page
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
