import { useState } from "react";
import { EstadoCarga } from "../../../componentes/comunes/EstadoCarga";
import { EventsLayout } from "../EventsLayout";
import { EventPagination } from "../components/EventPagination";
import { EventDetailDrawer } from "../components/EventDetailDrawer";
import { EventImageModal } from "../components/EventImageModal";
import { EventMapModal } from "../components/EventMapModal";
import { EventTableToolbar } from "../components/EventTableToolbar";
import { useEventOptions } from "../hooks/useEventOptions";
import { exportAlarmEvents } from "../services/alarm-events.service";
import { updateAlarmEventStatus } from "../services/events.service";
import type { AlarmEventItem, EventQueryParams } from "../types/events.types";
import { AlarmEventsFilters } from "./components/AlarmEventsFilters";
import { AlarmEventsTable } from "./components/AlarmEventsTable";
import { useAlarmEvents } from "./hooks/useAlarmEvents";

const initialFilters: EventQueryParams = { page: 1, pageSize: 20 };

export function AlarmEventsPage() {
  const [draftFilters, setDraftFilters] = useState<EventQueryParams>(initialFilters);
  const [filters, setFilters] = useState<EventQueryParams>(initialFilters);
  const [selected, setSelected] = useState<AlarmEventItem | null>(null);
  const [mapItem, setMapItem] = useState<AlarmEventItem | null>(null);
  const [imageItem, setImageItem] = useState<AlarmEventItem | null>(null);
  const query = useAlarmEvents(filters);
  const options = useEventOptions();
  const page = query.data?.page ?? filters.page ?? 1;
  const pageSize = query.data?.pageSize ?? filters.pageSize ?? 20;

  return (
    <EventsLayout section="Eventos de alarma">
      <AlarmEventsFilters
        filters={draftFilters}
        onChange={setDraftFilters}
        onSearch={() => setFilters({ ...draftFilters, page: 1 })}
        onReset={() => {
          setDraftFilters(initialFilters);
          setFilters(initialFilters);
        }}
        options={options.data}
      />
      <EventTableToolbar isLoading={query.isFetching} onRefresh={() => void query.refetch()} onExport={() => void exportAlarmEvents(filters)} />
      <div className="overflow-hidden rounded-md border border-slate-200">
        {query.isLoading ? <EstadoCarga /> : <AlarmEventsTable items={query.data?.items ?? []} onDetail={setSelected} onMap={setMapItem} onImage={setImageItem} />}
        <EventPagination
          page={page}
          pageSize={pageSize}
          total={query.data?.total ?? 0}
          onPageChange={(nextPage) => setFilters((current) => ({ ...current, page: nextPage }))}
          onPageSizeChange={(nextPageSize) => setFilters((current) => ({ ...current, page: 1, pageSize: nextPageSize }))}
        />
      </div>
      <EventDetailDrawer
        item={selected}
        onClose={() => setSelected(null)}
        onAlarmStatusChange={(status) => {
          if (!selected) return;
          void updateAlarmEventStatus(selected.id, status).then(() => {
            setSelected({ ...selected, status, handledStatus: status });
            void query.refetch();
          });
        }}
      />
      <EventMapModal abierto={Boolean(mapItem)} latitude={mapItem?.latitude} longitude={mapItem?.longitude} onCerrar={() => setMapItem(null)} />
      <EventImageModal abierto={Boolean(imageItem)} imageUrl={imageItem?.eventImageUrl} onCerrar={() => setImageItem(null)} />
    </EventsLayout>
  );
}
