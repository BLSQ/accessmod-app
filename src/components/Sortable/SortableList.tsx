import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { assign } from "lodash";
import { ReactNode, useMemo } from "react";

import SortableItem from "./SortableItem";

type SortableListProps = {
  items: any[];
  handle?: boolean;
  disabled?: boolean;
  onChange: (items: any[]) => void;
  renderItem: (item: any, index: number, handleProps: any) => ReactNode;
  getItemId?: (item: any) => string;
};

const SortableList = (props: SortableListProps) => {
  const {
    items,
    onChange,
    handle,
    disabled,
    renderItem,
    getItemId = (item) => item?.id ?? "",
  } = props;
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const ids = useMemo(() => items.map(getItemId), [items, getItemId]);
  const itemsMap = useMemo(
    () =>
      items.reduce<{ [key: string]: any }>((acc, cur) => {
        acc[getItemId(cur)] = cur;
        return acc;
      }, {}),
    [items, getItemId]
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        disabled={disabled}
        items={ids}
        strategy={verticalListSortingStrategy}
      >
        {ids.map((id, index) => (
          <SortableItem handle={handle} key={id} id={id}>
            {(handleProps) => renderItem(itemsMap[id], index, handleProps)}
          </SortableItem>
        ))}
      </SortableContext>
    </DndContext>
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = ids.indexOf(active.id);
      const newIndex = ids.indexOf(over?.id);
      const newIds = arrayMove(ids, oldIndex, newIndex);

      onChange(newIds.map((id) => itemsMap[id]));
    }
  }
};

export default SortableList;
