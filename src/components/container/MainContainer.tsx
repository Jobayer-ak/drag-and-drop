'use client';

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  MeasuringStrategy,
  useDroppable,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import React, { useEffect, useState } from 'react';
import { DroppedQuestion, QuestionType } from '../../types/types';
import SortableItem from './Sortabletem';

interface MainContainerProps {
  dropped: DroppedQuestion[];
  setDropped: React.Dispatch<React.SetStateAction<DroppedQuestion[]>>;
}

const MainContainer: React.FC<MainContainerProps> = ({
  dropped,
  setDropped,
}) => {
  const { setNodeRef, isOver } = useDroppable({ id: 'MAIN_DROP_AREA' });
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // While dragging over, we can dynamically insert new items at the position
  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    // Only handle items dragged from outside (left panel)
    if (!dropped.find((d) => d.uid === active.id)) {
      const type = active.id as QuestionType;
      const uid = `${type}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

      // Insert at index where we hover
      const overIndex = dropped.findIndex((d) => d.uid === over.id);
      if (overIndex === -1) {
        setDropped((prev) => [...prev, { uid, type }]);
      } else {
        setDropped((prev) => [
          ...prev.slice(0, overIndex),
          { uid, type },
          ...prev.slice(overIndex),
        ]);
      }
    }
  };

  console.log('is over: ', isOver);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const oldIndex = dropped.findIndex((d) => d.uid === active.id);
    const newIndex = dropped.findIndex((d) => d.uid === over.id);

    // Reorder if dragging inside drop zone
    if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
      setDropped((prev) => arrayMove(prev, oldIndex, newIndex));
    }
  };

  if (!mounted) return null;

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      measuring={{ droppable: { strategy: 1 as MeasuringStrategy } }}
    >
      <div
        ref={setNodeRef}
        className={`border border-gray-200 rounded-lg p-8 min-h-screen bg-white shadow-lg flex flex-col gap-4 `}
      >
        <div
          className={`flex flex-col gap-4 min-h-screen p-4 ${
            isOver ? 'border border-blue-500 rounded-md bg-blue-100' : ''
          }`}
        >
          {dropped.length === 0 ? (
            <p className="text-gray-400 text-center py-20">
              Drop questions here
            </p>
          ) : (
            <SortableContext
              items={dropped.map((d) => d.uid)}
              strategy={verticalListSortingStrategy}
            >
              {dropped.map((item) => (
                <SortableItem key={item.uid} item={item} />
              ))}
            </SortableContext>
          )}
        </div>
      </div>
    </DndContext>
  );
};

export default MainContainer;
