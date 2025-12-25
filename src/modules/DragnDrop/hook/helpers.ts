import { useRef, useState } from 'react';
import { DropPos } from './useTreeDnD';

// The Global helper hook for Drag and Drop functionality
export const useDnDHelpers = (
  callBack: (
    draggingId: string,
    dropTargetId: string,
    dropPos: Exclude<DropPos, null>,
  ) => void,
) => {
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dropTargetId, setDropTargetId] = useState<string | null>(null);
  const [dropPos, setDropPos] = useState<DropPos>(null);
  const cloneRef = useRef<{
    nodeEl: HTMLElement;
    offsetX: number;
    offsetY: number;
  } | null>(null);

  function onMove(ev: MouseEvent) {
    if (!cloneRef.current) return;
    const { nodeEl, offsetX, offsetY } = cloneRef.current;
    nodeEl.style.left = `${ev.clientX - offsetX}px`;
    nodeEl.style.top = `${ev.clientY - offsetY}px`;

    const el = document.elementFromPoint(
      ev.clientX,
      ev.clientY,
    ) as HTMLElement | null;
    if (!el) {
      setDropTargetId(null);
      setDropPos(null);
      return;
    }

    const item = el.closest('[data-node-id]') as HTMLElement | null;
    if (!item) {
      setDropTargetId(null);
      setDropPos(null);
      return;
    }

    const id = item.dataset.nodeId!;
    if (id === draggingId) {
      setDropTargetId(null);
      setDropPos(null);
      return;
    }

    const r = item.getBoundingClientRect();
    const y = ev.clientY - r.top;
    const h = r.height;
    if (y < h * 0.25) setDropPos('above');
    else if (y > h * 0.75) setDropPos('below');
    else setDropPos('inside');
    setDropTargetId(id);
  }

  function onUp() {
    if (cloneRef.current) {
      cloneRef.current.nodeEl.remove();
      cloneRef.current = null;
    }

    if (draggingId && dropTargetId && dropPos) {
      // update the state
      callBack(draggingId, dropTargetId, dropPos);
    }

    setDraggingId(null);
    setDropTargetId(null);
    setDropPos(null);
  }

  function onDragStart(e: React.MouseEvent, nodeEl: HTMLElement, id: string) {
    e.preventDefault();
    const rect = nodeEl.getBoundingClientRect();
    const clone = nodeEl.cloneNode(true) as HTMLElement;
    clone.style.position = 'fixed';
    clone.style.left = `${rect.left}px`;
    clone.style.top = `${rect.top}px`;
    clone.style.width = `${rect.width}px`;
    clone.style.pointerEvents = 'none';
    clone.style.opacity = '0.85';
    clone.style.zIndex = '9999';
    document.body.appendChild(clone);

    cloneRef.current = {
      nodeEl: clone,
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
    };
    setDraggingId(id);
  }

  return {
    onMove,
    onUp,
    onDragStart,
    draggingId,
    dropTargetId,
    dropPos,
  };
};
