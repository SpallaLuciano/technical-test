import { Handle, NodeProps, Position } from '@xyflow/react';
import { Node } from '../types/visualize';
import { useToggleBranch } from '../hooks/useToggleBranch';
import { cn } from '../lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/ui/tooltip';
import { useContext } from 'react';
import { GraphCtx } from '../context/graph';

export function CustomNode({ id, data, isConnectable }: NodeProps<Node>) {
  const toggleBranch = useToggleBranch();
  const ctx = useContext(GraphCtx);
  
  const collapsedIds = ctx?.collapsedIds || [];

  const onNodeCollapse = () => {
    toggleBranch(id);
  };

  let label = data.label.split('=').pop()!;
  const highlighted = data.highlighted;
  if (label.includes('[')) label = label.split('[')[1].substring(0, 1);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipContent>
          <span>Id: {id}</span>
        </TooltipContent>
        <TooltipTrigger>
          <div
            className={cn(
              'bg-white rounded-lg shadow-md p-2 text-center select-none w-full h-full',
              highlighted && "!bg-green-500 !border-green-700"
            )}
            style={data.style}
          >
            <Handle
              id='in'
              type='target'
              position={Position.Top}
              isConnectable={isConnectable}
            />
            <div className='flex justify-between items-center'>
              <span>{label}</span>
              <button className='border border-black rounded-none h-4 w-4 leading-3' type='button' onClick={onNodeCollapse}>{collapsedIds.includes(id) ? "+" : "-"}</button>
            </div>
            <Handle
              id='out'
              type='source'
              position={Position.Bottom}
              isConnectable={isConnectable}
            />
          </div>
        </TooltipTrigger>
      </Tooltip>
    </TooltipProvider>
  );
}
