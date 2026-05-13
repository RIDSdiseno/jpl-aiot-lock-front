import { useQuery } from "@tanstack/react-query";
import { roleService } from "../services/role.service";

export function usePermissions(roleId?: string) {
  return useQuery({
    queryKey: ["user-center-role-permissions", roleId],
    queryFn: () => roleService.permissions(roleId ?? ""),
    enabled: Boolean(roleId),
  });
}
