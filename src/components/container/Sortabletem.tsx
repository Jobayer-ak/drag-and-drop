'use client';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DroppedQuestion } from '../../types/types';
import MultipleChoice from '../question_comp/multiple_choice/MultipleChoice';
import { MultipleSelect } from '../question_comp/multiple_select/MultipleSelect';
import NumericEntry from '../question_comp/numeric_entry/NumericEntry';
import OrderingQuestion from '../question_comp/ordering_question/OrderingQuestion';
import TrueFalse from '../question_comp/true_false/TrueFalse';

export const SortableItem: React.FC<{ item: DroppedQuestion }> = ({ item }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.uid });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const renderQuestion = () => {
    switch (item.type) {
      case 'MultipleChoice':
        return <MultipleChoice uid={item.uid} />;
      case 'MultipleSelect':
        return <MultipleSelect uid={item.uid} />; // pass uid
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
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="mb-4"
      // Allow clicks inside interactive elements
      onPointerDown={(e) => {
        const target = e.target as HTMLElement;
        if (
          ['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON', 'LABEL'].includes(
            target.tagName
          )
        ) {
          e.stopPropagation();
        }
      }}
    >
      {renderQuestion()}
    </div>
  );
};
