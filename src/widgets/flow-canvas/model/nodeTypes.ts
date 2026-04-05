import type { NodeTypes } from "@xyflow/react";
import { ActionNode } from "@/widgets/flow-canvas/nodes/ActionNode";
import { ConditionNode } from "@/widgets/flow-canvas/nodes/ConditionNode";

export const flowNodeTypes = {
  action: ActionNode,
  condition: ConditionNode,
} satisfies NodeTypes;
