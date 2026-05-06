import { useState } from "react";
import { EstadoCarga } from "../../../componentes/comunes/EstadoCarga";
import { EventsLayout } from "../EventsLayout";
import { EventPagination } from "../components/EventPagination";
import { EventTableToolbar } from "../components/EventTableToolbar";
import { exportPushEvents } from "../services/push-events.service";
import type { EventQueryParams } from "../types/events.types";
import { PushEventsFilters } from "./components/PushEventsFilters";
import { PushEventsTable } from "./components/PushEventsTable";
import { usePushEvents } from "./hooks/usePushEvents";

const initialFilters: EventQueryParams = { page: 1, pageSize: 20 };

export function PushEventsPage() {
  const [draftFilters, setDraftFilters] = useState<EventQueryParams>(initialFilters);
  const [filters, setFilters] = useState<EventQueryParams>(initialFilters);
  const query = usePushEvents(filters);
  const page = query.data?.page ?? filters.page ?? 1;
  const pageSize = query.data?.pageSize ?? filters.pageSize ?? 20;

  return (
    <EventsLayout section="Eventos push">
      <PushEventsFilters
        filters={draftFilters}
        onChange={setDraftFilters}
        onSearch={() => setFilters({ ...draftFilters, page: 1 })}
        onReset={() => {
          setDraftFilters(initialFilters);
          setFilters(initialFilters);
        }}
      />
      <EventTableToolbar isLoading={query.isFetching} onRefresh={() => void query.refetch()} onExport={() => void exportPushEvents(filters)} />
      <div className="overflow-hidden rounded-md border border-slate-200">
        {query.isLoading ? <EstadoCarga /> : <PushEventsTable items={query.data?.items ?? []} />}
        <EventPagination
          page={page}
          pageSize={pageSize}
          total={query.data?.total ?? 0}
          onPageChange={(nextPage) => setFilters((current) => ({ ...current, page: nextPage }))}
          onPageSizeChange={(nextPageSize) => setFilters((current) => ({ ...current, page: 1, pageSize: nextPageSize }))}
        />
      </div>
    </EventsLayout>
  );
}
