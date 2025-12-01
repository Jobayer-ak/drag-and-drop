'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React from 'react';
import { DroppedQuestion } from '../../types/types';
import MultipleChoice from '../question_comp/multiple_choice/MultipleChoice';
import { MultipleSelect } from '../question_comp/multiple_select/MultipleSelect';
import NumericEntry from '../question_comp/numeric_entry/NumericEntry';
import OrderingQuestion from '../question_comp/ordering_question/OrderingQuestion';
import TrueFalse from '../question_comp/true_false/TrueFalse';

interface SortableItemProps {
  item: DroppedQuestion;
}

const SortableItem: React.FC<SortableItemProps> = ({ item }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: item.uid,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const renderQuestion = () => {
    switch (item.type) {
      case 'MultipleChoice':
        return <MultipleChoice />;
      case 'MultipleSelect':
        return <MultipleSelect />;
      case 'TrueFalse':
        return <TrueFalse />;
      case 'Numeric':
        return <NumericEntry />;
      case 'Ordering':
        return <OrderingQuestion />;
      default:
        return null;
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="mb-4 touch-none"
    >
      {renderQuestion()}
    </div>
  );
};

export default SortableItem;
