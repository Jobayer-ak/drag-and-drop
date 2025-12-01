/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useSortable } from '@dnd-kit/sortable';
import { DroppedQuestion } from '../../types/types';

import React from 'react';
import MultipleChoice from '../question_comp/multiple_choice/MultipleChoice';
import { MultipleSelect } from '../question_comp/multiple_select/MultipleSelect';
import NumericEntry from '../question_comp/numeric_entry/NumericEntry';
import OrderingQuestion from '../question_comp/ordering_question/OrderingQuestion';
import TrueFalse from '../question_comp/true_false/TrueFalse';

interface SortableItemProps {
  item: DroppedQuestion;
}

const SortableItem: React.FC<SortableItemProps> = ({ item }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.uid });

  // Keep width and minHeight so card doesn't shrink
  const style: React.CSSProperties = {
    transform: transform ? `translateY(${transform.y}px)` : undefined,
    transition,
    width: '100%',
    minHeight: '60px',
    zIndex: isDragging ? 999 : undefined,
    backgroundColor: 'white',
    boxShadow: isDragging ? '0 4px 12px rgba(0,0,0,0.15)' : undefined,
  };

  const renderQuestion = () => {
    switch (item.type) {
      case 'MultipleChoice':
        return <MultipleChoice uid={item.uid} />;
      case 'MultipleSelect':
        return <MultipleSelect uid={item.uid} />;
      case 'TrueFalse':
        return <TrueFalse uid={item.uid} />;
      case 'Numeric':
        return <NumericEntry uid={item.uid} />;
      case 'Ordering':
        return <OrderingQuestion uid={item.uid} />;
      default:
        return null;
    }
  };

  return (
    <div ref={setNodeRef} style={style} className="mb-4 select-none">
      {/* Wrap the question content in a div */}
      <div>
        {/** Pass listeners ONLY to the drag handle icon **/}
        {renderQuestion() &&
          React.cloneElement(renderQuestion() as any, {
            dragHandleProps: { ...listeners, ...attributes },
          })}
      </div>
    </div>
  );
};

export default SortableItem;
