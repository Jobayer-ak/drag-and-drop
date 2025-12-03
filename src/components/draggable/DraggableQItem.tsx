/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useDraggable } from '@dnd-kit/core';
import { QuestionType } from '../../types/types';
import { QItem } from '../QItem';

interface DraggableQItemProps {
  id: string; // stable id for uniqueness
  activeId: string | null;
  type: QuestionType;
  leftIcon: any;
  heading: string;
  description: string;
  isClone?: boolean;
}

export default function DraggableQItem({
  id,
  activeId,
  type,
  leftIcon,
  heading,
  description,
  isClone,
}: DraggableQItemProps) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id, // stable id
    data: { uid: id, type },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        opacity: activeId === id ? 0.5 : 1, // fade slightly if dragging
        transition: 'opacity 0.2s',
      }}
      className="touch-none"
      aria-hidden={isClone ? undefined : false} // sidebar stays visible
    >
      <QItem leftIcon={leftIcon} heading={heading} description={description} />
    </div>
  );
}
