import { useTranslation } from "react-i18next";
import { AddNodeToolbar } from "@/features/add-node/ui/AddNodeToolbar";
import { DeleteSelectedButton } from "@/features/delete-node/ui/DeleteSelectedButton";
import type { SaveScenarioStatus } from "@/features/edit-scenario/model/useSaveScenario";
import { Alert } from "@/shared/ui/Alert";
import { Button } from "@/shared/ui/Button";

export function EditorToolbar({
  title,
  onTitleChange,
  onSave,
  status,
  errorMessage,
}: {
  title: string;
  onTitleChange: (value: string) => void;
  onSave: () => void;
  status: SaveScenarioStatus;
  errorMessage: string | null;
}) {
  const { t } = useTranslation();
  const saving = status === "loading";

  return (
    <div className="flex flex-col gap-3 border-b border-border-subtle bg-surface-card px-6 py-4">
      <div className="flex flex-wrap items-end gap-4">
        <div className="min-w-[220px] flex-1">
          <label
            className="text-xs font-semibold uppercase tracking-wide text-slate-500"
            htmlFor="scenario-title"
          >
            {t("scenarioTitle")}
          </label>
          <input
            id="scenario-title"
            className="mt-1 w-full rounded-md border border-border-subtle px-3 py-2 text-sm text-slate-900 outline-none focus:border-brand"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <AddNodeToolbar />
          <div className="hidden h-6 w-px bg-border-subtle sm:block" aria-hidden />
          <DeleteSelectedButton />
          <Button onClick={() => void onSave()} isLoading={saving} disabled={saving}>
            {t("save")}
          </Button>
        </div>
      </div>
      {status === "success" ? <Alert tone="success">{t("saveSuccess")}</Alert> : null}
      {status === "error" && errorMessage ? <Alert tone="error">{errorMessage}</Alert> : null}
    </div>
  );
}
