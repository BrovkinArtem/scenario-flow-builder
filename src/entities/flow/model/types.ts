import type { Edge, Node } from "@xyflow/react";

export interface ActionNodeData extends Record<string, unknown> {
  label: string;
  actionType: string;
}

export interface ConditionNodeData extends Record<string, unknown> {
  label: string;
  expression: string;
}

export type ActionFlowNode = Node<ActionNodeData, "action">;
export type ConditionFlowNode = Node<ConditionNodeData, "condition">;

export type FlowNode = ActionFlowNode | ConditionFlowNode;

export type FlowEdge = Edge;

export type FlowNodeType = FlowNode["type"];
