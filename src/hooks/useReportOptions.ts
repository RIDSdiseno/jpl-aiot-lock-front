import { useQuery } from "@tanstack/react-query";
import { getReportOptions } from "../services/reports.service";

export function useReportOptions() {
  return useQuery({ queryKey: ["reports", "options"], queryFn: getReportOptions });
}
