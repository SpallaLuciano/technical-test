import { Node as XFlowNode, Edge } from '@xyflow/react';
import { CSSProperties } from 'react';

export type NodeData = {
  label: string;
  style: CSSProperties;
  highlighted?: boolean;
}

export type Node = XFlowNode<NodeData>;

export type VisualizeResponse = {
  newNodes: Node[];
  newEdges: Edge[];
}
