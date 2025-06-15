import {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ReactFlow,
  useNodesState,
  useEdgesState,
  Edge,
} from '@xyflow/react';
import { ReactNode, useContext, useEffect, useState } from 'react';
import { visualizeRequest } from '../services/visualize';
import { TEST_JSON } from '../services/input';
import { CustomNode } from './Node';
import { Node } from '../types/visualize';
import { GraphCtx } from '../context/graph';
import { useHighlightRelations } from '../hooks/useHighlightRelations';

const nodeTypes = {
  custom: CustomNode,
};

export function Graph() {
  const ctx = useContext(GraphCtx);
  const highlight = useHighlightRelations();

  if (!ctx) throw new Error('<Graph> must be used inside <GraphCtx.Provider>');

  const {
    edges,
    loading,
    nodes,
    onEdgesChange,
    onNodesChange,
    setEdges,
    setLoading,
    setNodes,
  } = ctx;

  useEffect(() => {
    setLoading(true);

    const fetchVisualization = async () => {
      const res = await visualizeRequest(TEST_JSON);
      setNodes(res.newNodes);
      setEdges(res.newEdges);
      setLoading(false);
    };

    fetchVisualization().finally(() => setLoading(false));
  }, [setEdges, setLoading, setNodes]);

  return (
    <>
      {!loading ? (
        <div className='h-screen w-screen '>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeMouseEnter={(_, node) => highlight(node.id)}
            onNodeMouseLeave={() => highlight(null)}
            nodeTypes={nodeTypes}
            onlyRenderVisibleElements
            fitView
          >
            <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
            <Controls />
            <MiniMap />
          </ReactFlow>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

interface GraphWrapperProps {
  children: ReactNode;
}

export function GraphWrapper({ children }: GraphWrapperProps) {
  const [loading, setLoading] = useState(false);
  const [collapsedIds, setCollapsedIds] = useState<string[]>([]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  return <GraphCtx.Provider
    value={{
      nodes,
      edges,
      collapsedIds,
      hoveredId,
      loading,
      setNodes,
      setEdges,
      setCollapsedIds,
      setHoveredId,
      setLoading,
      onNodesChange,
      onEdgesChange,
    }}
  >
    {children}
  </GraphCtx.Provider>;
}
