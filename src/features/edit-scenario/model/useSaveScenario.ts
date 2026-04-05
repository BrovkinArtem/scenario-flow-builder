import { useCallback, useEffect, useRef, useState } from "react";
import { saveScenario } from "@/entities/scenario/api/mockScenarioApi";
import type { Scenario } from "@/entities/scenario/model/types";
import { useFlowStore } from "@/entities/flow/model/flowStore";
import i18n from "@/shared/config/i18n";

export type SaveScenarioStatus = "idle" | "loading" | "success" | "error";

const SUCCESS_MS = 3200;

export function useSaveScenario(scenarioId: string, title: string) {
  const nodes = useFlowStore((s) => s.nodes);
  const edges = useFlowStore((s) => s.edges);
  const [status, setStatus] = useState<SaveScenarioStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => () => clearTimer(), [clearTimer]);

  const save = useCallback(async () => {
    clearTimer();
    setStatus("loading");
    setErrorMessage(null);
    try {
      const payload: Scenario = {
        id: scenarioId,
        title: title.trim() || i18n.t("untitledScenario"),
        updatedAt: new Date().toISOString(),
        nodes,
        edges,
      };
      await saveScenario(payload);
      setStatus("success");
      timerRef.current = setTimeout(() => {
        setStatus("idle");
        timerRef.current = null;
      }, SUCCESS_MS);
    } catch (e) {
      const message = e instanceof Error ? e.message : i18n.t("error");
      setErrorMessage(message);
      setStatus("error");
    }
  }, [clearTimer, edges, nodes, scenarioId, title]);

  return { save, status, errorMessage };
}
