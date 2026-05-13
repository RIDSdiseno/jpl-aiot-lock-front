import { useQuery } from "@tanstack/react-query";
import { roleService } from "../services/role.service";
import type { Pagination, RoleFiltersValue } from "../types/userCenter.types";

export function useRoles(filters: RoleFiltersValue, pagination: Pick<Pagination, "page" | "limit">) {
  return useQuery({
    queryKey: ["user-center-roles", filters, pagination],
    queryFn: () => roleService.list(filters, pagination),
  });
}
