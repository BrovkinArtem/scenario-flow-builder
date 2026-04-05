import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import type { ScenarioSummary } from "@/entities/scenario/model/types";
import { ROUTES } from "@/shared/config/routes";
import { Card } from "@/shared/ui/Card";

export function ScenarioList({ items }: { items: ScenarioSummary[] }) {
  const { t, i18n } = useTranslation();

  const formatUpdatedAt = (iso: string): string => {
    try {
      return new Intl.DateTimeFormat(i18n.language, {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(iso));
    } catch {
      return iso;
    }
  };

  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {items.map((scenario) => (
        <Link key={scenario.id} to={ROUTES.scenarioEditor(scenario.id)} className="group block">
          <Card className="h-full p-4 transition-shadow group-hover:shadow-md">
            <p className="text-base font-semibold text-slate-900 group-hover:text-brand">
              {scenario.title}
            </p>
            <p className="mt-2 text-xs text-slate-500">
              {t("updatedAt", { date: formatUpdatedAt(scenario.updatedAt) })}
            </p>
          </Card>
        </Link>
      ))}
    </div>
  );
}
