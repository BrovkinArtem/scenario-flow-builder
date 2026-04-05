import { useCallback } from "react";
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  type Connection,
  type Edge,
} from "@xyflow/react";
import { isDuplicateConnection, useFlowStore } from "@/entities/flow/model/flowStore";
import { flowNodeTypes } from "@/widgets/flow-canvas/model/nodeTypes";

export function FlowCanvas() {
  const nodes = useFlowStore((s) => s.nodes);
  const edges = useFlowStore((s) => s.edges);
  const onNodesChange = useFlowStore((s) => s.onNodesChange);
  const onEdgesChange = useFlowStore((s) => s.onEdgesChange);
  const onConnect = useFlowStore((s) => s.onConnect);

  const isValidConnection = useCallback((c: Connection | Edge) => {
    if (!c.source || !c.target) return false;
    if (c.source === c.target) return false;
    return !isDuplicateConnection(useFlowStore.getState().edges, c);
  }, []);

  return (
    <ReactFlow
      className="h-full w-full bg-slate-50"
      nodes={nodes}
      edges={edges}
      nodeTypes={flowNodeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      isValidConnection={isValidConnection}
      fitView
      fitViewOptions={{ padding: 0.2 }}
      deleteKeyCode={["Backspace", "Delete"]}
      proOptions={{ hideAttribution: true }}
      defaultEdgeOptions={{ type: "smoothstep" }}
      snapToGrid
      snapGrid={[16, 16]}
    >
      <Background gap={16} color="#cbd5e1" size={1} />
      <Controls className="!shadow-md" />
      <MiniMap
        pannable
        zoomable
        className="!rounded-md !border !border-border-subtle !bg-white/90"
      />
    </ReactFlow>
  );
}
