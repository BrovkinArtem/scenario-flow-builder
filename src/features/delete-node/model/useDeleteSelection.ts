import { useCallback } from "react";
import { useReactFlow } from "@xyflow/react";

export function useDeleteSelection() {
  const { getNodes, getEdges, deleteElements } = useReactFlow();

  return useCallback(() => {
    const nodes = getNodes().filter((n) => n.selected);
    const edges = getEdges().filter((e) => e.selected);
    if (nodes.length === 0 && edges.length === 0) return;
    void deleteElements({ nodes, edges });
  }, [deleteElements, getEdges, getNodes]);
}
