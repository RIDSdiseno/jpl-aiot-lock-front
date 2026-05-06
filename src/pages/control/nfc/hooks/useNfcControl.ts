import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addNfcCard, clearNfcCards, getNfcCards, readNfcCards, reserveNfcCommand, syncNfcCards } from "../../services/nfc.service";

export function useNfcControl(deviceId?: string) {
  const queryClient = useQueryClient();
  const queryKey = ["control-nfc", deviceId];

  const cardsQuery = useQuery({
    queryKey,
    queryFn: () => getNfcCards(deviceId ?? ""),
    enabled: Boolean(deviceId),
  });

  const invalidate = async () => queryClient.invalidateQueries({ queryKey });

  return {
    cardsQuery,
    read: useMutation({ mutationFn: () => readNfcCards(deviceId ?? ""), onSuccess: invalidate }),
    add: useMutation({ mutationFn: (cardNumber: string) => addNfcCard(deviceId ?? "", cardNumber, "Block 1"), onSuccess: invalidate }),
    sync: useMutation({ mutationFn: (cards?: Parameters<typeof syncNfcCards>[1]) => syncNfcCards(deviceId ?? "", cards), onSuccess: invalidate }),
    clear: useMutation({ mutationFn: () => clearNfcCards(deviceId ?? ""), onSuccess: invalidate }),
    reserve: useMutation({ mutationFn: () => reserveNfcCommand(deviceId ?? "") }),
  };
}
