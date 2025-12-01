'use client';

import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import React, { useEffect, useState } from 'react';
import { DroppedQuestion } from '../../types/types';
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

  if (!mounted) return null;

  return (
    <div
      ref={setNodeRef}
      className="border border-gray-200 rounded-lg p-8 min-h-screen bg-white shadow-lg flex flex-col"
    >
      <div
        className={`flex flex-col gap-4 flex-1 rounded-lg transition-all duration-200 ${
          isOver ? 'border border-blue-500 bg-blue-100' : ''
        }`}
      >
        {dropped.length === 0 ? (
          <p className="text-gray-400 text-center py-20">Drop questions here</p>
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
  );
};

export default MainContainer;
