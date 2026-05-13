import { useQuery } from "@tanstack/react-query";
import { getLockUnlockReport } from "../services/reports.service";
import type { LockUnlockReportFilters } from "../types/report.types";

export function useLockUnlockReport(filters: LockUnlockReportFilters) {
  return useQuery({
    queryKey: ["reports", "lock-unlock", filters],
    queryFn: () => getLockUnlockReport(filters),
  });
}
