import { type ChangeEvent, useEffect, useState } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { useTranslation } from "react-i18next";
import { useFlowStore } from "@/entities/flow/model/flowStore";
import type { ActionFlowNode } from "@/entities/flow/model/types";

export function ActionNode({ id, data, selected }: NodeProps<ActionFlowNode>) {
  const { t } = useTranslation();
  const updateNode = useFlowStore((s) => s.updateNode);
  const [label, setLabel] = useState(data.label);
  const [actionType, setActionType] = useState(data.actionType);

  useEffect(() => {
    setLabel(data.label);
    setActionType(data.actionType);
  }, [data.actionType, data.label]);

  const commit = () => {
    updateNode(id, {
      label: label.trim() || t("untitledAction"),
      actionType: actionType.trim() || "custom",
    });
  };

  const onLabelChange = (e: ChangeEvent<HTMLInputElement>) => setLabel(e.target.value);
  const onTypeChange = (e: ChangeEvent<HTMLInputElement>) => setActionType(e.target.value);

  return (
    <div
      className={`min-w-[220px] rounded-lg border bg-white px-3 py-2 shadow-sm ${
        selected ? "border-brand ring-2 ring-brand/25" : "border-slate-200"
      }`}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="text-[10px] font-bold uppercase tracking-wide text-brand">{t("nodeAction")}</span>
      </div>
      <label className="block text-[11px] font-medium text-slate-600" htmlFor={`${id}-label`}>
        {t("fieldLabel")}
      </label>
      <input
        id={`${id}-label`}
        className="mb-2 mt-0.5 w-full rounded border border-slate-200 px-2 py-1 text-sm text-slate-900 outline-none focus:border-brand"
        value={label}
        onChange={onLabelChange}
        onBlur={commit}
      />
      <label className="block text-[11px] font-medium text-slate-600" htmlFor={`${id}-type`}>
        {t("fieldType")}
      </label>
      <input
        id={`${id}-type`}
        className="mt-0.5 w-full rounded border border-slate-200 px-2 py-1 text-xs text-slate-800 outline-none focus:border-brand"
        value={actionType}
        onChange={onTypeChange}
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
        className="!h-2.5 !w-2.5 !border !border-white !bg-brand"
      />
    </div>
  );
}
