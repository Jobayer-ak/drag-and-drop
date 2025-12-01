/* eslint-disable @typescript-eslint/no-explicit-any */
// components/drag/DraggableQItem.tsx
'use client';

import { useDraggable } from '@dnd-kit/core';
import React from 'react';
import { QItem } from '../QItem';

interface DraggableQItemProps {
  id: string; // the drag id (will be used to decide which question to create)
  leftIcon: any;
  heading: string;
  description: string;
  className?: string;
}

export default function DraggableQItem({
  id,
  leftIcon,
  heading,
  description,
  className,
}: DraggableQItemProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
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
      className="touch-none "
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
