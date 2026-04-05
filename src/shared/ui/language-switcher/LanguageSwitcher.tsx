import { useTranslation } from "react-i18next";
import { persistLanguage, type AppLanguage } from "@/shared/config/i18n";

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const active: AppLanguage = i18n.language.toLowerCase().startsWith("ru") ? "ru" : "en";

  const pick = (lng: AppLanguage) => {
    void i18n.changeLanguage(lng);
    persistLanguage(lng);
  };

  const tab =
    "rounded px-2.5 py-1 text-xs font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

  return (
    <div
      className="inline-flex items-center gap-0.5 rounded-md border border-border-subtle bg-surface-muted p-0.5"
      role="group"
      aria-label={t("language")}
    >
      <button
        type="button"
        className={`${tab} ${active === "en" ? "bg-white text-brand shadow-sm" : "text-slate-600 hover:bg-white/70"}`}
        onClick={() => pick("en")}
        aria-pressed={active === "en"}
        title={t("languageEn")}
      >
        EN
      </button>
      <button
        type="button"
        className={`${tab} ${active === "ru" ? "bg-white text-brand shadow-sm" : "text-slate-600 hover:bg-white/70"}`}
        onClick={() => pick("ru")}
        aria-pressed={active === "ru"}
        title={t("languageRu")}
      >
        RU
      </button>
    </div>
  );
}
