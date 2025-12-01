'use client';

import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { useEffect, useState } from 'react';
import MainContainer from '../components/container/MainContainer';
import DraggableQItem from '../components/draggable/DraggableQItem';
import MainEditPage from '../components/Editable/MainEditPage';
import { ICON_MAP } from '../components/QItem';
import { DroppedQuestion } from '../types/types';

const items = [
  {
    id: 'MultipleChoice',
    name: 'Multiple Choice',
    description: 'Single correct answer from multiple options',
    icon: 'FaCircleDot',
  },
  {
    id: 'MultipleSelect',
    name: 'Multiple Select',
    description: 'Multiple correct answers from options',
    icon: 'BiSolidSelectMultiple',
  },
  {
    id: 'TrueFalse',
    name: 'True/False',
    description: 'Binary choice question',
    icon: 'BsListCheck',
  },
  {
    id: 'FillBlank',
    name: 'Fill in the Blank',
    description: 'Complete missing text in a sentence',
    icon: 'PiAlignBottomFill',
  },
  {
    id: 'Matching',
    name: 'Matching',
    description: 'Match items from two columns',
    icon: 'PiLinkSimpleFill',
  },
  {
    id: 'Numeric',
    name: 'Numeric Entry',
    description: 'Number input with tolerance',
    icon: 'GoNumber',
  },
  {
    id: 'Ordering',
    name: 'Ordering Sequence',
    description: 'Arrange items in correct order',
    icon: 'CgMenuRightAlt',
  },
];

export default function BasicDragPage() {
  const [dropped, setDropped] = useState<DroppedQuestion[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    // Drop from sidebar → new item
    if (over.id === 'MAIN_DROP_AREA') {
      const type = active.id as DroppedQuestion['type'];

      setDropped((prev) => {
        if (prev.some((i) => i.type === type)) return prev;

        const uid = `${type}-${Date.now()}-${Math.random()}`;
        return [...prev, { uid, type }];
      });

      return;
    }

    // Sorting inside drop zone
    const oldIndex = dropped.findIndex((i) => i.uid === active.id);
    const newIndex = dropped.findIndex((i) => i.uid === over.id);

    if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
      setDropped((prev) => {
        const newArr = [...prev];
        const [moved] = newArr.splice(oldIndex, 1);
        newArr.splice(newIndex, 0, moved);
        return newArr;
      });
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="px-10 py-6 flex justify-center items-start gap-10 h-screen overflow-hidden bg-gray-50">
        {/* Left Sidebar */}
        <aside className="w-2/5 h-full">
          {mounted &&
            items.map((item) => (
              <div key={item.id}>
                <DraggableQItem
                  id={item.id}
                  type={item.id as DroppedQuestion['type']}
                  leftIcon={ICON_MAP[item.icon]}
                  heading={item.name}
                  description={item.description}
                />
              </div>
            ))}
        </aside>

        {/* Center Workspace */}
        <main className="w-4/6 h-full overflow-y-auto pr-2 hide-scrollbar">
          <MainContainer dropped={dropped} setDropped={setDropped} />
        </main>

        {/* Right Sidebar */}
        <aside className="w-2/5 h-full overflow-y-auto hide-scrollbar">
          <MainEditPage />
        </aside>
      </div>
    </DndContext>
  );
}
