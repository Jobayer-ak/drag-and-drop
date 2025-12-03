'use client';

import { useSortable } from '@dnd-kit/sortable';
import { DroppedQuestion } from '../../types/types';

import { CSS } from '@dnd-kit/utilities';
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

  // Correct required transform handling
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform), // REQUIRED 🔥
    transition,
    width: '100%',
    minHeight: '60px',
    zIndex: isDragging ? 999 : undefined,
    boxShadow: isDragging ? '0 4px 12px rgba(0,0,0,0.15)' : undefined,
    background: isDragging ? '#f9fafb' : undefined,
    borderRadius: '0.5rem',
  };

  const dragHandleProps = { ...listeners, ...attributes };

  const renderQuestion = () => {
    switch (item.type) {
      case 'MultipleChoice':
        return (
          <MultipleChoice uid={item.uid} dragHandleProps={dragHandleProps} />
        );

      case 'MultipleSelect':
        return (
          <MultipleSelect uid={item.uid} dragHandleProps={dragHandleProps} />
        );

      case 'TrueFalse':
        return <TrueFalse uid={item.uid} dragHandleProps={dragHandleProps} />;

      case 'Numeric':
        return (
          <NumericEntry uid={item.uid} dragHandleProps={dragHandleProps} />
        );

      case 'Ordering':
        return (
          <OrderingQuestion uid={item.uid} dragHandleProps={dragHandleProps} />
        );

      default:
        return null;
    }
  };

  return (
    <div ref={setNodeRef} style={style}>
      {renderQuestion()}
    </div>
  );
};

export default SortableItem;
