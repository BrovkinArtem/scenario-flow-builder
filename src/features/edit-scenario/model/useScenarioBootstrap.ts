import { useEffect } from "react";
import { useFlowStore } from "@/entities/flow/model/flowStore";
import type { Scenario } from "@/entities/scenario/model/types";

export function useScenarioBootstrap(scenario: Scenario) {
  const setFlow = useFlowStore((s) => s.setFlow);
  const resetFlow = useFlowStore((s) => s.resetFlow);

  useEffect(() => {
    setFlow(scenario.nodes, scenario.edges);
    return resetFlow;
  }, [resetFlow, scenario, setFlow]);
}
