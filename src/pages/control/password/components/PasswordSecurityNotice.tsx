import { ShieldAlert } from "lucide-react";

export function PasswordSecurityNotice({ warning }: { warning: string }) {
  return (
    <div className="flex items-start gap-3 rounded border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
      <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0" />
      <span>{warning}</span>
    </div>
  );
}
