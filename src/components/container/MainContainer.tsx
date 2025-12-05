/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */

'use client';

import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useEffect, useRef, useState } from 'react';
import { DroppedQuestion } from '../../types/types';
import SortableItem from './Sortabletem';

interface MainContainerProps {
  droppedItems: DroppedQuestion[];
  setDroppedItems: React.Dispatch<React.SetStateAction<DroppedQuestion[]>>;
  activeItem: string | null;
  lastDroppedUid: string | null;
  selectedQuestionUid: string | null;
  setSelectedQuestionUid: React.Dispatch<React.SetStateAction<string | null>>;
}

// DropZone component (only for NEW items from sidebar)
const DropZone = ({
  index,
  totalItems,
  activeNewItem,
}: {
  index: number;
  totalItems: number;
  activeNewItem: boolean;
}) => {
  if (totalItems < 1 || index === totalItems) return null;

  const { isOver, setNodeRef } = useDroppable({
    id: `DROP_ZONE_${index}`,
  });

  return (
    <div
      ref={setNodeRef}
      className={`${
        isOver && activeNewItem
          ? 'h-8 w-full my-2 transition-all bg-blue-300 rounded-md border border-blue-400'
          : 'bg-transparent'
      }`}
    />
  );
};

export const MainContainer: React.FC<MainContainerProps> = ({
  droppedItems,
  setDroppedItems,
  activeItem,
  lastDroppedUid,
  selectedQuestionUid,
  setSelectedQuestionUid,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [usedHeight, setUsedHeight] = useState(0);

  const { setNodeRef: setMainRef, isOver: isOverMain } = useDroppable({
    id: 'MAIN_CONTAINER',
  });

  // Only true when dragging a new item from left panel
  const isDraggingNewItem =
    activeItem != null && !droppedItems.some((i) => i.uid === activeItem);

  // Calculate total height of dropped items only for new items
  useEffect(() => {
    if (!isDraggingNewItem) return;

    const updateHeight = () => {
      const occupied = itemRefs.current.reduce((sum, el) => {
        if (!el) return sum;
        return sum + el.offsetHeight + 20; // 20 = gap between items
      }, 20); // initial offset
      setUsedHeight(occupied);
    };

    updateHeight();

    // Optional: track dynamic height changes
    const observers = itemRefs.current.map((el) => {
      if (!el) return null;
      const ro = new ResizeObserver(updateHeight);
      ro.observe(el);
      return ro;
    });

    return () => {
      observers.forEach((ro) => ro?.disconnect());
    };
  }, [droppedItems, isDraggingNewItem]);

  return (
    <div
      ref={(el) => {
        setMainRef(el);
        containerRef.current = el;
      }}
      id="MAIN_CONTAINER"
      className="relative border border-gray-300 rounded-lg px-9 pb-9 pt-9 min-h-screen bg-white shadow-lg"
    >
      {/* Full highlight when empty */}
      {droppedItems.length === 0 && isOverMain && isDraggingNewItem && (
        <div className="absolute left-9 right-9 top-10 bottom-4 inset-0 bg-blue-200 border border-gray-400/60 pointer-events-none rounded-md z-0 transition-all" />
      )}

      {/* Highlight remaining empty space behind last item */}
      {droppedItems.length > 0 && isOverMain && isDraggingNewItem && (
        <div
          className="absolute left-9 right-9 top-10 bg-blue-200 border border-gray-400/60 pointer-events-none rounded-md z-0 transition-all"
          style={{ top: usedHeight, bottom: 0 }}
        />
      )}

      {/* EMPTY MESSAGE */}
      {droppedItems.length === 0 && !isOverMain && (
        <p className="text-gray-400 text-center mt-8">Drag questions here</p>
      )}

      <SortableContext
        items={droppedItems.map((i) => i.uid)}
        strategy={verticalListSortingStrategy}
        // THIS WORKS 100% — modifiers apply ONLY to this sortable list
      >
        <div
          className={` z-10 flex flex-col  ${
            activeItem && isDraggingNewItem ? 'gap-0' : 'gap-5'
          }`}
          style={{
            touchAction: 'pan-y', // Mobile: only allow vertical scrolling
            overflowX: 'hidden', // Prevent horizontal overflow
          }}
        >
          {droppedItems.map((item: DroppedQuestion, index: number) => (
            <div
              key={item.uid}
              className="question-block relative"
              ref={(el) => (itemRefs.current[index] = el)}
            >
              {/* DropZones only for new item dragging */}
              {isDraggingNewItem && index === 0 && (
                <DropZone
                  index={0}
                  totalItems={droppedItems.length}
                  activeNewItem={isDraggingNewItem}
                />
              )}

              {isDraggingNewItem &&
                droppedItems.length >= 2 &&
                index > 0 &&
                index < droppedItems.length && (
                  <DropZone
                    index={index}
                    totalItems={droppedItems.length}
                    activeNewItem={isDraggingNewItem}
                  />
                )}

              <SortableItem
                key={item.uid}
                item={item}
                lastDropped={lastDroppedUid === item.uid}
                onDragStateChange={(uid, dragging) => {
                  // console.log('Sorting drag state:', uid, dragging);
                }}
                onDelete={(uid) => {
                  setDroppedItems((prev) => prev.filter((i) => i.uid !== uid));
                }}
                onEdit={(uid) => setSelectedQuestionUid(uid)}
                isSelected={selectedQuestionUid ? true : false}
              />
            </div>
          ))}
        </div>
      </SortableContext>
    </div>
  );
};
