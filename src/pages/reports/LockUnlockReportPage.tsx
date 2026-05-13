import { useMemo, useState } from "react";
import { EstadoCarga } from "../../componentes/comunes/EstadoCarga";
import { useLockUnlockReport } from "../../hooks/useLockUnlockReport";
import { useReportOptions } from "../../hooks/useReportOptions";
import { useAppText } from "../../i18n/text";
import { exportLockUnlockReport } from "../../services/reports.service";
import type { LockUnlockReportFilters, LockUnlockReportItem } from "../../types/report.types";
import { ReportDetailDrawer } from "./components/ReportDetailDrawer";
import { ReportFilters } from "./components/ReportFilters";
import { ReportImageModal } from "./components/ReportImageModal";
import { ReportLayout } from "./components/ReportLayout";
import { ReportMapModal } from "./components/ReportMapModal";
import { ReportPagination } from "./components/ReportPagination";
import { ReportTable } from "./components/ReportTable";
import { ReportToolbar } from "./components/ReportToolbar";

const initialFilters: LockUnlockReportFilters = {
  page: 1,
  limit: 20,
  sortBy: "gpsTime",
  sortOrder: "DESC",
};

export function LockUnlockReportPage() {
  const tr = useAppText();
  const [draftFilters, setDraftFilters] = useState<LockUnlockReportFilters>(initialFilters);
  const [filters, setFilters] = useState<LockUnlockReportFilters>(initialFilters);
  const [selected, setSelected] = useState<LockUnlockReportItem | null>(null);
  const [mapItem, setMapItem] = useState<LockUnlockReportItem | null>(null);
  const [imageItem, setImageItem] = useState<LockUnlockReportItem | null>(null);
  const options = useReportOptions();
  const query = useLockUnlockReport(filters);
  const dateError = useMemo(() => validateDateRange(draftFilters.startDate, draftFilters.endDate, tr), [draftFilters.startDate, draftFilters.endDate, tr]);
  const pagination = query.data?.pagination ?? { page: filters.page ?? 1, limit: filters.limit ?? 20, total: 0, totalPages: 0 };

  return (
    <ReportLayout title="Lock&Unlock">
      <ReportFilters
        filters={draftFilters}
        options={options.data}
        error={dateError}
        onChange={setDraftFilters}
        onSearch={() => setFilters({ ...draftFilters, page: 1 })}
        onReset={() => {
          setDraftFilters(initialFilters);
          setFilters(initialFilters);
        }}
      />
      <ReportToolbar isLoading={query.isFetching} onRefresh={() => void query.refetch()} onExport={() => void exportLockUnlockReport(filters)} />
      <div className="overflow-hidden rounded-b-md border border-slate-200">
        {query.isLoading ? (
          <div className="bg-white"><EstadoCarga /></div>
        ) : (
          <ReportTable
            items={query.data?.data ?? []}
            sortBy={filters.sortBy}
            sortOrder={filters.sortOrder}
            onSort={(sortBy) => {
              setFilters((current) => ({
                ...current,
                page: 1,
                sortBy,
                sortOrder: current.sortBy === sortBy && current.sortOrder === "ASC" ? "DESC" : "ASC",
              }));
            }}
            onDetail={setSelected}
            onMap={setMapItem}
            onImage={setImageItem}
          />
        )}
        <ReportPagination
          pagination={pagination}
          onPageChange={(page) => setFilters((current) => ({ ...current, page }))}
          onLimitChange={(limit) => setFilters((current) => ({ ...current, page: 1, limit }))}
        />
      </div>
      <ReportDetailDrawer item={selected} onClose={() => setSelected(null)} />
      <ReportMapModal abierto={Boolean(mapItem)} latitude={mapItem?.latitude} longitude={mapItem?.longitude} onCerrar={() => setMapItem(null)} />
      <ReportImageModal abierto={Boolean(imageItem)} imageUrl={imageItem?.eventImageUrl} onCerrar={() => setImageItem(null)} />
    </ReportLayout>
  );
}

function validateDateRange(startDate: string | undefined, endDate: string | undefined, tr: (text: string) => string) {
  if (!startDate || !endDate) return undefined;
  return new Date(startDate).getTime() > new Date(endDate).getTime() ? tr("Start date cannot be greater than end date") : undefined;
}
