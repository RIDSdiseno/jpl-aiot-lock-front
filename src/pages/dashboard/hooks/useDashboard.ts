import { useQuery } from "@tanstack/react-query";
import { getDashboardSummary } from "../services/dashboard.service";

export function useDashboard(from?: string, to?: string) {
  return useQuery({
    queryKey: ["dashboard", "summary", from, to],
    queryFn: () => getDashboardSummary(from, to),
  });
}
