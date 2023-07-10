import { Droppable } from "react-beautiful-dnd";
import Card from "./Card";
import { useState } from "react";

export default function List({ cards, listId, showTag, setShowTag }) {
    
    return (
        <Droppable droppableId={listId}>
            {(provided, snapshot) => (
                <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    isDraggingOver={snapshot.isDraggingOver}
                    className={`flex flex-col gap-y-2 ${snapshot.isDraggingOver && "drag-over"} min-h-[5px] mb-1`}
                >
                    {cards?.map((card, index) => (
                        <Card key={card?.id} card={card} index={index} showTag={showTag} setShowTag={setShowTag} />
                    ))} 
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
}