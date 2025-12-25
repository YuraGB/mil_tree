'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ICommandPerson, IUnitNode } from '@/types';
import { useDnDHelpers } from './helpers';
import { moveNode } from '@/lib/dndMoveOverview';

export type TreeNode = ICommandPerson | IUnitNode;
export type DropPos = 'above' | 'below' | 'inside' | null;

export function useTreeDnD(
  rootTree: TreeNode,
  setRootTree: (t: TreeNode) => void,
) {
  const onUpdateStateCallback = useCallback(
    (
      draggingId: string,
      dropTargetId: string,
      dropPos: Exclude<DropPos, null>,
    ) => {
      const newTree = moveNode(rootTree, draggingId, dropTargetId, dropPos);
      if (newTree) setRootTree(newTree);
    },
    [setRootTree, rootTree],
  );

  const { onMove, onUp, onDragStart, draggingId, dropPos, dropTargetId } =
    useDnDHelpers(onUpdateStateCallback);

  useEffect(() => {
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
  }, [draggingId, dropTargetId, dropPos, rootTree, setRootTree]);

  return {
    draggingId,
    dropTargetId,
    dropPos,
    onDragStart,
  };
}
