import { useRef } from "react";
import { DropPos } from "./useTreeDnD";

// The Global helper hook for Drag and Drop functionality
export const useDnDHelpers = (
  callBack: (
    draggingId: string,
    dropTargetId: string,
    dropPos: Exclude<DropPos, null>,
  ) => void,
) => {
  const draggingId = useRef<string | null>(null);
  const dropTargetId = useRef<string | null>(null);
  const dropPos = useRef<DropPos>(null);
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
      dropTargetId.current = null;
      dropPos.current = null;
      return;
    }

    const item = el.closest("[data-node-id]") as HTMLElement | null;
    if (!item) {
      dropTargetId.current = null;
      dropPos.current = null;
      return;
    }

    const id = item.dataset.nodeId!;
    if (id === draggingId.current) {
      dropTargetId.current = null;
      dropPos.current = null;
      return;
    }

    const r = item.getBoundingClientRect();
    const y = ev.clientY - r.top;
    const h = r.height;
    if (y < h * 0.25) dropPos.current = "above";
    else if (y > h * 0.75) dropPos.current = "below";
    else dropPos.current = "inside";
    dropTargetId.current = id;
  }

  function onUp() {
    if (cloneRef.current) {
      cloneRef.current.nodeEl.remove();
      cloneRef.current = null;
    }

    if (draggingId.current && dropTargetId.current && dropPos.current) {
      // update the state
      callBack(draggingId.current, dropTargetId.current, dropPos.current);
    }

    draggingId.current = null;
    dropTargetId.current = null;
    dropPos.current = null;
  }

  // Start the drag process
  // Delegate the event from parent to child
  function onDragStart(e: React.MouseEvent) {
    e.preventDefault();
    const nodeEl = (e.target as HTMLElement)?.closest(
      "[data-node-id]",
    ) as HTMLElement | null;
    if (!nodeEl) return;
    const id = nodeEl.dataset.nodeId!;
    if (!id) return;

    const rect = nodeEl.getBoundingClientRect();
    const clone = nodeEl.cloneNode(true) as HTMLElement;
    clone.style.position = "fixed";
    clone.style.left = `${rect.left}px`;
    clone.style.top = `${rect.top}px`;
    clone.style.width = `${rect.width}px`;
    clone.style.pointerEvents = "none";
    clone.style.opacity = "0.85";
    clone.style.zIndex = "9999";
    document.body.appendChild(clone);

    cloneRef.current = {
      nodeEl: clone,
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
    };
    draggingId.current = id;
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
