import { useEffect, useMemo, useState } from "react";

export function useDragSlots(
  selectedSlotIndexes: number[],
  onSlotSelect: (indexes: number[]) => void,
) {
  const [dragState, setDragState] = useState({
    startIndex: null as number | null,
    currentIndex: null as number | null,
    isDragging: false,
  });

  const dragPreviewIndexes = useMemo(() => {
    const { startIndex, currentIndex } = dragState;

    if (startIndex === null || currentIndex === null) {
      return [];
    }

    const start = Math.min(startIndex, currentIndex);
    const end = Math.max(startIndex, currentIndex);
    let preview: number[] = [];

    for (let index = start; index <= end; index += 1) {
      preview.push(index);
    }

    if (preview.length > 4) {
      if (currentIndex >= startIndex) {
        preview = preview.slice(0, 4);
      } else {
        preview = preview.slice(-4);
      }
    }

    return preview;
  }, [dragState]);

  useEffect(() => {
    if (!dragState.isDragging) return;

    const handlePointerUp = () => {
      const { startIndex, currentIndex } = dragState;

      if (startIndex === null || currentIndex === null) {
        setDragState({
          startIndex: null,
          currentIndex: null,
          isDragging: false,
        });

        return;
      }

      const start = Math.min(startIndex, currentIndex);
      const end = Math.max(startIndex, currentIndex);
      let preview: number[] = [];

      for (let index = start; index <= end; index += 1) {
        preview.push(index);
      }

      if (preview.length > 4) {
        if (currentIndex >= startIndex) {
          preview = preview.slice(0, 4);
        } else {
          preview = preview.slice(-4);
        }
      }

      onSlotSelect(preview);
      setDragState({ startIndex: null, currentIndex: null, isDragging: false });
    };

    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [dragState.isDragging, dragState, onSlotSelect]);

  const handlePointerDown = (index: number) => {
    if (selectedSlotIndexes.includes(index)) {
      onSlotSelect([]);
      setDragState({ startIndex: null, currentIndex: null, isDragging: false });

      return;
    }

    setDragState({ startIndex: index, currentIndex: index, isDragging: true });
  };

  const handlePointerEnter = (index: number) => {
    if (!dragState.isDragging) return;
    setDragState((prev) => ({ ...prev, currentIndex: index }));
  };

  return {
    dragState,
    dragPreviewIndexes,
    handlePointerDown,
    handlePointerEnter,
  };
}
