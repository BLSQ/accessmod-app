import React, { ReactNode } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MenuIcon } from "@heroicons/react/outline";

type SortableItemProps = {
  id: string;
  children: (handleProps: any) => ReactNode;
  handle?: boolean;
};

export default function SortableItem(props: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const elmProps = props.handle
    ? {}
    : {
        ...attributes,
        ...listeners,
      };

  return (
    <div ref={setNodeRef} style={style} {...elmProps} className="flex ">
      {props.children(
        props.handle ? { ...attributes, ...listeners } : undefined
      )}
    </div>
  );
}
