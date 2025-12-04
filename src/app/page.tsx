/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  MeasuringStrategy,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { JSX, useEffect, useState } from 'react';

import { arrayMove } from '@dnd-kit/sortable';
import { v4 as uuidv4 } from 'uuid';
import { MainContainer } from '../components/container/MainContainer';
import DraggableQItem from '../components/draggable/DraggableQItem';
import DragPreview from '../components/DragPreview';
import MainEditPage from '../components/Editable/MainEditPage';
import { ICON_MAP } from '../components/QItem';
import SortingPreview from '../components/SortingPreview';
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
  const [lastDroppedUid, setLastDroppedUid] = useState<string | null>(null);
  const [dragStartY, setDragStartY] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  function handleDragStart(event: DragStartEvent) {
    // ensure string
    setActiveId(String(event.active?.id ?? null));
    // setActiveType(String(event.active?.));
    // console.log('event: ', event);

    const pointerEvent = event.active?.data?.current?.sensorEvent as
      | PointerEvent
      | TouchEvent;
    if (pointerEvent) {
      setDragStartY(pointerEvent.clientY); // store Y
    }
    setActiveId(String(event.active?.id ?? null));
  }

  // When drag ends
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);

    console.log('end event: ', event);

    if (!over) return;

    // ⭐ Reordering inside main container
    if (active.id !== over.id && over.id && typeof over.id === 'string') {
      const activeIndex = droppedItems.findIndex((i) => i.uid === active.id);
      const overIndex = droppedItems.findIndex((i) => i.uid === over.id);

      // If dragging an existing dropped item
      if (activeIndex !== -1 && overIndex !== -1) {
        setDroppedItems((prev) => arrayMove(prev, activeIndex, overIndex));
        return;
      }
    }

    //  Dropping from left sidebar (your existing logic)
    if (over.id === 'MAIN_CONTAINER') {
      return addNewItemAtIndex(droppedItems.length);
    }

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

    setLastDroppedUid(newItem.uid);

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

  const sortingDragActiveId = droppedItems.filter(
    (item) => item.uid === activeId
  );

  console.log('Sorting drag active id: ', sortingDragActiveId);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 4, // small drag threshold so it doesn’t trigger immediately
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 5,
      },
    })
  );

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      sensors={sensors}
      collisionDetection={closestCenter}
      measuring={{
        droppable: { strategy: MeasuringStrategy.Always },
      }}
    >
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
                  // lastDroppedUid={lastDroppedUid}
                  type={item.id as DroppedQuestion['type']}
                  leftIcon={ICON_MAP[item.icon]}
                  heading={item.name}
                  description={item.description}
                />
              </div>
            ))}
        </aside>

        {/* Center Workspace */}
        <main className="w-4/6 py-6 h-full overflow-y-auto pr-2 hide-scrollbar">
          <MainContainer
            droppedItems={droppedItems}
            setDroppedItems={setDroppedItems}
            activeItem={activeId}
            lastDroppedUid={lastDroppedUid}
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
        ) : (
          <SortingPreview
            sortingDragActiveId={sortingDragActiveId}
            droppedItems={droppedItems}
          />
        )}
      </DragOverlay>
    </DndContext>
  );
}
