/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useDraggable } from '@dnd-kit/core';
import React from 'react';
import { QuestionType } from '../../types/types';
import { QItem } from '../QItem';

interface DraggableQItemProps {
  id: string; // stable id for uniqueness
  type: QuestionType;
  leftIcon: any;
  heading: string;
  description: string;
  className?: string;
}

export default function DraggableQItem({
  id,
  type,
  leftIcon,
  heading,
  description,
  className,
}: DraggableQItemProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id, // stable id
      data: { uid: id, type }, // important for MainContainer
    });

  const style: React.CSSProperties | undefined = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
        touchAction: 'none',
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        ...style,
        opacity: isDragging ? 0.6 : 1,
      }}
      className="touch-none"
    >
      <QItem
        leftIcon={leftIcon}
        heading={heading}
        description={description}
        className={className}
      />
    </div>
  );
}
