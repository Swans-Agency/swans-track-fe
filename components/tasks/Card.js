import React from "react";
import { Draggable } from "react-beautiful-dnd";

export default function Card({ card, index }) {
    return (
        <Draggable draggableId={`${index}`} index={index} key={index} isDragDisabled={false}>
            {(provided, snapshot) => (
                <div
                    className='rounded-md p-2 bg-white mr-1'
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    isDragging={snapshot.isDragging}
                    isDragDisabled={false}
                >
                    {card.content}
                </div>
            )}
        </Draggable>
    );
}