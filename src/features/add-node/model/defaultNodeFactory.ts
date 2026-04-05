import type { FlowNode } from "@/entities/flow/model/types";
import i18n from "@/shared/config/i18n";
import { generateNodeId } from "@/shared/lib/generateId";

let offset = 0;

function nextPosition() {
  offset += 1;
  return { x: 120 + (offset % 5) * 40, y: 120 + (offset % 3) * 36 };
}

export function createActionNode(): FlowNode {
  return {
    id: generateNodeId(),
    type: "action",
    position: nextPosition(),
    data: { label: i18n.t("newAction"), actionType: "custom" },
  };
}

export function createConditionNode(): FlowNode {
  return {
    id: generateNodeId(),
    type: "condition",
    position: nextPosition(),
    data: { label: i18n.t("newCondition"), expression: "true" },
  };
}
