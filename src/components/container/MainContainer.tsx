/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useDroppable } from '@dnd-kit/core';
import { useEffect, useRef, useState } from 'react';
import { DroppedQuestion } from '../../types/types';
import MultipleChoice from '../question_comp/multiple_choice/MultipleChoice';
import { MultipleSelect } from '../question_comp/multiple_select/MultipleSelect';
import NumericEntry from '../question_comp/numeric_entry/NumericEntry';
import OrderingQuestion from '../question_comp/ordering_question/OrderingQuestion';
import TrueFalse from '../question_comp/true_false/TrueFalse';

interface MainContainerProps {
  droppedItems: DroppedQuestion[];
}

export const MainContainer: React.FC<MainContainerProps> = ({
  droppedItems,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [usedHeight, setUsedHeight] = useState(0);

  const { setNodeRef: setMainRef, isOver: isOverMain } = useDroppable({
    id: 'MAIN_CONTAINER',
  });

  // Calculate total height of dropped items dynamically
  useEffect(() => {
    if (!containerRef.current) return;

    const occupied = Array.from(
      containerRef.current.querySelectorAll('.question-block')
    ).reduce((sum, el: any) => sum + el.offsetHeight + 12, 12); // +8 for gap between items

    setUsedHeight(occupied);
  }, [droppedItems]);

  console.log('use height: ', usedHeight);

  return (
    <div
      ref={(el) => {
        setMainRef(el);
        containerRef.current = el;
      }}
      className="relative border border-gray-300 rounded-lg p-4 min-h-screen bg-white shadow-lg"
    >
      {/* ===============================================
          Dynamic remaining empty space highlight (behind last item)
          =============================================== */}
      {droppedItems.length > 0 && isOverMain && (
        <div
          className="absolute left-5 right-5 top-5 bottom-5 bg-blue-200 border border-gray-400/60 pointer-events-none rounded-md z-0 transition-all"
          style={{
            top: usedHeight,
            bottom: 0,
          }}
        />
      )}

      {/* Full container highlight when empty */}
      {droppedItems.length === 0 && isOverMain && (
        <div className="absolute left-5 right-5 top-5 bottom-4 inset-0 bg-blue-200 border border-gray-400/60 pointer-events-none rounded-md z-0 transition-all" />
      )}

      {/* EMPTY MESSAGE */}
      {droppedItems.length === 0 && !isOverMain && (
        <p className="text-gray-400 text-center mt-8">Drag questions here</p>
      )}

      <div className="z-10 flex flex-col">
        {droppedItems.map((item: any, index: number) => (
          <div key={item.uid} className="question-block relative">
            {/* DropZone: pass totalItems so it can skip last */}
            <DropZone index={index} totalItems={droppedItems.length} />
            {renderItem(item)}
          </div>
        ))}
      </div>
    </div>
  );
};

const renderItem = (item: DroppedQuestion) => {
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

/** =============================
 *  DROPZONE BETWEEN ITEMS OR TOP ONLY
 *  - Appears only if at least 2 items exist
 *  - Does NOT appear at the very bottom
 *  ============================= */
const DropZone = ({
  index,
  totalItems,
}: {
  index: number;
  totalItems: number;
}) => {
  // Only show DropZone if:
  // 1. There are at least 2 items
  // 2. The DropZone is NOT at the last position (bottom)
  if (totalItems < 2 || index === totalItems) return null;

  const { isOver, setNodeRef } = useDroppable({
    id: `DROP_ZONE_${index}`,
  });

  return (
    <div
      ref={setNodeRef}
      className={`h-8 w-full my-2 transition-all ${
        isOver
          ? 'bg-blue-300 rounded-md border border-blue-400'
          : 'bg-transparent'
      }`}
    />
  );
};
