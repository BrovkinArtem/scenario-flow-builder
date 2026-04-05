import type { FlowEdge, FlowNode } from "@/entities/flow/model/types";

export interface Scenario {
  id: string;
  title: string;
  updatedAt: string;
  nodes: FlowNode[];
  edges: FlowEdge[];
}

export interface ScenarioSummary {
  id: string;
  title: string;
  updatedAt: string;
}
