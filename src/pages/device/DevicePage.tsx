import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { EncabezadoPagina } from "../../componentes/layout/EncabezadoPagina";
import { useAppText } from "../../i18n/text";
import { useDeviceOptions } from "../../hooks/useDeviceOptions";
import { useDeviceSummary } from "../../hooks/useDeviceSummary";
import { useDevices } from "../../hooks/useDevices";
import {
  batchAssignCompany,
  batchCreateDevices,
  batchDeleteDevices,
  batchModifyDevices,
  createDevice,
  deleteDevice,
  exportDevices,
  fetchDeviceDetail,
  fetchSlaveDevices,
  updateDevice,
} from "../../services/device.service";
import type { Device, DeviceFiltersState, DeviceInput } from "../../types/device.types";
import { BatchAddDevicesModal } from "./components/BatchAddDevicesModal";
import { BatchAssignCompanyModal } from "./components/BatchAssignCompanyModal";
import { BatchModifyDeviceModal } from "./components/BatchModifyDeviceModal";
import { DeleteDeviceConfirmModal } from "./components/DeleteDeviceConfirmModal";
import { DeviceDetailDrawer } from "./components/DeviceDetailDrawer";
import { DeviceFilters } from "./components/DeviceFilters";
import { DeviceFormModal } from "./components/DeviceFormModal";
import { DevicePagination } from "./components/DevicePagination";
import { DeviceSummaryCards } from "./components/DeviceSummaryCards";
import { DeviceTable } from "./components/DeviceTable";
import { DeviceToolbar } from "./components/DeviceToolbar";
import { SlaveDevicesModal } from "./components/SlaveDevicesModal";

const initialFilters: DeviceFiltersState = { page: 1, limit: 20, sortOrder: "desc" };

export function DevicePage() {
  const tr = useAppText();
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState<DeviceFiltersState>(initialFilters);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [modal, setModal] = useState<"add" | "batchAdd" | "batchModify" | "batchAssign" | "delete" | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Device | null>(null);
  const [detailId, setDetailId] = useState<string | null>(null);
  const [editDevice, setEditDevice] = useState<Device | null>(null);
  const [slaveTarget, setSlaveTarget] = useState<Device | null>(null);
  const [notice, setNotice] = useState("");

  const optionsQuery = useDeviceOptions();
  const devicesQuery = useDevices(filters);
  const summaryQuery = useDeviceSummary(filters);
  const detailQuery = useQuery({ queryKey: ["device-module", "detail", detailId], queryFn: () => fetchDeviceDetail(detailId as string), enabled: Boolean(detailId) });
  const slavesQuery = useQuery({ queryKey: ["device-module", "slaves", slaveTarget?.id], queryFn: () => fetchSlaveDevices(slaveTarget?.id as string), enabled: Boolean(slaveTarget?.id) });
  const devices = devicesQuery.data?.data ?? [];
  const pagination = devicesQuery.data?.pagination ?? { page: filters.page, limit: filters.limit, total: 0, totalPages: 0 };
  const selectedCount = selectedIds.length;

  const invalidate = async () => {
    await queryClient.invalidateQueries({ queryKey: ["device-module"] });
  };

  const createMutation = useMutation({
    mutationFn: createDevice,
    onSuccess: async () => {
      setModal(null);
      setNotice(tr("Device created successfully."));
      await invalidate();
    },
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<DeviceInput> }) => updateDevice(id, payload),
    onSuccess: async () => {
      setEditDevice(null);
      setNotice(tr("Device updated successfully."));
      await invalidate();
    },
  });
  const batchAddMutation = useMutation({ mutationFn: batchCreateDevices, onSuccess: async (result) => { setModal(null); setNotice(`${tr("Batch import completed")}: ${result.created} ${tr("created")}, ${result.skipped} ${tr("skipped")}.`); await invalidate(); } });
  const batchModifyMutation = useMutation({ mutationFn: (updates: Record<string, string>) => batchModifyDevices(selectedIds, updates), onSuccess: async () => { setModal(null); setNotice(tr("Batch update completed.")); await invalidate(); } });
  const batchAssignMutation = useMutation({ mutationFn: (companyId: string) => batchAssignCompany(selectedIds, companyId), onSuccess: async () => { setModal(null); setNotice(tr("Company assignment completed.")); await invalidate(); } });
  const deleteMutation = useMutation({
    mutationFn: () => deleteTarget ? deleteDevice(deleteTarget.id) : batchDeleteDevices(selectedIds),
    onSuccess: async () => {
      setModal(null);
      setDeleteTarget(null);
      setSelectedIds([]);
      setNotice(tr("Devices deleted successfully."));
      await invalidate();
    },
  });

  function toggleAll() {
    const ids = devices.map((device) => device.id);
    const allSelected = ids.every((id) => selectedIds.includes(id));
    setSelectedIds((current) => allSelected ? current.filter((id) => !ids.includes(id)) : Array.from(new Set([...current, ...ids])));
  }

  function toggleSort(sortBy: NonNullable<DeviceFiltersState["sortBy"]>) {
    setFilters((current) => ({
      ...current,
      sortBy,
      sortOrder: current.sortBy === sortBy && current.sortOrder === "asc" ? "desc" : "asc",
      page: 1,
    }));
  }

  async function refreshAll() {
    await Promise.all([devicesQuery.refetch(), summaryQuery.refetch(), optionsQuery.refetch()]);
  }

  async function downloadExport() {
    const blob = await exportDevices(filters);
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "devices.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <EncabezadoPagina titulo={tr("Device")} descripcion={`${tr("Home Page")} / ${tr("Device")} / ${tr("Device")}`} />
      <div className="space-y-4">
        {notice ? <div className="rounded-md border border-blue-200 bg-blue-50 px-4 py-2 text-sm text-blue-800">{notice}</div> : null}
        <DeviceSummaryCards summary={summaryQuery.data} loading={summaryQuery.isFetching || devicesQuery.isFetching} onRefresh={() => void refreshAll()} />
        <DeviceFilters filters={filters} options={optionsQuery.data} onSearch={setFilters} onReset={() => { setFilters(initialFilters); setSelectedIds([]); }} />
        <DeviceToolbar
          selectedCount={selectedCount}
          onAdd={() => setModal("add")}
          onBatchAdd={() => setModal("batchAdd")}
          onBatchModify={() => setModal("batchModify")}
          onBatchDelete={() => setModal("delete")}
          onBatchAssign={() => setModal("batchAssign")}
          onExport={() => void downloadExport()}
        />
        <DeviceTable
          devices={devices}
          selectedIds={selectedIds}
          pagination={pagination}
          filters={filters}
          loading={devicesQuery.isLoading}
          onToggle={(id) => setSelectedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])}
          onToggleAll={toggleAll}
          onSort={toggleSort}
          onDetail={(device) => setDetailId(device.id)}
          onSlaves={setSlaveTarget}
          onDelete={(device) => {
            setDeleteTarget(device);
            setModal("delete");
          }}
        />
        <DevicePagination
          pagination={pagination}
          onPageChange={(page) => setFilters((current) => ({ ...current, page }))}
          onLimitChange={(limit) => setFilters((current) => ({ ...current, limit, page: 1 }))}
        />
      </div>

      <DeviceFormModal open={modal === "add"} options={optionsQuery.data} busy={createMutation.isPending} onClose={() => setModal(null)} onSubmit={(input) => createMutation.mutate(input)} />
      <DeviceFormModal open={Boolean(editDevice)} device={editDevice} options={optionsQuery.data} busy={updateMutation.isPending} onClose={() => setEditDevice(null)} onSubmit={(input) => editDevice && updateMutation.mutate({ id: editDevice.id, payload: input })} />
      <BatchAddDevicesModal open={modal === "batchAdd"} options={optionsQuery.data} busy={batchAddMutation.isPending} onClose={() => setModal(null)} onSubmit={(rows) => batchAddMutation.mutate(rows)} />
      <BatchModifyDeviceModal open={modal === "batchModify"} selectedCount={selectedCount} options={optionsQuery.data} busy={batchModifyMutation.isPending} onClose={() => setModal(null)} onSubmit={(updates) => batchModifyMutation.mutate(updates)} />
      <BatchAssignCompanyModal open={modal === "batchAssign"} selectedCount={selectedCount} options={optionsQuery.data} busy={batchAssignMutation.isPending} onClose={() => setModal(null)} onSubmit={(companyId) => batchAssignMutation.mutate(companyId)} />
      <DeleteDeviceConfirmModal open={modal === "delete"} title={deleteTarget ? tr("Delete device") : tr("Batch delete")} busy={deleteMutation.isPending} onClose={() => { setModal(null); setDeleteTarget(null); }} onConfirm={() => deleteMutation.mutate()} />
      <DeviceDetailDrawer open={Boolean(detailId)} device={detailQuery.data} onClose={() => setDetailId(null)} onEdit={(device) => { setEditDevice(device); setDetailId(null); }} />
      <SlaveDevicesModal open={Boolean(slaveTarget)} devices={slavesQuery.data ?? []} loading={slavesQuery.isFetching} onClose={() => setSlaveTarget(null)} />
    </>
  );
}
