'use client';

import { DndContext, DragEndEvent, useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import React, { useEffect, useState } from 'react';
import { DroppedQuestion, QuestionType } from '../../types/types';
import { SortableItem } from './Sortabletem';

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

  useEffect(() => {
    setMounted(true); // prevent SSR hydration issues
  }, []);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const data = active.data.current as
      | { uid: string; type: QuestionType }
      | undefined;
    if (!data) return;

    const { uid, type } = data;

    setDropped((prev) => {
      const existingIndex = prev.findIndex((item) => item.type === type);

      // Duplicate prevention
      if (existingIndex !== -1) {
        // Reorder if dragging inside drop zone
        const oldIndex = prev.findIndex((item) => item.uid === active.id);
        const newIndex = prev.findIndex((item) => item.uid === over.id);

        if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
          return arrayMove(prev, oldIndex, newIndex);
        }

        return prev; // duplicate ignored
      }

      // Add new item
      return [...prev, { uid, type }];
    });
  };

  if (!mounted) return null;

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div
        ref={setNodeRef}
        className="border border-gray-200 rounded-lg p-8 min-h-screen bg-white shadow-lg flex flex-col"
      >
        <div
          className={`flex flex-col gap-4 flex-1 rounded-lg transition-all duration-200  ${
            isOver ? 'border border-blue-500 bg-blue-100' : ''
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
