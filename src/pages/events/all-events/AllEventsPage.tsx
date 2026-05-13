import { useState } from "react";
import { EstadoCarga } from "../../../componentes/comunes/EstadoCarga";
import { EventsLayout } from "../EventsLayout";
import { EventPagination } from "../components/EventPagination";
import { EventDetailDrawer } from "../components/EventDetailDrawer";
import { EventImageModal } from "../components/EventImageModal";
import { EventMapModal } from "../components/EventMapModal";
import { EventTableToolbar } from "../components/EventTableToolbar";
import { useEventOptions } from "../hooks/useEventOptions";
import { exportAllEvents } from "../services/all-events.service";
import type { DeviceEventItem, EventQueryParams } from "../types/events.types";
import { AllEventsFilters } from "./components/AllEventsFilters";
import { AllEventsTable } from "./components/AllEventsTable";
import { useAllEvents } from "./hooks/useAllEvents";

const initialFilters: EventQueryParams = { page: 1, pageSize: 20 };

export function AllEventsPage() {
  const [draftFilters, setDraftFilters] = useState<EventQueryParams>(initialFilters);
  const [filters, setFilters] = useState<EventQueryParams>(initialFilters);
  const [selected, setSelected] = useState<DeviceEventItem | null>(null);
  const [mapItem, setMapItem] = useState<DeviceEventItem | null>(null);
  const [imageItem, setImageItem] = useState<DeviceEventItem | null>(null);
  const query = useAllEvents(filters);
  const options = useEventOptions();
  const page = query.data?.page ?? filters.page ?? 1;
  const pageSize = query.data?.pageSize ?? filters.pageSize ?? 20;

  return (
    <EventsLayout section="Todos los eventos">
      <AllEventsFilters
        filters={draftFilters}
        onChange={setDraftFilters}
        onSearch={() => setFilters({ ...draftFilters, page: 1 })}
        onReset={() => {
          setDraftFilters(initialFilters);
          setFilters(initialFilters);
        }}
        options={options.data}
      />
      <EventTableToolbar isLoading={query.isFetching} onRefresh={() => void query.refetch()} onExport={() => void exportAllEvents(filters)} />
      <div className="overflow-hidden rounded-md border border-slate-200">
        {query.isLoading ? <EstadoCarga /> : <AllEventsTable items={query.data?.items ?? []} onDetail={setSelected} onMap={setMapItem} onImage={setImageItem} />}
        <EventPagination
          page={page}
          pageSize={pageSize}
          total={query.data?.total ?? 0}
          onPageChange={(nextPage) => setFilters((current) => ({ ...current, page: nextPage }))}
          onPageSizeChange={(nextPageSize) => setFilters((current) => ({ ...current, page: 1, pageSize: nextPageSize }))}
        />
      </div>
      <EventDetailDrawer item={selected} onClose={() => setSelected(null)} />
      <EventMapModal abierto={Boolean(mapItem)} latitude={mapItem?.latitude} longitude={mapItem?.longitude} onCerrar={() => setMapItem(null)} />
      <EventImageModal abierto={Boolean(imageItem)} imageUrl={imageItem?.eventImageUrl} onCerrar={() => setImageItem(null)} />
    </EventsLayout>
  );
}
