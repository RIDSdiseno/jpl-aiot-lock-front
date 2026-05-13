import { useQuery } from "@tanstack/react-query";
import { organizationService } from "../services/organization.service";
import type { OrganizationFiltersValue, Pagination } from "../types/userCenter.types";

export function useOrganizations(filters: OrganizationFiltersValue, pagination: Pick<Pagination, "page" | "limit">) {
  return useQuery({
    queryKey: ["user-center-organizations", filters, pagination],
    queryFn: () => organizationService.list(filters, pagination),
  });
}
