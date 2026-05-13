import type { ReactNode } from "react";
import { EncabezadoPagina } from "../../../componentes/layout/EncabezadoPagina";
import { useAppText } from "../../../i18n/text";

export function UserCenterLayout({ title, actions, children }: { title: string; actions?: ReactNode; children: ReactNode }) {
  const tr = useAppText();
  return (
    <div>
      <EncabezadoPagina titulo={tr(title)} descripcion={`${tr("Home Page")} / ${tr("User Center")} / ${tr(title)}`} acciones={actions} />
      <div className="space-y-4">{children}</div>
    </div>
  );
}
