import {
  addEdge as rfAddEdge,
  applyEdgeChanges,
  applyNodeChanges,
  type Connection,
  type Edge,
  type EdgeChange,
  type NodeChange,
} from "@xyflow/react";
import { create } from "zustand";
import type { ActionNodeData, ConditionNodeData, FlowEdge, FlowNode } from "./types";

type Endpoints = {
  source: string;
  target: string;
  sourceHandle?: string | null;
  targetHandle?: string | null;
};

function sameEndpoints(a: Endpoints, b: Endpoints): boolean {
  return (
    a.source === b.source &&
    a.target === b.target &&
    (a.sourceHandle ?? null) === (b.sourceHandle ?? null) &&
    (a.targetHandle ?? null) === (b.targetHandle ?? null)
  );
}

function removedNodeIds(changes: NodeChange<FlowNode>[]): Set<string> {
  const ids = new Set<string>();
  for (const ch of changes) {
    if (ch.type === "remove") ids.add(ch.id);
  }
  return ids;
}

function withoutEdgesToNodes(edges: FlowEdge[], nodeIds: Set<string>): FlowEdge[] {
  if (nodeIds.size === 0) return edges;
  return edges.filter((e) => !nodeIds.has(e.source) && !nodeIds.has(e.target));
}

export interface FlowStoreState {
  nodes: FlowNode[];
  edges: FlowEdge[];
  onNodesChange: (changes: NodeChange<FlowNode>[]) => void;
  onEdgesChange: (changes: EdgeChange<FlowEdge>[]) => void;
  onConnect: (connection: Connection) => void;
  addNode: (node: FlowNode) => void;
  updateNode: (id: string, data: Partial<ActionNodeData & ConditionNodeData>) => void;
  deleteNode: (id: string) => void;
  addEdge: (edge: FlowEdge) => void;
  deleteEdge: (id: string) => void;
  setFlow: (nodes: FlowNode[], edges: FlowEdge[]) => void;
  resetFlow: () => void;
}

export const useFlowStore = create<FlowStoreState>((set, get) => ({
  nodes: [],
  edges: [],

  onNodesChange: (changes) => {
    const removed = removedNodeIds(changes);
    set((state) => {
      const nodes = applyNodeChanges(changes, state.nodes) as FlowNode[];
      const edges = removed.size > 0 ? withoutEdgesToNodes(state.edges, removed) : state.edges;
      return { nodes, edges };
    });
  },

  onEdgesChange: (changes) =>
    set((state) => ({
      edges: applyEdgeChanges(changes, state.edges),
    })),

  onConnect: (connection) => {
    const { edges } = get();
    if (!connection.source || !connection.target) return;
    if (connection.source === connection.target) return;
    if (edges.some((e) => sameEndpoints(e, connection))) return;
    set((state) => ({
      edges: rfAddEdge(connection, state.edges),
    }));
  },

  addNode: (node) =>
    set((state) => ({
      nodes: [...state.nodes, node],
    })),

  updateNode: (id, data) =>
    set((state) => ({
      nodes: state.nodes.map((node) => {
        if (node.id !== id) return node;
        return { ...node, data: { ...node.data, ...data } };
      }) as FlowNode[],
    })),

  deleteNode: (id) =>
    set((state) => ({
      nodes: state.nodes.filter((n) => n.id !== id),
      edges: state.edges.filter((e) => e.source !== id && e.target !== id),
    })),

  addEdge: (edge) =>
    set((state) => {
      if (edge.source === edge.target) return state;
      if (state.edges.some((e) => e.id === edge.id)) return state;
      if (state.edges.some((e) => sameEndpoints(e, edge))) return state;
      return { edges: [...state.edges, edge] };
    }),

  deleteEdge: (id) =>
    set((state) => ({
      edges: state.edges.filter((e) => e.id !== id),
    })),

  setFlow: (nodes, edges) => set({ nodes, edges }),

  resetFlow: () => set({ nodes: [], edges: [] }),
}));

export function isDuplicateConnection(edges: FlowEdge[], c: Connection | Edge): boolean {
  return edges.some((e) => sameEndpoints(e, c));
}
