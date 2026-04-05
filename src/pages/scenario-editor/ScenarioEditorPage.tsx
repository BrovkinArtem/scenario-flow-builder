import { ReactFlowProvider } from "@xyflow/react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import type { Scenario } from "@/entities/scenario/model/types";
import { useSaveScenario } from "@/features/edit-scenario/model/useSaveScenario";
import { useScenarioBootstrap } from "@/features/edit-scenario/model/useScenarioBootstrap";
import { useScenarioLoader } from "@/features/edit-scenario/model/useScenarioLoader";
import { EditorToolbar } from "@/features/edit-scenario/ui/EditorToolbar";
import { ROUTES } from "@/shared/config/routes";
import { Alert } from "@/shared/ui/Alert";
import { Button } from "@/shared/ui/Button";
import { Spinner } from "@/shared/ui/Spinner";
import { FlowCanvas } from "@/widgets/flow-canvas/FlowCanvas";

function EditorBody({
  scenario,
  title,
  onTitleChange,
}: {
  scenario: Scenario;
  title: string;
  onTitleChange: (value: string) => void;
}) {
  useScenarioBootstrap(scenario);
  const { save, status, errorMessage } = useSaveScenario(scenario.id, title);

  return (
    <div className="flex h-full min-h-0 flex-col">
      <EditorToolbar
        title={title}
        onTitleChange={onTitleChange}
        onSave={save}
        status={status}
        errorMessage={errorMessage}
      />
      <div className="relative min-h-0 flex-1">
        <div className="absolute inset-0">
          <FlowCanvas />
        </div>
      </div>
    </div>
  );
}

export function ScenarioEditorPage() {
  const { t } = useTranslation();
  const { scenarioId } = useParams();
  const { state, title, setTitle, reload } = useScenarioLoader(scenarioId);

  if (!scenarioId) {
    return null;
  }

  if (state.kind === "loading") {
    return (
      <div className="p-8">
        <Spinner label={t("loadingScenario")} />
      </div>
    );
  }

  if (state.kind === "error") {
    return (
      <div className="space-y-4 p-8">
        <Alert tone="error">{state.message}</Alert>
        <Button variant="secondary" onClick={() => reload()}>
          {t("retry")}
        </Button>
      </div>
    );
  }

  if (state.kind === "notFound") {
    return (
      <div className="space-y-4 p-8">
        <Alert tone="error">{t("scenarioNotFound")}</Alert>
        <Link
          to={ROUTES.scenarios}
          className="inline-flex rounded-md border border-border-subtle bg-white px-3 py-2 text-sm font-medium text-slate-800 hover:bg-surface-muted"
        >
          {t("backToScenarios")}
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex items-center justify-between border-b border-border-subtle bg-surface-card px-6 py-3">
        <Link
          to={ROUTES.scenarios}
          className="text-sm font-medium text-brand hover:text-brand-hover"
        >
          {t("backToScenariosShort")}
        </Link>
        <span className="text-xs text-slate-500">{t("editor")}</span>
      </div>
      <ReactFlowProvider>
        <EditorBody scenario={state.scenario} title={title} onTitleChange={setTitle} />
      </ReactFlowProvider>
    </div>
  );
}
