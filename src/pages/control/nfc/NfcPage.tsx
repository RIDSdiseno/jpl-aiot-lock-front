import { useState } from "react";
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
  const [block, setBlock] = useState("Block 1");
  const [addOpen, setAddOpen] = useState(false);
  const [clearOpen, setClearOpen] = useState(false);
  const [message, setMessage] = useState("");
  const cards = nfc.cardsQuery.data?.cards ?? [];
  const disabled = !selectedDevice;

  return (
    <>
      <ControlSelectedDeviceBanner device={selectedDevice} />
      {message ? <div className="rounded border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{message}</div> : null}
      <NfcToolbar
        block={block}
        onBlockChange={setBlock}
        disabled={disabled}
        onRead={() => nfc.read.mutate(undefined, { onSuccess: () => setMessage("NFC cards read from mock service.") })}
        onAdd={() => setAddOpen(true)}
        onReserve={() => nfc.reserve.mutate(undefined, { onSuccess: () => setMessage("Reserved NFC command created.") })}
        onClear={() => setClearOpen(true)}
        onSync={() => nfc.sync.mutate(undefined, { onSuccess: () => setMessage("NFC cards synced.") })}
      />
      <NfcCardList cards={cards} />
      <AddNfcCardModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onSubmit={(cardNumber) =>
          nfc.add.mutate(cardNumber, {
            onSuccess: () => {
              setAddOpen(false);
              setMessage("NFC card added as pending sync.");
            },
          })
        }
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
