'use client';

import { useSortable } from '@dnd-kit/sortable';
import { useEffect, useRef } from 'react';
import { DroppedQuestion } from '../../types/types';

import { CSS } from '@dnd-kit/utilities';
import MultipleChoice from '../question_comp/multiple_choice/MultipleChoice';
import { MultipleSelect } from '../question_comp/multiple_select/MultipleSelect';
import NumericEntry from '../question_comp/numeric_entry/NumericEntry';
import OrderingQuestion from '../question_comp/ordering_question/OrderingQuestion';
import TrueFalse from '../question_comp/true_false/TrueFalse';

interface SortableItemProps {
  item: DroppedQuestion;
  lastDropped: boolean;
  onDragStateChange?: (uid: string, dragging: boolean) => void;
  onDelete: (uid: string) => void; //
}

const SortableItem: React.FC<SortableItemProps> = ({
  item,
  lastDropped,
  onDragStateChange,
  onDelete,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item.uid,
    // Restrict to vertical movement only
    data: {
      type: 'sortable-item',
    },
  });

  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // Notify parent about drag state
  useEffect(() => {
    onDragStateChange?.(item.uid, isDragging);
  }, [isDragging, item.uid, onDragStateChange]);

  // Fix height collapsing during drag
  // useEffect(() => {
  //   if (!wrapperRef.current) return;
  //   if (isDragging) {
  //     const height = wrapperRef.current.getBoundingClientRect().height;
  //     wrapperRef.current.style.height = `${height}px`;
  //   } else {
  //     wrapperRef.current.style.height = 'auto';
  //   }
  // }, [isDragging]);

  // Apply ONLY Y-axis transform, completely ignore X-axis
  // const style: CSSProperties = {
  //   transform: transform
  //     ? CSS.Transform.toString({
  //         x: 0, // Force X to 0 - NO horizontal movement
  //         y: transform.y,
  //         scaleX: 1,
  //         scaleY: 1,
  //       })
  //     : undefined,
  //   transition,
  //   zIndex: isDragging ? 100 : 1,
  //   width: '100%',
  //   opacity: isDragging ? 0.9 : 1,
  //   pointerEvents: isDragging ? 'none' : 'auto',
  //   // Prevent horizontal offset during drag
  //   left: 0,
  //   right: 0,
  // };

  const style = {
    transform: CSS.Transform.toString(transform), // ← This respects modifiers!
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 999 : 1,
  };

  const dragHandleProps = { ...listeners, ...attributes };

  const renderQuestion = () => {
    switch (item.type) {
      case 'MultipleChoice':
        return (
          <MultipleChoice
            onDelete={onDelete}
            uid={item.uid}
            dragHandleProps={dragHandleProps}
          />
        );
      case 'MultipleSelect':
        return (
          <MultipleSelect
            onDelete={onDelete}
            uid={item.uid}
            dragHandleProps={dragHandleProps}
          />
        );
      case 'TrueFalse':
        return (
          <TrueFalse
            onDelete={onDelete}
            uid={item.uid}
            dragHandleProps={dragHandleProps}
          />
        );
      case 'Numeric':
        return (
          <NumericEntry
            onDelete={onDelete}
            uid={item.uid}
            dragHandleProps={dragHandleProps}
          />
        );
      case 'Ordering':
        return (
          <OrderingQuestion
            onDelete={onDelete}
            uid={item.uid}
            dragHandleProps={dragHandleProps}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div ref={setNodeRef} className="w-full relative" style={style}>
      <div {...attributes} {...listeners}>
        {renderQuestion()}
      </div>
    </div>
  );
};

export default SortableItem;
