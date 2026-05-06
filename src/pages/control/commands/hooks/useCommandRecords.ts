import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cancelCommandRecord, getCommandRecords, type CommandRecordFilters } from "../../services/command-record.service";

export function useCommandRecords(filters: CommandRecordFilters) {
  const queryClient = useQueryClient();
  const queryKey = ["control-command-records", filters];
  const recordsQuery = useQuery({ queryKey, queryFn: () => getCommandRecords(filters) });
  const cancel = useMutation({
    mutationFn: cancelCommandRecord,
    onSuccess: async () => queryClient.invalidateQueries({ queryKey: ["control-command-records"] }),
  });

  return { recordsQuery, cancel };
}
