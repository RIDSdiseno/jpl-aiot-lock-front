import { api } from "../librerias/api";
import type {
  ApiListResponse,
  ApiMutationResponse,
  Organization,
  OrganizationFiltersValue,
  Pagination,
  Role,
  RoleFiltersValue,
  UserCenterOptions,
  UserCenterUser,
  UserFiltersValue,
} from "../types/userCenter.types";

type QueryParams = Record<string, string | number | boolean | undefined | null>;

const emptyPagination: Pagination = { page: 1, limit: 20, total: 0, totalPages: 0 };

function cleanParams(params: QueryParams) {
  return Object.fromEntries(Object.entries(params).filter(([, value]) => value !== "" && value !== undefined && value !== null));
}

async function list<T>(url: string, params: QueryParams): Promise<ApiListResponse<T>> {
  const response = await api.get<ApiListResponse<T>>(url, { params: cleanParams(params) });
  return {
    ok: response.data.ok,
    data: response.data.data ?? [],
    pagination: response.data.pagination ?? emptyPagination,
  };
}

async function mutation<T>(request: Promise<{ data: ApiMutationResponse<T> }>): Promise<T> {
  const response = await request;
  return response.data.data;
}

export const userCenterService = {
  async options() {
    const response = await api.get<{ ok: boolean; data: UserCenterOptions }>("/user-center/options");
    return response.data.data;
  },
};

export const organizationService = {
  list(filters: OrganizationFiltersValue, pagination: Pick<Pagination, "page" | "limit">) {
    return list<Organization>("/user-center/organizations", { ...filters, ...pagination });
  },
  create(payload: Partial<Organization>) {
    return mutation<Organization>(api.post("/user-center/organizations", payload));
  },
  update(id: string, payload: Partial<Organization>) {
    return mutation<Organization>(api.patch(`/user-center/organizations/${id}`, payload));
  },
  remove(id: string) {
    return mutation<Organization>(api.delete(`/user-center/organizations/${id}`));
  },
};

export const roleService = {
  list(filters: RoleFiltersValue, pagination: Pick<Pagination, "page" | "limit">) {
    return list<Role>("/user-center/roles", { ...filters, ...pagination });
  },
  create(payload: Partial<Role>) {
    return mutation<Role>(api.post("/user-center/roles", payload));
  },
  update(id: string, payload: Partial<Role>) {
    return mutation<Role>(api.patch(`/user-center/roles/${id}`, payload));
  },
  remove(id: string) {
    return mutation<Role>(api.delete(`/user-center/roles/${id}`));
  },
  async permissions(id: string) {
    const response = await api.get<{ ok: boolean; data: { all: Array<{ code: string; name: string; module: string }>; selected: string[] } }>(`/user-center/roles/${id}/permissions`);
    return response.data.data;
  },
  updatePermissions(id: string, permissions: string[]) {
    return mutation<{ permissions: string[] }>(api.patch(`/user-center/roles/${id}/permissions`, { permissions }));
  },
};

export const userService = {
  list(filters: UserFiltersValue, pagination: Pick<Pagination, "page" | "limit">) {
    return list<UserCenterUser>("/user-center/users", { ...filters, ...pagination });
  },
  create(payload: Record<string, unknown>) {
    return mutation<UserCenterUser>(api.post("/user-center/users", payload));
  },
  update(id: string, payload: Record<string, unknown>) {
    return mutation<UserCenterUser>(api.patch(`/user-center/users/${id}`, payload));
  },
  remove(id: string) {
    return mutation<UserCenterUser>(api.delete(`/user-center/users/${id}`));
  },
  changePassword(id: string, payload: { newPassword: string; forceChangeOnNextLogin: boolean }) {
    return mutation<Record<string, never>>(api.patch(`/user-center/users/${id}/change-password`, payload));
  },
  updateStatus(id: string, accountStatus: boolean) {
    return mutation<UserCenterUser>(api.patch(`/user-center/users/${id}/status`, { accountStatus }));
  },
};
