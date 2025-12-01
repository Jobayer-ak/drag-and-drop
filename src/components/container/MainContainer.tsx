'use client';

import { DndContext, DragEndEvent, useDroppable } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React from 'react';

import MultipleChoice from '../question_comp/multiple_choice/MultipleChoice';
import { MultipleSelect } from '../question_comp/multiple_select/MultipleSelect';
import NumericEntry from '../question_comp/numeric_entry/NumericEntry';
import OrderingQuestion from '../question_comp/ordering_question/OrderingQuestion';
import TrueFalse from '../question_comp/true_false/TrueFalse';

export type QuestionType =
  | 'MultipleChoice'
  | 'MultipleSelect'
  | 'TrueFalse'
  | 'Numeric'
  | 'Ordering';

export interface DroppedQuestion {
  uid: string;
  type: QuestionType;
}

interface MainContainerProps {
  dropped: DroppedQuestion[];
  setDropped: React.Dispatch<React.SetStateAction<DroppedQuestion[]>>;
}

const SortableItem: React.FC<{ item: DroppedQuestion }> = ({ item }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.uid });

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
      className="mb-4"
    >
      {renderQuestion()}
    </div>
  );
};

const MainContainer: React.FC<MainContainerProps> = ({
  dropped,
  setDropped,
}) => {
  const { setNodeRef, isOver } = useDroppable({ id: 'MAIN_DROP_AREA' });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = dropped.findIndex((item) => item.uid === active.id);
      const newIndex = dropped.findIndex((item) => item.uid === over.id);
      setDropped(arrayMove(dropped, oldIndex, newIndex));
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div
        ref={setNodeRef}
        id="main_container"
        className="border border-gray-200 rounded-lg p-8 min-h-screen bg-white shadow-lg flex flex-col"
      >
        {/* Inner drop area */}
        <div
          className={`flex flex-col gap-4 flex-1 rounded-lg transition-all duration-200 ${
            isOver && dropped.length > 0
              ? 'border-2 border-blue-500 bg-blue-100'
              : ''
          }`}
        >
          {dropped.length === 0 ? (
            <p
              className={`text-gray-400 text-center py-20  ${
                isOver ? 'border-yellow-500 bg-blue-100' : ''
              }`}
            >
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
