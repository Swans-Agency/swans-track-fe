import React, { useState } from "react";
import { AlignLeftOutlined } from "@ant-design/icons";
import { Draggable } from "react-beautiful-dnd";

export default function Card({ card, index, showTag, setShowTag, setSelectedItem, setOpen }) {

    const priorityColor = {
        "Low": "bg-green-600",
        "Normal": "bg-blue-600",
        "Urgent": "bg-red-600",
    }

    const handleUpdate = (cardItem) => {
        console.log({ cardItem })
        setSelectedItem(cardItem)
        setOpen(true);
    }

    const handleShowTag = () => {
        setOpen(false);
        setShowTag(!showTag)
    }

    return (
        <Draggable draggableId={`${card.id}`} index={index} key={index} isDragDisabled={false}>
            {(provided, snapshot) => (
                <div
                    className='rounded-md relative p-2 bg-white hover:bg-gray-100 mr-2 shadow'
                    onClick={() => handleUpdate(card)}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    isDragging={snapshot.isDragging}
                    isDragDisabled={false}
                >
                    <div
                        className={`${showTag ? "w-fit" : "w-[15%] h-[6px]"} hover:cursor-pointer z-[1000000000] ${priorityColor[card?.priority]} text-white px-3 text-xs font-light rounded-full`}
                        title={card?.priority}
                        onClick={() => handleShowTag()}
                    >
                        {showTag ? card?.priority : ""}
                    </div>
                    <p className="mt-1  font-extralight " style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>{card.taskName}</p>
                    <div className={`flex items-center ${card?.taskDescription ? "justify-between" : "justify-end"}`}>
                        <div className="hover:cursor-auto" title={card?.taskDescription}>
                            {card?.taskDescription != "undefined" && card?.taskDescription.length > 2 && <AlignLeftOutlined />}
                        </div>
                        <div className="w-[25px] h-[25px] hover:cursor-auto">
                            <img src={card?.assignee?.pfp?.split('?')[0]} title={card?.assignee?.name} className="w-full h-full rounded-full" />
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    );
}