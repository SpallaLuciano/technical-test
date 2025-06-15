import { VisualizeResponse } from '../types/visualize';
import { apiClient } from './api-client';

export async function visualizeRequest(request: unknown) {
  const response = await apiClient<unknown, VisualizeResponse>(
    'api/visualize',
    request
  );

  const newNodes = response.newNodes.map((node) => ({
      id: node.id,
      type: 'custom',
      position: { x: node.position.x, y: node.position.y },
      data: {
        label: node.data.label,
        style: node.style || {},
        hidden: false,
      },
  }));

  return { newNodes, newEdges: response.newEdges};
}
