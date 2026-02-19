import { useCallback, useState } from "react";

export interface DragState {
  startIndex: number | null;
  currentIndex: number | null;
  isDragging: boolean;
}

export function useDrag() {
  const [dragState, setDragState] = useState<DragState>({
    startIndex: null,
    currentIndex: null,
    isDragging: false,
  });

  const startDrag = useCallback((index: number) => {
    setDragState({ startIndex: index, currentIndex: index, isDragging: true });
  }, []);

  const updateDrag = useCallback((index: number) => {
    setDragState((prev) => ({ ...prev, currentIndex: index }));
  }, []);

  const endDrag = useCallback(() => {
    setDragState({ startIndex: null, currentIndex: null, isDragging: false });
  }, []);

  const resetDrag = useCallback(() => {
    setDragState({ startIndex: null, currentIndex: null, isDragging: false });
  }, []);

  return {
    dragState,
    startDrag,
    updateDrag,
    endDrag,
    resetDrag,
    setDragState,
  };
}
