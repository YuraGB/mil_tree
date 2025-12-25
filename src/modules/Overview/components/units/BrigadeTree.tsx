// BrigadeTree.tsx
'use client';
import React, { useState } from 'react';
import { Tree } from 'react-organizational-chart';
import { renderNode } from './renderTree';
import { IBrigadeTree, TreeNode } from '@/types';
import { useTreeDnD } from '@/modules/DragnDrop/hook/useTreeDnD';
import { Search } from '@/modules/Search';

type Props = {
  data: IBrigadeTree;
};

export const BrigadeTree: React.FC<Props> = ({ data }) => {
  const [tree, setTree] = useState<TreeNode>(data.commander);

  const { draggingId, dropTargetId, dropPos, onDragStart } = useTreeDnD(
    tree,
    setTree,
  );

  return (
    <>
      <Search data={tree} />
      <Tree
        lineWidth={'2px'}
        lineColor={'#bbb'}
        lineBorderRadius={'10px'}
        label={
          <div className="card root" data-node-id={data.commander.id}>
            <strong>{data.unitName}</strong>
            <div>Бригада</div>
          </div>
        }
      >
        {renderNode(tree, { draggingId, dropTargetId, dropPos, onDragStart })}
      </Tree>
    </>
  );
};

export default BrigadeTree;
