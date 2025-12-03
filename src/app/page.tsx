'use client';

import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from '@dnd-kit/core';
import { JSX, useEffect, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';
import { MainContainer } from '../components/container/MainContainer';
import DraggableQItem from '../components/draggable/DraggableQItem';
import DragPreview from '../components/DragPreview';
import MainEditPage from '../components/Editable/MainEditPage';
import { ICON_MAP } from '../components/QItem';
import { DroppedQuestion, QuestionType } from '../types/types';

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

export default function BasicDragPage(): JSX.Element {
  const [mounted, setMounted] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [droppedItems, setDroppedItems] = useState<DroppedQuestion[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  function handleDragStart(event: DragStartEvent) {
    // ensure string
    setActiveId(String(event.active?.id ?? null));
  }

  // console.log('Active id: ', activeId);
  // When drag ends
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    // If dropped on main container (empty list)
    if (over.id === 'MAIN_CONTAINER') {
      return addNewItemAtIndex(droppedItems.length);
    }

    // If dropped on drop zone
    if (String(over.id).startsWith('DROP_ZONE_')) {
      const index = Number(String(over.id).replace('DROP_ZONE_', ''));
      return addNewItemAtIndex(index);
    }
  }

  function addNewItemAtIndex(index: number) {
    const newItem: DroppedQuestion = {
      uid: uuidv4(),
      type: activeId as QuestionType,
    };

    setDroppedItems((prev) => {
      // unique: remove same type if already exists
      const filtered = prev.filter((i) => i.type !== newItem.type);

      // insert at index
      const updated = [...filtered];
      updated.splice(index, 0, newItem);

      return updated;
    });
  }

  const activeItem = items.find((it) => it.id === activeId) ?? null;

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="px-10 pb-6 flex justify-center items-start gap-10 h-screen overflow-hidden  bg-gray-50">
        {/* Left Sidebar */}
        <aside className="w-2/5 h-full mt-6">
          {mounted &&
            items.map((item) => (
              <div
                key={item.id}
                // fade the original when it is being dragged
                className={
                  activeId === item.id
                    ? 'opacity-50 transition-opacity'
                    : 'transition-opacity'
                }
              >
                <DraggableQItem
                  id={item.id}
                  activeId={activeId}
                  type={item.id as DroppedQuestion['type']}
                  leftIcon={ICON_MAP[item.icon]}
                  heading={item.name}
                  description={item.description}
                />
              </div>
            ))}
        </aside>

        {/* Center Workspace */}
        <main
          id="MAIN_CONTAINER"
          className="w-4/6 py-6 h-full overflow-y-auto pr-2 hide-scrollbar"
        >
          <MainContainer
            droppedItems={droppedItems}
            setDroppedItems={setDroppedItems}
            activeType={activeId}
          />
        </main>

        {/* Right Sidebar */}
        <aside className="w-2/5 h-full pt-2 overflow-y-auto hide-scrollbar">
          <MainEditPage />
        </aside>
      </div>

      {/* DragOverlay must be inside DndContext */}
      <DragOverlay>
        {activeItem ? (
          // render a PRESENTATIONAL preview (no useDraggable inside)
          <DragPreview
            leftIcon={ICON_MAP[activeItem.icon]}
            heading={activeItem.name}
            description={activeItem.description}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
