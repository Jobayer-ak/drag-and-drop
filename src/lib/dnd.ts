import { arrayMove } from '@dnd-kit/sortable';

export const findContainer = (
  containers: Record<string, string[]>,
  id: string
) => {
  if (containers[id]) return id;
  return Object.keys(containers).find((key) => containers[key].includes(id));
};

export const handleSortableDragEnd = (
  event: any,
  items: string[],
  setItems: (items: string[]) => void
) => {
  const { active, over } = event;

  if (!over || active.id === over.id) return;

  setItems((currentItems) => {
    const oldIndex = currentItems.indexOf(active.id);
    const newIndex = currentItems.indexOf(over.id);
    return arrayMove(currentItems, oldIndex, newIndex);
  });
};
