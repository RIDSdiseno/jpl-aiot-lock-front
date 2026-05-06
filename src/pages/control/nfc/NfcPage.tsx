import { useEffect, useState } from "react";
import { useI18n } from "../../../i18n/i18nStore";
import { ControlLayout } from "../ControlLayout";
import { ControlSelectedDeviceBanner } from "../components/ControlSelectedDeviceBanner";
import type { ControlDevice } from "../types/control.types";
import { AddNfcCardModal } from "./components/AddNfcCardModal";
import { ClearNfcConfirmModal } from "./components/ClearNfcConfirmModal";
import { NfcCardList } from "./components/NfcCardList";
import { NfcToolbar } from "./components/NfcToolbar";
import { useNfcControl } from "./hooks/useNfcControl";

function NfcContent({ selectedDevice }: { selectedDevice?: ControlDevice }) {
  const nfc = useNfcControl(selectedDevice?.deviceId);
  const { t } = useI18n();
  const [block, setBlock] = useState("Block 1");
  const [addOpen, setAddOpen] = useState(false);
  const [clearOpen, setClearOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [hasRead, setHasRead] = useState(false);
  const [cards, setCards] = useState(nfc.cardsQuery.data?.cards ?? []);
  const disabled = !selectedDevice;

  useEffect(() => {
    setCards(nfc.cardsQuery.data?.cards ?? []);
  }, [nfc.cardsQuery.data]);

  useEffect(() => {
    setHasRead(false);
    setMessage("");
    setError("");
  }, [selectedDevice?.deviceId]);

  const syncCards = () => {
    if (!hasRead) {
      setError(t.control.readBeforeSyncWarning);
      return;
    }
    if (!window.confirm("Sync current visual NFC list to device?")) return;
    nfc.sync.mutate(
      cards.map((card) => ({ cardNumber: card.cardNumber, blockNumber: card.blockNumber })),
      { onSuccess: () => setMessage("NFC cards synced.") },
    );
  };

  return (
    <>
      <ControlSelectedDeviceBanner device={selectedDevice} />
      {message ? <div className="rounded border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{message}</div> : null}
      {error ? <div className="rounded border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">{error}</div> : null}
      {selectedDevice && !selectedDevice.isOnline ? <div className="rounded border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">The selected device is offline. Use reserved commands when the device must execute later.</div> : null}
      <NfcToolbar
        block={block}
        onBlockChange={setBlock}
        disabled={disabled}
        onRead={() =>
          nfc.read.mutate(undefined, {
            onSuccess: () => {
              setHasRead(true);
              setError("");
              setMessage("NFC cards read from mock service.");
            },
          })
        }
        onAdd={() => (hasRead ? setAddOpen(true) : setError(t.control.readBeforeSyncWarning))}
        onReserve={() => nfc.reserve.mutate(undefined, { onSuccess: () => setMessage("Reserved NFC command created.") })}
        onClear={() => setClearOpen(true)}
        onSync={syncCards}
      />
      <NfcCardList cards={cards} onDelete={(id) => setCards((current) => current.filter((card) => card.id !== id))} />
      <AddNfcCardModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onSubmit={(cardNumber) => {
          if (!/^\d{8}$/.test(cardNumber)) {
            setError("Card number must contain 8 numeric digits.");
            return;
          }
          if (cards.some((card) => card.cardNumber === cardNumber)) {
            setError("Duplicated card numbers are not allowed.");
            return;
          }
          nfc.add.mutate(cardNumber, {
            onSuccess: () => {
              setAddOpen(false);
              setError("");
              setMessage("NFC card added as pending sync.");
            },
            onError: (err) => setError(err instanceof Error ? err.message : "NFC card could not be added."),
          });
        }}
      />
      <ClearNfcConfirmModal
        open={clearOpen}
        onClose={() => setClearOpen(false)}
        onConfirm={() =>
          nfc.clear.mutate(undefined, {
            onSuccess: () => {
              setClearOpen(false);
              setMessage("NFC data cleared.");
            },
          })
        }
      />
    </>
  );
}

export function NfcPage() {
  return (
    <ControlLayout section="NFC">
      {({ selectedDevice }) => <NfcContent selectedDevice={selectedDevice} />}
    </ControlLayout>
  );
}
