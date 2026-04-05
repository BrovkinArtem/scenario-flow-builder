import { type ChangeEvent, useEffect, useState } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { useTranslation } from "react-i18next";
import { useFlowStore } from "@/entities/flow/model/flowStore";
import type { ConditionFlowNode } from "@/entities/flow/model/types";

export function ConditionNode({ id, data, selected }: NodeProps<ConditionFlowNode>) {
  const { t } = useTranslation();
  const updateNode = useFlowStore((s) => s.updateNode);
  const [label, setLabel] = useState(data.label);
  const [expression, setExpression] = useState(data.expression);

  useEffect(() => {
    setLabel(data.label);
    setExpression(data.expression);
  }, [data.expression, data.label]);

  const commit = () => {
    updateNode(id, {
      label: label.trim() || t("untitledCondition"),
      expression: expression.trim() || "true",
    });
  };

  return (
    <div
      className={`min-w-[240px] rounded-lg border bg-amber-50/80 px-3 py-2 shadow-sm ${
        selected ? "border-amber-500 ring-2 ring-amber-200" : "border-amber-200"
      }`}
    >
      <div className="mb-2">
        <span className="text-[10px] font-bold uppercase tracking-wide text-amber-800">
          {t("nodeCondition")}
        </span>
      </div>
      <label className="block text-[11px] font-medium text-amber-900/80" htmlFor={`${id}-clabel`}>
        {t("fieldLabel")}
      </label>
      <input
        id={`${id}-clabel`}
        className="mb-2 mt-0.5 w-full rounded border border-amber-200 bg-white px-2 py-1 text-sm text-slate-900 outline-none focus:border-amber-500"
        value={label}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setLabel(e.target.value)}
        onBlur={commit}
      />
      <label className="block text-[11px] font-medium text-amber-900/80" htmlFor={`${id}-expr`}>
        {t("fieldExpression")}
      </label>
      <textarea
        id={`${id}-expr`}
        rows={2}
        className="mt-0.5 w-full resize-none rounded border border-amber-200 bg-white px-2 py-1 font-mono text-xs text-slate-900 outline-none focus:border-amber-500"
        value={expression}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setExpression(e.target.value)}
        onBlur={commit}
      />
      <Handle
        type="target"
        position={Position.Top}
        className="!h-2.5 !w-2.5 !border !border-white !bg-slate-500"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="true"
        className="!left-[30%] !h-2.5 !w-2.5 !border !border-white !bg-emerald-600"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="false"
        className="!left-[70%] !h-2.5 !w-2.5 !border !border-white !bg-slate-500"
      />
    </div>
  );
}
