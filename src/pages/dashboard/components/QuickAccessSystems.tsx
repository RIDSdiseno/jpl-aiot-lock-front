import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { DashboardQuickAccessItem } from "../types/dashboard.types";
import { useI18n } from "../../../i18n/i18nStore";

export function QuickAccessSystems({ items }: { items: DashboardQuickAccessItem[] }) {
  const { t } = useI18n();

  return (
    <section className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="text-sm font-semibold text-slate-900">{t.dashboard.quickAccess.title}</h2>
      <div className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <Link
            key={item.id}
            className="flex items-center justify-between rounded border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:border-blue-300 hover:bg-blue-50"
            to={item.path}
          >
            <span>{item.label}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        ))}
      </div>
    </section>
  );
}
