import { useCallback, useContext } from 'react';
import { GraphCtx } from '../context/graph';

export function useHighlightRelations() {
  const ctx = useContext(GraphCtx);
  if (!ctx)
    throw new Error(
      'useHighlightRelations must be used inside <GraphCtx.Provider>'
    );

  const { setHoveredId, setNodes, edges } = ctx;

  const highlight = useCallback(
    (nodeId: string | null) => {
      setHoveredId(nodeId);

      const relatedIds = edges.filter((edge) => edge.target === nodeId || edge.source === nodeId).reduce((acc, edge) => {
        acc.add(edge.target);
        acc.add(edge.source);
        return acc;
      }, new Set<string>());

      setNodes((nodes) =>
        nodes.map((node) => {
          return relatedIds.has(node.id)
            ? { ...node, data: { ...node.data, highlighted: true } }
            : { ...node, data: { ...node.data, highlighted: false } };
        })
      );
    },
    [edges, setHoveredId, setNodes]
  );

  return highlight;
}
