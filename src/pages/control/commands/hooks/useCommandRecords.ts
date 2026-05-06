import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cancelCommandRecord, deleteCommandRecord, getCommandRecords, resendCommandRecord, type CommandRecordFilters } from "../../services/command-record.service";

export function useCommandRecords(filters: CommandRecordFilters) {
  const queryClient = useQueryClient();
  const queryKey = ["control-command-records", filters];
  const recordsQuery = useQuery({ queryKey, queryFn: () => getCommandRecords(filters) });
  const cancel = useMutation({
    mutationFn: cancelCommandRecord,
    onSuccess: async () => queryClient.invalidateQueries({ queryKey: ["control-command-records"] }),
  });
  const resend = useMutation({
    mutationFn: resendCommandRecord,
    onSuccess: async () => queryClient.invalidateQueries({ queryKey: ["control-command-records"] }),
  });
  const remove = useMutation({
    mutationFn: deleteCommandRecord,
    onSuccess: async () => queryClient.invalidateQueries({ queryKey: ["control-command-records"] }),
  });

  return { recordsQuery, cancel, resend, remove };
}
