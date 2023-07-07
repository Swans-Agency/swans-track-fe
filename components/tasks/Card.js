import React from "react";
import { Draggable } from "react-beautiful-dnd";

export default function Card({ card, index }) {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div
          className="rounded-md p-2 bg-white mb-1"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {card.content}
        </div>
      )}
    </Draggable>
  );
}
