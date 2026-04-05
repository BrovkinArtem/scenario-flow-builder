import { NavLink, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ROUTES } from "@/shared/config/routes";
import { AppHeader } from "@/shared/ui/app-header/AppHeader";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
    isActive ? "bg-white text-brand shadow-sm" : "text-slate-600 hover:bg-white/60"
  }`;

export function AppLayout() {
  const { t } = useTranslation();

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-surface">
      <AppHeader />
      <div className="flex min-h-0 flex-1">
        <aside className="w-56 shrink-0 border-r border-border-subtle bg-surface-muted/80 p-4">
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
            {t("workspace")}
          </p>
          <nav className="flex flex-col gap-1">
            <NavLink to={ROUTES.scenarios} className={linkClass}>
              {t("scenarios")}
            </NavLink>
          </nav>
        </aside>
        <main className="flex min-h-0 flex-1 flex-col bg-surface">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
