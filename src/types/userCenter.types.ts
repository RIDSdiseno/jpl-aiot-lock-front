export type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type ApiListResponse<T> = {
  ok: boolean;
  data: T[];
  pagination: Pagination;
};

export type ApiMutationResponse<T> = {
  ok: boolean;
  message: string;
  data: T;
};

export type Organization = {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  country: string;
  timezone: string;
  address: string;
  description: string;
  parentOrganizationId: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Role = {
  id: string;
  sortNo?: number;
  roleName: string;
  organizationId: string | null;
  organizationName: string;
  description: string;
  isSystemRole: boolean;
  isActive: boolean;
  permissions: string[];
  createdAt: string;
  updatedAt: string;
};

export type UserCenterUser = {
  id: string;
  sortNo?: number;
  username: string;
  nickname: string;
  email: string;
  phoneNumber: string;
  organizationId: string | null;
  organizationName: string;
  roleId: string | null;
  roleName: string;
  accountStatus: boolean;
  isActive: boolean;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type SelectOption<T = string> = {
  id?: string;
  name?: string;
  label?: string;
  value?: T;
  organizationId?: string | null;
};

export type PermissionOption = {
  module: string;
  code: string;
  name: string;
};

export type UserCenterOptions = {
  organizations: Array<{ id: string; name: string }>;
  roles: Array<{ id: string; name: string; organizationId: string | null }>;
  countries: string[];
  timezones: Array<{ label: string; value: string }>;
  accountStatuses: Array<{ label: string; value: boolean }>;
  permissions: PermissionOption[];
};

export type OrganizationFiltersValue = {
  companyName: string;
  phone: string;
};

export type RoleFiltersValue = {
  roleName: string;
  organizationId: string;
};

export type UserFiltersValue = {
  username: string;
  phoneNumber: string;
  organizationId: string;
  roleId: string;
  accountStatus: string;
};
