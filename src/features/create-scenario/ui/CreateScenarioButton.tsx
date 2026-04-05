import { useTranslation } from "react-i18next";
import { useCreateScenario } from "@/features/create-scenario/model/useCreateScenario";
import { Alert } from "@/shared/ui/Alert";
import { Button } from "@/shared/ui/Button";

export function CreateScenarioButton() {
  const { t } = useTranslation();
  const { createNew, status, errorMessage } = useCreateScenario();

  return (
    <div className="flex flex-col items-end gap-2">
      <Button onClick={() => void createNew()} isLoading={status === "loading"}>
        {t("createScenario")}
      </Button>
      {status === "error" && errorMessage ? (
        <Alert tone="error">{errorMessage}</Alert>
      ) : null}
    </div>
  );
}
