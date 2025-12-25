// renderTree.tsx
import { TreeNode as OrgNode } from 'react-organizational-chart';
import { UnitCard } from './UnitCard';
import { TreeNode } from '@/types';

export interface RenderNodeProps {
  draggingId?: string | null;
  dropTargetId?: string | null;
  dropPos?: 'above' | 'below' | 'inside' | null;
  onDragStart?: (e: React.MouseEvent, el: HTMLElement, id: string) => void;
}

// Перевірка, чи це "листова" особа
const isLeafPerson = (node: TreeNode) =>
  'rank' in node && (!node.subordinates || node.subordinates.length === 0);

// LeafList приймає dragProps і кожного члена draggable
const LeafList = ({
  people,
  dragProps,
}: {
  people: TreeNode[];
  dragProps?: RenderNodeProps;
}) => (
  <div className="leaf-list">
    {people.map((p) => (
      <div key={p.id} className="leaf-item">
        <UnitCard
          node={p}
          dragProps={dragProps}
          css={'flex flex-col items-start'}
        />
      </div>
    ))}
  </div>
);

export const renderNode = (
  node: TreeNode,
  dndProps: RenderNodeProps = {},
): React.ReactElement => {
  const children = node.subordinates || [];

  const leafPeople = children.filter(isLeafPerson);
  const branchNodes = children.filter((c) => !isLeafPerson(c));

  return (
    <OrgNode
      key={node.id}
      label={<UnitCard node={node} dragProps={dndProps} />}
    >
      {/* Гілки */}
      {branchNodes.map((child) => renderNode(child, dndProps))}

      {/* Листи одним блоком */}
      {leafPeople.length > 0 && (
        <OrgNode
          key={`leaf-${node.id}`} // унікальний key для листа
          label={<LeafList people={leafPeople} dragProps={dndProps} />}
        />
      )}
    </OrgNode>
  );
};
