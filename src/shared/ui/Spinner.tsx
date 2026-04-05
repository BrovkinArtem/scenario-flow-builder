import { useTranslation } from "react-i18next";

export function Spinner({ label }: { label?: string }) {
  const { t } = useTranslation();
  const text = label ?? t("loading");

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-slate-600">
      <div
        className="h-10 w-10 animate-spin rounded-full border-2 border-slate-300 border-t-brand"
        role="status"
        aria-label={text}
      />
      <p className="text-sm">{text}</p>
    </div>
  );
}
