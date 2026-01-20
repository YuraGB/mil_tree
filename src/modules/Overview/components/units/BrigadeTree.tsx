// BrigadeTree.tsx
'use client';
import React, { useState } from 'react';
import { Tree } from 'react-organizational-chart';
import { renderNode } from './renderTree';
import { useTreeDnD } from '@/modules/DragnDrop/hook/useTreeDnD';
import { Search } from '@/modules/Search';
import { UnitNode } from '@/types/units';

type Props = {
  data: UnitNode;
};

export const BrigadeTree: React.FC<Props> = ({ data }) => {
  const [tree, setTree] = useState<UnitNode>(data);

  const { onDragStart } = useTreeDnD(tree, setTree);

  return (
    <article
      role="presentation"
      className="brigade-tree-container scrollbar overflow-auto"
      onMouseDown={onDragStart}
    >
      <Search data={tree} />
      <Tree
        lineWidth={'2px'}
        lineColor={'#bbb'}
        lineBorderRadius={'10px'}
        label={
          <div className="card root" data-node-id={data.commander?.id}>
            <strong>{data.name}</strong>
            <div>Бригада</div>
          </div>
        }
      >
        {renderNode(tree)}
      </Tree>
    </article>
  );
};

export default BrigadeTree;
