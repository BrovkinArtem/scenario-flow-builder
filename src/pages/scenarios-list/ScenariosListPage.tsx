import { useTranslation } from "react-i18next";
import { CreateScenarioButton } from "@/features/create-scenario/ui/CreateScenarioButton";
import { useScenariosList } from "@/shared/hooks/useScenariosList";
import { Alert } from "@/shared/ui/Alert";
import { Button } from "@/shared/ui/Button";
import { Card } from "@/shared/ui/Card";
import { PageShell } from "@/shared/ui/PageShell";
import { Spinner } from "@/shared/ui/Spinner";
import { ScenarioList } from "@/widgets/scenario-list/ScenarioList";

export function ScenariosListPage() {
  const { t } = useTranslation();
  const { scenarios, loading, error, refetch } = useScenariosList();

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-auto">
      <PageShell
        title={t("scenarios")}
        description={t("scenariosPageDescription")}
        actions={<CreateScenarioButton />}
      >
        {loading ? <Spinner label={t("loadingScenarios")} /> : null}

        {error ? (
          <div className="space-y-3">
            <Alert tone="error">{error}</Alert>
            <Button variant="secondary" onClick={() => void refetch()}>
              {t("retry")}
            </Button>
          </div>
        ) : null}

        {!loading && !error && scenarios && scenarios.length === 0 ? (
          <Card className="p-10 text-center">
            <p className="text-lg font-medium text-slate-900">{t("noScenariosTitle")}</p>
            <p className="mt-2 text-sm text-slate-600">{t("noScenariosDescription")}</p>
          </Card>
        ) : null}

        {!loading && !error && scenarios && scenarios.length > 0 ? (
          <ScenarioList items={scenarios} />
        ) : null}
      </PageShell>
    </div>
  );
}
