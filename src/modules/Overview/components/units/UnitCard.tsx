import { STATUSES } from '@/constants';
import { DynamicIcon } from 'lucide-react/dynamic';
import { TreeNode } from '@/types';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface RenderNodeProps {
  draggingId?: string | null;
  dropTargetId?: string | null;
  dropPos?: 'above' | 'below' | 'inside' | null;
  onDragStart?: (e: React.MouseEvent, el: HTMLElement, id: string) => void;
}

export const UnitCard: React.FC<{
  node: TreeNode;
  dragProps?: RenderNodeProps;
  css?: string;
}> = ({ node, dragProps, css }) => {
  const handleMouseDown = (e: React.MouseEvent) => {
    if (dragProps?.onDragStart) {
      dragProps.onDragStart(e, e.currentTarget as HTMLElement, node.id);
    }
  };

  return (
    <div
      className={`card ${dragProps?.dropTargetId === node.id ? 'drop-target' : ''} ${css ? css : ''} relative`}
      data-node-id={node.id}
      onMouseDown={handleMouseDown}
    >
      {'rank' in node ? (
        <>
          <strong className="mr-4 flex justify-between">
            <span className="text-left">{node.name}</span>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="absolute top-2 right-2">
                  <DynamicIcon
                    name={STATUSES[node.statusCode].icon}
                    size={24}
                    color={STATUSES[node.statusCode].color}
                  />
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>{STATUSES[node.statusCode].description}</p>
              </TooltipContent>
            </Tooltip>
          </strong>
          <div>{node.rank}</div>
          <small>{node.unit.name}</small>
        </>
      ) : (
        <>
          <strong>{node.unit?.name ?? node.name}</strong>
          {node.commander && (
            <p>
              <small>{node.commander.name}</small>
              <small>{node.commander.rank}</small>
            </p>
          )}
        </>
      )}
    </div>
  );
};
