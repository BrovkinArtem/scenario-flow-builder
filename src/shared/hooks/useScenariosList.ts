import { useCallback, useEffect, useState } from "react";
import { getScenarios } from "@/entities/scenario/api/mockScenarioApi";
import type { ScenarioSummary } from "@/entities/scenario/model/types";
import i18n from "@/shared/config/i18n";

export function useScenariosList() {
  const [scenarios, setScenarios] = useState<ScenarioSummary[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const list = await getScenarios();
      setScenarios(list);
    } catch (e) {
      const message = e instanceof Error ? e.message : i18n.t("error");
      setError(message);
      setScenarios(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refetch();
  }, [refetch]);

  return { scenarios, loading, error, refetch };
}
