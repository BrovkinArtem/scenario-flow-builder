import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/shared/ui/language-switcher/LanguageSwitcher";

export function AppHeader() {
  const { t } = useTranslation();

  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-4 border-b border-border-subtle bg-surface-card px-6">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-brand text-sm font-bold text-white">
          SF
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-900">{t("appTitle")}</p>
          <p className="truncate text-xs text-slate-500">{t("appSubtitle")}</p>
        </div>
      </div>
      <div className="shrink-0">
        <LanguageSwitcher />
      </div>
    </header>
  );
}
