import { Edge } from '@xyflow/react';
import { useCallback, useContext } from 'react';
import { Node } from '../types/visualize';
import { GraphCtx } from '../context/graph';

export function useToggleBranch() {
  const ctx = useContext(GraphCtx);
  if (!ctx)
    throw new Error('useToggleBranch must be used inside <GraphCtx.Provider>');

  const { setNodes, setEdges, collapsedIds, setCollapsedIds } = ctx;

  const toggleBranch = useCallback(
    (parentId: string) => {
      const hide = !collapsedIds.includes(parentId);

      let newCollapsedIds: string[];
      if (hide) {
        newCollapsedIds = [...collapsedIds, parentId];
        setCollapsedIds(newCollapsedIds);
      } else {
        newCollapsedIds = collapsedIds.filter((id) => id !== parentId);
        setCollapsedIds(newCollapsedIds);
      }

      setNodes((nodes: Node[]) => {
        return nodes.map((nodeProp) => {
          // Find all ancestor IDs of this node
          // If expanding, only unhide if no ancestor is collapsed
          if (
            !hide &&
            nodeProp.id !== parentId &&
            nodeProp.id.startsWith(parentId)
          ) {
            const stillCollapsed = newCollapsedIds.some(
              (id) => nodeProp.id.startsWith(id) && nodeProp.id !== id
            );
            return { ...nodeProp, hidden: stillCollapsed };
          }
          // If collapsing, hide all descendants
          if (
            hide &&
            nodeProp.id !== parentId &&
            nodeProp.id.startsWith(parentId)
          ) {
            return { ...nodeProp, hidden: true };
          }
          return nodeProp;
        });
      });

      setEdges((eds: Edge[]) =>
        eds.map((e) => {
          if (hide && e.source.startsWith(parentId)) {
            return { ...e, hidden: true };
          }
          if (!hide && e.source.startsWith(parentId)) {
            const stillCollapsed = newCollapsedIds.some(
              (id) => e.source.startsWith(id) && e.source !== id
            );
            return { ...e, hidden: stillCollapsed };
          }
          return e;
        })
      );
    },
    [setNodes, setEdges, collapsedIds, setCollapsedIds]
  );

  return toggleBranch;
}
