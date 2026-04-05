import { useTranslation } from "react-i18next";
import { createActionNode, createConditionNode } from "@/features/add-node/model/defaultNodeFactory";
import { useFlowStore } from "@/entities/flow/model/flowStore";
import { Button } from "@/shared/ui/Button";

export function AddNodeToolbar() {
  const { t } = useTranslation();
  const addNode = useFlowStore((s) => s.addNode);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {t("addNode")}
      </span>
      <Button
        variant="secondary"
        className="text-xs"
        onClick={() => addNode(createActionNode())}
      >
        {t("nodeAction")}
      </Button>
      <Button
        variant="secondary"
        className="text-xs"
        onClick={() => addNode(createConditionNode())}
      >
        {t("nodeCondition")}
      </Button>
    </div>
  );
}
