import { Edge, OnEdgesChange, OnNodesChange, useEdgesState, useNodesState } from '@xyflow/react';
import { createContext } from 'react';
import { Node } from '../types/visualize';

export const GraphCtx = createContext<{
  nodes: Node[];
  setNodes: ReturnType<typeof useNodesState<Node>>[1];
  edges: Edge[];
  setEdges: ReturnType<typeof useEdgesState<Edge>>[1];
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
  collapsedIds: string[];
  setCollapsedIds: (ids: string[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  onNodesChange: OnNodesChange<Node>;
  onEdgesChange: OnEdgesChange<Edge>;
} | null>(null);