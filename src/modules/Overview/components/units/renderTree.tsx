// renderTree.tsx
import { TreeNode as OrgNode } from "react-organizational-chart";
import { UnitCard } from "./UnitCard";
import { UnitNode } from "@/types/units";

export interface RenderNodeProps {
  draggingId?: string | null;
  dropTargetId?: string | null;
  dropPos?: "above" | "below" | "inside" | null;
  onDragStart?: (e: React.MouseEvent, el: HTMLElement, id: string) => void;
}

// Перевірка, чи це "листова" особа
const isLeafPerson = (node: UnitNode) =>
  "rank" in node && (!node.subUnits || node.subUnits.length === 0);

// LeafList приймає dragProps і кожного члена draggable
const LeafList = ({ people }: { people: UnitNode[] }) => (
  <div className="leaf-list">
    {people.map((p) => (
      <div key={p.id} className="leaf-item">
        <UnitCard node={p} css={"flex flex-col items-start"} />
      </div>
    ))}
  </div>
);

export const renderNode = (node: UnitNode): React.ReactElement => {
  const children = node.subUnits || [];

  const leafPeople = children.filter(isLeafPerson);
  const branchNodes = children.filter((c) => !isLeafPerson(c));

  return (
    <OrgNode key={node.id} label={<UnitCard node={node} />}>
      {/* Гілки */}
      {branchNodes.map((child) => renderNode(child))}

      {/* Листи одним блоком */}
      {leafPeople.length > 0 && (
        <OrgNode
          key={`leaf-${node.id}`} // унікальний key для листа
          label={<LeafList people={leafPeople as unknown as UnitNode[]} />}
        />
      )}
    </OrgNode>
  );
};
