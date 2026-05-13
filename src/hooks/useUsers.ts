import { useQuery } from "@tanstack/react-query";
import { userService } from "../services/user.service";
import type { Pagination, UserFiltersValue } from "../types/userCenter.types";

export function useUsers(filters: UserFiltersValue, pagination: Pick<Pagination, "page" | "limit">) {
  return useQuery({
    queryKey: ["user-center-users", filters, pagination],
    queryFn: () => userService.list(filters, pagination),
  });
}
