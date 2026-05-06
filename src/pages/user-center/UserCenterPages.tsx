import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { KeyRound, Plus } from "lucide-react";
import { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { Boton } from "../../componentes/comunes/Boton";
import { Modal } from "../../componentes/comunes/Modal";
import { EncabezadoPagina } from "../../componentes/layout/EncabezadoPagina";
import { useI18n } from "../../i18n/i18nStore";
import { api, extraerDatos } from "../../librerias/api";
import { formatearFecha } from "../../librerias/fechas";

type Company = { id: string; name: string; companyName?: string; contactName?: string | null; email?: string | null; phone?: string | null; status: string; createdAt: string };
type Role = { id: string; name: string; roleName?: string; description?: string | null; createdAt: string; permissions?: string[] };
type User = { id: string; username: string; nickname: string; email: string; phone?: string | null; companyId?: string | null; companyName?: string | null; roleId?: string | null; roleName?: string | null; accountStatus: string; createdAt: string };

export function OrganizationPage() {
  const { t } = useI18n();
  const labels = t.userCenter ?? {};
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const companies = useQuery({ queryKey: ["organizations"], queryFn: async () => extraerDatos<Company[]>(await api.get("/user-center/organizations")) });
  const save = useMutation({ mutationFn: (payload: Record<string, unknown>) => api.post("/user-center/organizations", payload), onSuccess: () => { setOpen(false); void queryClient.invalidateQueries({ queryKey: ["organizations"] }); } });
  return (
    <>
      <EncabezadoPagina titulo={labels.organization ?? "Organization"} descripcion={`${labels.title ?? "User Center"} / ${labels.organization ?? "Organization"}`} acciones={<Boton icono={<Plus className="h-4 w-4" />} onClick={() => setOpen(true)}>{labels.addCompany ?? "Add company"}</Boton>} />
      <DataTable headers={["Sort No.", labels.companyName, labels.contact, labels.email, labels.phone, labels.pushStatus, "Status", "Create time", "Operate"]} rows={(companies.data ?? []).map((item, index) => [index + 1, item.companyName ?? item.name, item.contactName ?? "-", item.email ?? "-", item.phone ?? "-", "ON", item.status, formatearFecha(item.createdAt), `${labels.edit} / ${labels.delete}`])} />
      <Modal abierto={open} titulo={labels.addCompany ?? "Add company"} onCerrar={() => setOpen(false)}>
        <form className="grid gap-3" onSubmit={(event) => submitCompany(event, save.mutate)}>
          <input name="companyName" required className="rounded border px-3 py-2 text-sm" placeholder={labels.companyName} />
          <input name="contactName" className="rounded border px-3 py-2 text-sm" placeholder={labels.contact} />
          <input name="email" type="email" className="rounded border px-3 py-2 text-sm" placeholder={labels.email} />
          <input name="phone" className="rounded border px-3 py-2 text-sm" placeholder={labels.phone} />
          <input name="timezone" required defaultValue="America/Santiago" className="rounded border px-3 py-2 text-sm" placeholder={labels.timezone} />
          <Boton>{labels.confirm ?? "Confirm"}</Boton>
        </form>
      </Modal>
    </>
  );
}

export function PermissionPage() {
  const { t } = useI18n();
  const labels = t.userCenter ?? {};
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [permissionRole, setPermissionRole] = useState<Role | null>(null);
  const roles = useQuery({ queryKey: ["roles"], queryFn: async () => extraerDatos<Role[]>(await api.get("/user-center/roles")) });
  const save = useMutation({ mutationFn: (payload: Record<string, unknown>) => api.post("/user-center/roles", payload), onSuccess: () => { setOpen(false); void queryClient.invalidateQueries({ queryKey: ["roles"] }); } });
  const assign = useMutation({ mutationFn: (payload: { roleId: string; permissionCodes: string[] }) => api.put(`/user-center/roles/${payload.roleId}/permissions`, { permissionCodes: payload.permissionCodes }), onSuccess: () => { setPermissionRole(null); void queryClient.invalidateQueries({ queryKey: ["roles"] }); } });
  const permissions = ["dashboard.view", "monitoring.view", "control.view", "history.view", "history.export", "maintain.view", "maintain.firmware.view", "maintain.ota.view", "maintain.diagnosis.view", "userCenter.view", "userCenter.organization.view", "userCenter.permission.view", "userCenter.user.view", "audit.view"];
  return (
    <>
      <EncabezadoPagina titulo={labels.permission ?? "Permission"} descripcion={`${labels.title ?? "User Center"} / ${labels.permission ?? "Permission"}`} acciones={<Boton icono={<Plus className="h-4 w-4" />} onClick={() => setOpen(true)}>{labels.addRole ?? "Add role"}</Boton>} />
      <DataTable headers={["Sort No.", labels.roleName, labels.affiliatedCompany, labels.roleDescription, "Create time", "Operate"]} rows={(roles.data ?? []).map((item, index) => [index + 1, item.roleName ?? item.name, "-", item.description ?? "-", formatearFecha(item.createdAt), <button className="text-blue-700" onClick={() => setPermissionRole(item)}>{labels.permissionSetting}</button>])} />
      <Modal abierto={open} titulo={labels.addRole ?? "Add role"} onCerrar={() => setOpen(false)}>
        <form className="grid gap-3" onSubmit={(event) => submitRole(event, save.mutate)}>
          <input name="roleName" required className="rounded border px-3 py-2 text-sm" placeholder={labels.roleName} />
          <textarea name="description" className="rounded border px-3 py-2 text-sm" placeholder={labels.roleDescription} />
          <Boton>{labels.confirm ?? "Confirm"}</Boton>
        </form>
      </Modal>
      <Modal abierto={Boolean(permissionRole)} titulo={labels.permissionSetting ?? "Permission setting"} onCerrar={() => setPermissionRole(null)}>
        <form className="space-y-3" onSubmit={(event) => { event.preventDefault(); const data = new FormData(event.currentTarget); assign.mutate({ roleId: permissionRole!.id, permissionCodes: data.getAll("permissionCodes").map(String) }); }}>
          <div className="grid max-h-80 gap-2 overflow-auto sm:grid-cols-2">{permissions.map((permission) => <label key={permission} className="flex items-center gap-2 text-sm"><input name="permissionCodes" type="checkbox" defaultChecked={permissionRole?.permissions?.includes(permission)} value={permission} />{permission}</label>)}</div>
          <Boton icono={<KeyRound className="h-4 w-4" />}>{labels.assign ?? "Assign"}</Boton>
        </form>
      </Modal>
    </>
  );
}

export function UserPage() {
  const { t } = useI18n();
  const labels = t.userCenter ?? {};
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [passwordUser, setPasswordUser] = useState<User | null>(null);
  const users = useQuery({ queryKey: ["uc-users"], queryFn: async () => extraerDatos<User[]>(await api.get("/user-center/users")) });
  const roles = useQuery({ queryKey: ["roles"], queryFn: async () => extraerDatos<Role[]>(await api.get("/user-center/roles")) });
  const companies = useQuery({ queryKey: ["organizations"], queryFn: async () => extraerDatos<Company[]>(await api.get("/user-center/organizations")) });
  const save = useMutation({ mutationFn: (payload: Record<string, unknown>) => api.post("/user-center/users", payload), onSuccess: () => { setOpen(false); void queryClient.invalidateQueries({ queryKey: ["uc-users"] }); } });
  const password = useMutation({ mutationFn: (payload: Record<string, unknown>) => api.post(`/user-center/users/${passwordUser?.id}/change-password`, payload), onSuccess: () => setPasswordUser(null) });
  return (
    <>
      <EncabezadoPagina titulo={labels.user ?? "User"} descripcion={`${labels.title ?? "User Center"} / ${labels.user ?? "User"}`} acciones={<Boton icono={<Plus className="h-4 w-4" />} onClick={() => setOpen(true)}>{labels.addUser ?? "Add user"}</Boton>} />
      <DataTable headers={["Sort No.", labels.username, labels.nickname, labels.email, labels.phoneNumber, labels.affiliatedCompany, labels.roleName, labels.accountStatus, "Create time", "Operate"]} rows={(users.data ?? []).map((item, index) => [index + 1, item.username, item.nickname, item.email, item.phone ?? "-", item.companyName ?? "-", item.roleName ?? "-", item.accountStatus, formatearFecha(item.createdAt), <button className="text-blue-700" onClick={() => setPasswordUser(item)}>{labels.changePassword}</button>])} />
      <Modal abierto={open} titulo={labels.addUser ?? "Add user"} onCerrar={() => setOpen(false)}>
        <form className="grid gap-3" onSubmit={(event) => submitUser(event, save.mutate)}>
          <input name="username" required className="rounded border px-3 py-2 text-sm" placeholder={labels.username} />
          <input name="nickname" required className="rounded border px-3 py-2 text-sm" placeholder={labels.nickname} />
          <input name="email" required type="email" className="rounded border px-3 py-2 text-sm" placeholder={labels.email} />
          <input name="phone" className="rounded border px-3 py-2 text-sm" placeholder={labels.phoneNumber} />
          <select name="companyId" required className="rounded border px-3 py-2 text-sm">{(companies.data ?? []).map((company) => <option key={company.id} value={company.id}>{company.companyName ?? company.name}</option>)}</select>
          <select name="roleId" required className="rounded border px-3 py-2 text-sm">{(roles.data ?? []).map((role) => <option key={role.id} value={role.id}>{role.roleName ?? role.name}</option>)}</select>
          <input name="password" required minLength={8} type="password" className="rounded border px-3 py-2 text-sm" placeholder={labels.password} />
          <input name="confirmPassword" required minLength={8} type="password" className="rounded border px-3 py-2 text-sm" placeholder={labels.confirmPassword} />
          <Boton>{labels.confirm ?? "Confirm"}</Boton>
        </form>
      </Modal>
      <Modal abierto={Boolean(passwordUser)} titulo={labels.changePassword ?? "Change password"} onCerrar={() => setPasswordUser(null)}>
        <form className="grid gap-3" onSubmit={(event) => { event.preventDefault(); const data = new FormData(event.currentTarget); password.mutate({ password: data.get("password"), confirmPassword: data.get("confirmPassword") }); }}>
          <input name="password" required minLength={8} type="password" className="rounded border px-3 py-2 text-sm" placeholder={labels.password} />
          <input name="confirmPassword" required minLength={8} type="password" className="rounded border px-3 py-2 text-sm" placeholder={labels.confirmPassword} />
          <Boton>{labels.confirm ?? "Confirm"}</Boton>
        </form>
      </Modal>
    </>
  );
}

function submitCompany(event: FormEvent<HTMLFormElement>, save: (payload: Record<string, unknown>) => void) {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  save({ companyName: data.get("companyName"), contactName: data.get("contactName"), email: data.get("email"), phone: data.get("phone"), timezone: data.get("timezone"), pushEnabled: true, status: "ACTIVE" });
}

function submitRole(event: FormEvent<HTMLFormElement>, save: (payload: Record<string, unknown>) => void) {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  save({ roleName: data.get("roleName"), description: data.get("description") });
}

function submitUser(event: FormEvent<HTMLFormElement>, save: (payload: Record<string, unknown>) => void) {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  save({ username: data.get("username"), nickname: data.get("nickname"), email: data.get("email"), phone: data.get("phone"), companyId: data.get("companyId"), roleId: data.get("roleId"), password: data.get("password"), confirmPassword: data.get("confirmPassword"), accountStatus: "ACTIVE" });
}

function DataTable({ headers, rows }: { headers: Array<ReactNode>; rows: Array<Array<ReactNode>> }) {
  return <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white"><table className="min-w-full divide-y divide-slate-200 text-sm"><thead className="bg-slate-50 text-left text-xs font-semibold uppercase text-slate-500"><tr>{headers.map((head, index) => <th key={index} className="whitespace-nowrap px-4 py-3">{head}</th>)}</tr></thead><tbody className="divide-y divide-slate-100">{rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex} className="px-4 py-3">{cell}</td>)}</tr>)}</tbody></table></div>;
}
