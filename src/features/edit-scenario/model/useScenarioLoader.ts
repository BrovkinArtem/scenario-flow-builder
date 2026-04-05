import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getScenarioById } from "@/entities/scenario/api/mockScenarioApi";
import type { Scenario } from "@/entities/scenario/model/types";
import i18n from "@/shared/config/i18n";
import { ROUTES } from "@/shared/config/routes";

export type ScenarioLoadState =
  | { kind: "loading" }
  | { kind: "notFound" }
  | { kind: "error"; message: string }
  | { kind: "ready"; scenario: Scenario };

export function useScenarioLoader(scenarioId: string | undefined) {
  const navigate = useNavigate();
  const [state, setState] = useState<ScenarioLoadState>({ kind: "loading" });
  const [title, setTitle] = useState("");

  const reload = useCallback(() => {
    if (!scenarioId) return;
    setState({ kind: "loading" });
    void getScenarioById(scenarioId)
      .then((data) => {
        if (!data) {
          setState({ kind: "notFound" });
          return;
        }
        setTitle(data.title);
        setState({ kind: "ready", scenario: data });
      })
      .catch((e: unknown) => {
        setState({
          kind: "error",
          message: e instanceof Error ? e.message : i18n.t("error"),
        });
      });
  }, [scenarioId]);

  useEffect(() => {
    if (!scenarioId) {
      navigate(ROUTES.scenarios, { replace: true });
      return;
    }
    reload();
  }, [navigate, reload, scenarioId]);

  return { state, title, setTitle, reload };
}
