import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Edit, KeyRound, Plus, ShieldCheck, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { Boton } from "../../componentes/comunes/Boton";
import { Modal } from "../../componentes/comunes/Modal";
import { useOrganizations } from "../../hooks/useOrganizations";
import { usePermissions } from "../../hooks/usePermissions";
import { useRoles } from "../../hooks/useRoles";
import { useUserCenterOptions } from "../../hooks/useUserCenterOptions";
import { useUsers } from "../../hooks/useUsers";
import { organizationService } from "../../services/organization.service";
import { roleService } from "../../services/role.service";
import { userService } from "../../services/user.service";
import type {
  Organization,
  OrganizationFiltersValue,
  Pagination,
  Role,
  RoleFiltersValue,
  UserCenterUser,
  UserFiltersValue,
} from "../../types/userCenter.types";
import { DeleteConfirmModal } from "./components/DeleteConfirmModal";
import { UserCenterLayout } from "./components/UserCenterLayout";
import { UserCenterPagination } from "./components/UserCenterPagination";
import { UserCenterTable } from "./components/UserCenterTable";
import { UserCenterToolbar } from "./components/UserCenterToolbar";
import { UserStatusSwitch } from "./components/UserStatusSwitch";

const defaultPagination: Pagination = { page: 1, limit: 20, total: 0, totalPages: 0 };
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

function safe(value: unknown) {
  if (value === null || value === undefined || value === "") return "-";
  return String(value);
}

function actionButton(label: string, onClick: () => void, danger = false) {
  return (
    <button type="button" className={`inline-flex items-center gap-1 text-sm font-medium ${danger ? "text-red-600" : "text-blue-700"} hover:underline`} onClick={onClick}>
      {label}
    </button>
  );
}

function fieldClass() {
  return "rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";
}

export function OrganizationPage() {
  const queryClient = useQueryClient();
  const [draftFilters, setDraftFilters] = useState<OrganizationFiltersValue>({ companyName: "", phone: "" });
  const [filters, setFilters] = useState<OrganizationFiltersValue>(draftFilters);
  const [pagination, setPagination] = useState({ page: 1, limit: 20 });
  const [editing, setEditing] = useState<Organization | null>(null);
  const [deleting, setDeleting] = useState<Organization | null>(null);
  const organizations = useOrganizations(filters, pagination);
  const page = organizations.data?.pagination ?? defaultPagination;

  const save = useMutation({
    mutationFn: (payload: Partial<Organization>) => editing ? organizationService.update(editing.id, payload) : organizationService.create(payload),
    onSuccess: async () => {
      setEditing(null);
      await queryClient.invalidateQueries({ queryKey: ["user-center-organizations"] });
      await queryClient.invalidateQueries({ queryKey: ["user-center-options"] });
    },
  });

  const remove = useMutation({
    mutationFn: (id: string) => organizationService.remove(id),
    onSuccess: async () => {
      setDeleting(null);
      await queryClient.invalidateQueries({ queryKey: ["user-center-organizations"] });
      await queryClient.invalidateQueries({ queryKey: ["user-center-options"] });
    },
  });

  return (
    <UserCenterLayout
      title="Organization"
      actions={<Boton icono={<Plus className="h-4 w-4" />} onClick={() => setEditing(emptyOrganization())}>Add</Boton>}
    >
      <UserCenterToolbar>
        <form className="grid gap-3 md:grid-cols-[1fr_1fr_auto_auto]" onSubmit={(event) => { event.preventDefault(); setFilters(draftFilters); setPagination((current) => ({ ...current, page: 1 })); }}>
          <input className={fieldClass()} placeholder="Company name" value={draftFilters.companyName} onChange={(event) => setDraftFilters((current) => ({ ...current, companyName: event.target.value }))} />
          <input className={fieldClass()} placeholder="Phone" value={draftFilters.phone} onChange={(event) => setDraftFilters((current) => ({ ...current, phone: event.target.value }))} />
          <Boton type="submit">Search</Boton>
          <Boton type="button" variante="secundario" onClick={() => { const reset = { companyName: "", phone: "" }; setDraftFilters(reset); setFilters(reset); setPagination((current) => ({ ...current, page: 1 })); }}>Reset</Boton>
        </form>
      </UserCenterToolbar>

      <div>
        <UserCenterTable
          loading={organizations.isLoading}
          headers={["Company name", "Contact", "Email", "Phone", "Country", "Timezone", "Operate"]}
          rows={(organizations.data?.data ?? []).map((item) => [
            safe(item.companyName),
            safe(item.contactName),
            safe(item.email),
            safe(item.phone),
            safe(item.country),
            safe(item.timezone),
            <div className="flex gap-3">
              {actionButton("Edit", () => setEditing(item))}
              {actionButton("Delete", () => setDeleting(item), true)}
            </div>,
          ])}
        />
        <UserCenterPagination pagination={page} onPageChange={(pageNumber) => setPagination((current) => ({ ...current, page: pageNumber }))} onLimitChange={(limit) => setPagination({ page: 1, limit })} />
      </div>

      <OrganizationFormModal organization={editing} loading={save.isPending} onClose={() => setEditing(null)} onSubmit={(payload) => save.mutate(payload)} />
      <DeleteConfirmModal open={Boolean(deleting)} title="Delete organization" description={`Delete ${deleting?.companyName ?? "this organization"}? Related records will be protected by backend rules.`} loading={remove.isPending} onCancel={() => setDeleting(null)} onConfirm={() => deleting && remove.mutate(deleting.id)} />
    </UserCenterLayout>
  );
}

export function PermissionPage() {
  const queryClient = useQueryClient();
  const options = useUserCenterOptions();
  const [draftFilters, setDraftFilters] = useState<RoleFiltersValue>({ roleName: "", organizationId: "" });
  const [filters, setFilters] = useState<RoleFiltersValue>(draftFilters);
  const [pagination, setPagination] = useState({ page: 1, limit: 20 });
  const [editing, setEditing] = useState<Role | null>(null);
  const [deleting, setDeleting] = useState<Role | null>(null);
  const [permissionRole, setPermissionRole] = useState<Role | null>(null);
  const roles = useRoles(filters, pagination);
  const page = roles.data?.pagination ?? defaultPagination;

  const save = useMutation({
    mutationFn: (payload: Partial<Role>) => editing?.id ? roleService.update(editing.id, payload) : roleService.create(payload),
    onSuccess: async () => {
      setEditing(null);
      await queryClient.invalidateQueries({ queryKey: ["user-center-roles"] });
      await queryClient.invalidateQueries({ queryKey: ["user-center-options"] });
    },
  });

  const remove = useMutation({
    mutationFn: (id: string) => roleService.remove(id),
    onSuccess: async () => {
      setDeleting(null);
      await queryClient.invalidateQueries({ queryKey: ["user-center-roles"] });
      await queryClient.invalidateQueries({ queryKey: ["user-center-options"] });
    },
  });

  return (
    <UserCenterLayout title="Permission" actions={<Boton icono={<Plus className="h-4 w-4" />} onClick={() => setEditing(emptyRole())}>Add</Boton>}>
      <UserCenterToolbar>
        <form className="grid gap-3 md:grid-cols-[1fr_1fr_auto_auto]" onSubmit={(event) => { event.preventDefault(); setFilters(draftFilters); setPagination((current) => ({ ...current, page: 1 })); }}>
          <input className={fieldClass()} placeholder="Role name" value={draftFilters.roleName} onChange={(event) => setDraftFilters((current) => ({ ...current, roleName: event.target.value }))} />
          <select className={fieldClass()} value={draftFilters.organizationId} onChange={(event) => setDraftFilters((current) => ({ ...current, organizationId: event.target.value }))}>
            <option value="">Affiliated company</option>
            {(options.data?.organizations ?? []).map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
          </select>
          <Boton type="submit">Search</Boton>
          <Boton type="button" variante="secundario" onClick={() => { const reset = { roleName: "", organizationId: "" }; setDraftFilters(reset); setFilters(reset); setPagination((current) => ({ ...current, page: 1 })); }}>Reset</Boton>
        </form>
      </UserCenterToolbar>

      <div>
        <UserCenterTable
          loading={roles.isLoading}
          headers={["Sort No.", "Role name", "Affiliated company", "Description of role", "Operate"]}
          rows={(roles.data?.data ?? []).map((item, index) => [
            item.sortNo ?? (page.page - 1) * page.limit + index + 1,
            safe(item.roleName),
            safe(item.organizationName),
            safe(item.description),
            <div className="flex gap-3">
              {actionButton("Edit", () => setEditing(item))}
              <button type="button" className="inline-flex items-center gap-1 text-sm font-medium text-blue-700 hover:underline" onClick={() => setPermissionRole(item)}><ShieldCheck className="h-4 w-4" />Permission</button>
              {actionButton("Delete", () => setDeleting(item), true)}
            </div>,
          ])}
        />
        <UserCenterPagination pagination={page} onPageChange={(pageNumber) => setPagination((current) => ({ ...current, page: pageNumber }))} onLimitChange={(limit) => setPagination({ page: 1, limit })} />
      </div>

      <RoleFormModal role={editing} organizations={options.data?.organizations ?? []} loading={save.isPending} onClose={() => setEditing(null)} onSubmit={(payload) => save.mutate(payload)} />
      <PermissionMatrixModal role={permissionRole} onClose={() => setPermissionRole(null)} />
      <DeleteConfirmModal open={Boolean(deleting)} title="Delete role" description={`Delete ${deleting?.roleName ?? "this role"}? Roles with assigned users cannot be deleted.`} loading={remove.isPending} onCancel={() => setDeleting(null)} onConfirm={() => deleting && remove.mutate(deleting.id)} />
    </UserCenterLayout>
  );
}

export function UserPage() {
  const queryClient = useQueryClient();
  const options = useUserCenterOptions();
  const [draftFilters, setDraftFilters] = useState<UserFiltersValue>({ username: "", phoneNumber: "", organizationId: "", roleId: "", accountStatus: "" });
  const [filters, setFilters] = useState<UserFiltersValue>(draftFilters);
  const [pagination, setPagination] = useState({ page: 1, limit: 20 });
  const [editing, setEditing] = useState<UserCenterUser | null>(null);
  const [deleting, setDeleting] = useState<UserCenterUser | null>(null);
  const [passwordUser, setPasswordUser] = useState<UserCenterUser | null>(null);
  const users = useUsers(filters, pagination);
  const page = users.data?.pagination ?? defaultPagination;

  const save = useMutation({
    mutationFn: (payload: Record<string, unknown>) => editing?.id ? userService.update(editing.id, payload) : userService.create(payload),
    onSuccess: async () => {
      setEditing(null);
      await queryClient.invalidateQueries({ queryKey: ["user-center-users"] });
    },
  });

  const remove = useMutation({
    mutationFn: (id: string) => userService.remove(id),
    onSuccess: async () => {
      setDeleting(null);
      await queryClient.invalidateQueries({ queryKey: ["user-center-users"] });
    },
  });

  const status = useMutation({
    mutationFn: ({ id, accountStatus }: { id: string; accountStatus: boolean }) => userService.updateStatus(id, accountStatus),
    onSuccess: async () => queryClient.invalidateQueries({ queryKey: ["user-center-users"] }),
  });

  return (
    <UserCenterLayout title="User" actions={<Boton icono={<Plus className="h-4 w-4" />} onClick={() => setEditing(emptyUser())}>Add</Boton>}>
      <UserCenterToolbar>
        <form className="grid gap-3 lg:grid-cols-[1fr_1fr_1fr_auto_auto]" onSubmit={(event) => { event.preventDefault(); setFilters(draftFilters); setPagination((current) => ({ ...current, page: 1 })); }}>
          <input className={fieldClass()} placeholder="Username" value={draftFilters.username} onChange={(event) => setDraftFilters((current) => ({ ...current, username: event.target.value }))} />
          <input className={fieldClass()} placeholder="phone number" value={draftFilters.phoneNumber} onChange={(event) => setDraftFilters((current) => ({ ...current, phoneNumber: event.target.value }))} />
          <select className={fieldClass()} value={draftFilters.organizationId} onChange={(event) => setDraftFilters((current) => ({ ...current, organizationId: event.target.value }))}>
            <option value="">Affiliated company</option>
            {(options.data?.organizations ?? []).map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
          </select>
          <Boton type="submit">Search</Boton>
          <Boton type="button" variante="secundario" onClick={() => { const reset = { username: "", phoneNumber: "", organizationId: "", roleId: "", accountStatus: "" }; setDraftFilters(reset); setFilters(reset); setPagination((current) => ({ ...current, page: 1 })); }}>Reset</Boton>
        </form>
      </UserCenterToolbar>

      <div>
        <UserCenterTable
          loading={users.isLoading}
          headers={["Sort No.", "Username", "User nickname", "Account status", "Email address", "phone number", "Affiliation company", "Role name", "Operate"]}
          rows={(users.data?.data ?? []).map((item, index) => [
            item.sortNo ?? (page.page - 1) * page.limit + index + 1,
            safe(item.username),
            safe(item.nickname),
            <UserStatusSwitch checked={item.accountStatus} disabled={status.isPending} onChange={(checked) => {
              if (!checked && !window.confirm(`Disable ${item.username}?`)) return;
              status.mutate({ id: item.id, accountStatus: checked });
            }} />,
            safe(item.email),
            safe(item.phoneNumber),
            safe(item.organizationName),
            safe(item.roleName),
            <div className="flex gap-3">
              <button type="button" className="inline-flex items-center gap-1 text-sm font-medium text-blue-700 hover:underline" onClick={() => setPasswordUser(item)}><KeyRound className="h-4 w-4" />Change password</button>
              <button type="button" className="inline-flex items-center gap-1 text-sm font-medium text-blue-700 hover:underline" onClick={() => setEditing(item)}><Edit className="h-4 w-4" />Edit</button>
              <button type="button" className="inline-flex items-center gap-1 text-sm font-medium text-red-600 hover:underline" onClick={() => setDeleting(item)}><Trash2 className="h-4 w-4" />Delete</button>
            </div>,
          ])}
        />
        <UserCenterPagination pagination={page} onPageChange={(pageNumber) => setPagination((current) => ({ ...current, page: pageNumber }))} onLimitChange={(limit) => setPagination({ page: 1, limit })} />
      </div>

      <UserFormModal user={editing} organizations={options.data?.organizations ?? []} roles={options.data?.roles ?? []} loading={save.isPending} onClose={() => setEditing(null)} onSubmit={(payload) => save.mutate(payload)} />
      <ChangePasswordModal user={passwordUser} onClose={() => setPasswordUser(null)} />
      <DeleteConfirmModal open={Boolean(deleting)} title="Delete user" description={`Delete ${deleting?.username ?? "this user"}?`} loading={remove.isPending} onCancel={() => setDeleting(null)} onConfirm={() => deleting && remove.mutate(deleting.id)} />
    </UserCenterLayout>
  );
}

function OrganizationFormModal({ organization, loading, onClose, onSubmit }: { organization: Organization | null; loading: boolean; onClose: () => void; onSubmit: (payload: Partial<Organization>) => void }) {
  if (!organization) return null;
  return (
    <Modal abierto={Boolean(organization)} titulo={organization.id ? "Edit organization" : "Add organization"} onCerrar={onClose}>
      <form className="grid gap-3" onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        onSubmit({
          companyName: String(data.get("companyName") ?? ""),
          contactName: String(data.get("contactName") ?? ""),
          email: String(data.get("email") ?? ""),
          phone: String(data.get("phone") ?? ""),
          country: String(data.get("country") ?? "Chile"),
          timezone: String(data.get("timezone") ?? "America/Santiago"),
          address: String(data.get("address") ?? ""),
          description: String(data.get("description") ?? ""),
          isActive: data.get("isActive") === "on",
        });
      }}>
        <input name="companyName" required maxLength={150} defaultValue={organization.companyName} className={fieldClass()} placeholder="Company name" />
        <input name="contactName" defaultValue={organization.contactName} className={fieldClass()} placeholder="Contact" />
        <input name="email" type="email" defaultValue={organization.email} className={fieldClass()} placeholder="Email" />
        <input name="phone" defaultValue={organization.phone} className={fieldClass()} placeholder="Phone" />
        <input name="country" required defaultValue={organization.country || "Chile"} className={fieldClass()} placeholder="Country" />
        <input name="timezone" required defaultValue={organization.timezone || "America/Santiago"} className={fieldClass()} placeholder="Timezone" />
        <input name="address" defaultValue={organization.address} className={fieldClass()} placeholder="Address" />
        <textarea name="description" defaultValue={organization.description} className={fieldClass()} placeholder="Description" />
        <label className="flex items-center gap-2 text-sm text-slate-700"><input name="isActive" type="checkbox" defaultChecked={organization.isActive} /> Active</label>
        <div className="flex justify-end gap-2"><Boton type="button" variante="secundario" onClick={onClose}>Cancel</Boton><Boton disabled={loading}>Confirm</Boton></div>
      </form>
    </Modal>
  );
}

function RoleFormModal({ role, organizations, loading, onClose, onSubmit }: { role: Role | null; organizations: Array<{ id: string; name: string }>; loading: boolean; onClose: () => void; onSubmit: (payload: Partial<Role>) => void }) {
  if (!role) return null;
  return (
    <Modal abierto={Boolean(role)} titulo={role.id ? "Edit role" : "Add role"} onCerrar={onClose}>
      <form className="grid gap-3" onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        onSubmit({ roleName: String(data.get("roleName") ?? ""), organizationId: String(data.get("organizationId") ?? ""), description: String(data.get("description") ?? "") });
      }}>
        <input name="roleName" required maxLength={100} defaultValue={role.roleName} className={fieldClass()} placeholder="Role name" />
        <select name="organizationId" defaultValue={role.organizationId ?? ""} className={fieldClass()}>
          <option value="">Global role</option>
          {organizations.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
        </select>
        <textarea name="description" defaultValue={role.description} className={fieldClass()} placeholder="Description of role" />
        <div className="flex justify-end gap-2"><Boton type="button" variante="secundario" onClick={onClose}>Cancel</Boton><Boton disabled={loading}>Confirm</Boton></div>
      </form>
    </Modal>
  );
}

function PermissionMatrixModal({ role, onClose }: { role: Role | null; onClose: () => void }) {
  const queryClient = useQueryClient();
  const permissions = usePermissions(role?.id);
  const options = useUserCenterOptions();
  const [selected, setSelected] = useState<string[]>([]);
  const grouped = useMemo(() => {
    const source = permissions.data?.all ?? options.data?.permissions ?? [];
    return source.reduce<Record<string, Array<{ code: string; name: string }>>>((acc, item) => {
      const moduleName = "module" in item ? item.module : "General";
      acc[moduleName] = [...(acc[moduleName] ?? []), { code: item.code, name: item.name }];
      return acc;
    }, {});
  }, [options.data?.permissions, permissions.data?.all]);

  useEffect(() => {
    setSelected(permissions.data?.selected ?? role?.permissions ?? []);
  }, [permissions.data?.selected, role?.permissions]);

  const save = useMutation({
    mutationFn: () => roleService.updatePermissions(role?.id ?? "", selected),
    onSuccess: async () => {
      onClose();
      await queryClient.invalidateQueries({ queryKey: ["user-center-roles"] });
    },
  });

  if (!role) return null;
  return (
    <Modal abierto={Boolean(role)} titulo={`Permission - ${role.roleName}`} onCerrar={onClose}>
      <div className="space-y-4">
        <div className="max-h-96 space-y-4 overflow-auto pr-2">
          {Object.entries(grouped).map(([moduleName, items]) => (
            <div key={moduleName} className="rounded-md border border-slate-200 p-3">
              <div className="mb-2 text-sm font-semibold text-slate-800">{moduleName}</div>
              <div className="grid gap-2 sm:grid-cols-2">
                {items.map((item) => (
                  <label key={item.code} className="flex items-center gap-2 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      checked={selected.includes(item.code)}
                      onChange={(event) => setSelected((current) => event.target.checked ? [...new Set([...current, item.code])] : current.filter((code) => code !== item.code))}
                    />
                    {item.code}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-2"><Boton type="button" variante="secundario" onClick={onClose}>Cancel</Boton><Boton disabled={save.isPending} onClick={() => save.mutate()}>Confirm</Boton></div>
      </div>
    </Modal>
  );
}

function UserFormModal({ user, organizations, roles, loading, onClose, onSubmit }: { user: UserCenterUser | null; organizations: Array<{ id: string; name: string }>; roles: Array<{ id: string; name: string; organizationId: string | null }>; loading: boolean; onClose: () => void; onSubmit: (payload: Record<string, unknown>) => void }) {
  if (!user) return null;
  const isEdit = Boolean(user.id);
  return (
    <Modal abierto={Boolean(user)} titulo={isEdit ? "Edit user" : "Add user"} onCerrar={onClose}>
      <form className="grid gap-3" onSubmit={(event) => submitUserForm(event, isEdit, onSubmit)}>
        <input name="username" required maxLength={80} defaultValue={user.username} className={fieldClass()} placeholder="Username" />
        <input name="nickname" maxLength={100} defaultValue={user.nickname} className={fieldClass()} placeholder="User nickname" />
        <input name="email" type="email" defaultValue={user.email} className={fieldClass()} placeholder="Email address" />
        <input name="phoneNumber" defaultValue={user.phoneNumber} className={fieldClass()} placeholder="phone number" />
        <select name="organizationId" required defaultValue={user.organizationId ?? ""} className={fieldClass()}>
          <option value="">Affiliated company</option>
          {organizations.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
        </select>
        <select name="roleId" required defaultValue={user.roleId ?? ""} className={fieldClass()}>
          <option value="">Role name</option>
          {roles.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
        </select>
        {!isEdit ? <input name="password" required minLength={8} type="password" className={fieldClass()} placeholder="TemporalPassword123" /> : null}
        <label className="flex items-center gap-2 text-sm text-slate-700"><input name="accountStatus" type="checkbox" defaultChecked={user.accountStatus} /> Active</label>
        <div className="flex justify-end gap-2"><Boton type="button" variante="secundario" onClick={onClose}>Cancel</Boton><Boton disabled={loading}>Confirm</Boton></div>
      </form>
    </Modal>
  );
}

function ChangePasswordModal({ user, onClose }: { user: UserCenterUser | null; onClose: () => void }) {
  const queryClient = useQueryClient();
  const [error, setError] = useState("");
  const change = useMutation({
    mutationFn: (payload: { newPassword: string; forceChangeOnNextLogin: boolean }) => userService.changePassword(user?.id ?? "", payload),
    onSuccess: async () => {
      setError("");
      onClose();
      await queryClient.invalidateQueries({ queryKey: ["user-center-users"] });
    },
  });
  if (!user) return null;
  return (
    <Modal abierto={Boolean(user)} titulo={`Change password - ${user.username}`} onCerrar={onClose}>
      <form className="grid gap-3" onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const newPassword = String(data.get("newPassword") ?? "");
        const confirmPassword = String(data.get("confirmPassword") ?? "");
        if (newPassword !== confirmPassword) return setError("Passwords do not match");
        if (!passwordPattern.test(newPassword)) return setError("Password must include uppercase, lowercase and number");
        change.mutate({ newPassword, forceChangeOnNextLogin: data.get("forceChangeOnNextLogin") === "on" });
      }}>
        <input name="newPassword" required minLength={8} type="password" className={fieldClass()} placeholder="New password" />
        <input name="confirmPassword" required minLength={8} type="password" className={fieldClass()} placeholder="Confirm password" />
        <label className="flex items-center gap-2 text-sm text-slate-700"><input name="forceChangeOnNextLogin" type="checkbox" /> Force change on next login</label>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <div className="flex justify-end gap-2"><Boton type="button" variante="secundario" onClick={onClose}>Cancel</Boton><Boton disabled={change.isPending}>Confirm</Boton></div>
      </form>
    </Modal>
  );
}

function submitUserForm(event: FormEvent<HTMLFormElement>, isEdit: boolean, onSubmit: (payload: Record<string, unknown>) => void) {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const password = String(data.get("password") ?? "");
  if (!isEdit && !passwordPattern.test(password)) {
    window.alert("Password must include uppercase, lowercase and number");
    return;
  }
  onSubmit({
    username: String(data.get("username") ?? ""),
    nickname: String(data.get("nickname") ?? ""),
    email: String(data.get("email") ?? ""),
    phoneNumber: String(data.get("phoneNumber") ?? ""),
    organizationId: String(data.get("organizationId") ?? ""),
    roleId: String(data.get("roleId") ?? ""),
    accountStatus: data.get("accountStatus") === "on",
    ...(!isEdit ? { password } : {}),
  });
}

function emptyOrganization(): Organization {
  return {
    id: "",
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    country: "Chile",
    timezone: "America/Santiago",
    address: "",
    description: "",
    parentOrganizationId: null,
    isActive: true,
    createdAt: "",
    updatedAt: "",
  };
}

function emptyRole(): Role {
  return {
    id: "",
    roleName: "",
    organizationId: null,
    organizationName: "",
    description: "",
    isSystemRole: false,
    isActive: true,
    permissions: [],
    createdAt: "",
    updatedAt: "",
  };
}

function emptyUser(): UserCenterUser {
  return {
    id: "",
    username: "",
    nickname: "",
    email: "",
    phoneNumber: "",
    organizationId: null,
    organizationName: "",
    roleId: null,
    roleName: "",
    accountStatus: true,
    isActive: true,
    lastLoginAt: null,
    createdAt: "",
    updatedAt: "",
  };
}
