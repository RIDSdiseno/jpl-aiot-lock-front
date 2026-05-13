import { Cpu } from "lucide-react";

export function EmptyDeviceState() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 px-4 py-12 text-center text-slate-500">
      <Cpu className="h-8 w-8 text-slate-300" />
      <p className="text-sm font-medium text-slate-700">No devices found.</p>
    </div>
  );
}
