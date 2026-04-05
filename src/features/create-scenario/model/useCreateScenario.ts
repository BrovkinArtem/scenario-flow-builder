import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveScenario } from "@/entities/scenario/api/mockScenarioApi";
import type { Scenario } from "@/entities/scenario/model/types";
import i18n from "@/shared/config/i18n";
import { ROUTES } from "@/shared/config/routes";
import { generateScenarioId } from "@/shared/lib/generateId";

export type CreateScenarioStatus = "idle" | "loading" | "error";

export function useCreateScenario() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<CreateScenarioStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const createNew = useCallback(async () => {
    setStatus("loading");
    setErrorMessage(null);
    try {
      const scenario: Scenario = {
        id: generateScenarioId(),
        title: i18n.t("untitledScenario"),
        updatedAt: new Date().toISOString(),
        nodes: [],
        edges: [],
      };
      await saveScenario(scenario);
      navigate(ROUTES.scenarioEditor(scenario.id));
      setStatus("idle");
    } catch (e) {
      const message = e instanceof Error ? e.message : i18n.t("error");
      setErrorMessage(message);
      setStatus("error");
    }
  }, [navigate]);

  return { createNew, status, errorMessage };
}
