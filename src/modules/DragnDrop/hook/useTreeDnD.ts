'use client';
import { useCallback, useEffect } from 'react';
import { useDnDHelpers } from './helpers';
import { moveNode } from '@/lib/dndMoveOverview';
import { UnitNode } from '@/types/units';

export type DropPos = 'above' | 'below' | 'inside' | null;

export function useTreeDnD(
  rootTree: UnitNode,
  setRootTree: (t: UnitNode) => void,
) {
  // this will update the overview state
  // This callback will trigger if drag and drop will be successfull
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
  }, [draggingId, dropTargetId, dropPos, rootTree, setRootTree, onMove, onUp]);

  return {
    draggingId,
    dropTargetId,
    dropPos,
    onDragStart,
  };
}
