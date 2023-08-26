import React, { useState } from "react";
import { AlignLeftOutlined } from "@ant-design/icons";
import { Draggable } from "react-beautiful-dnd";
import { Badge } from 'antd';
import dayjs from "dayjs";
import DotIcon from "./dotIcon";
import Clock from "./Clock";

export default function Card({ card, index, showTag, setShowTag, setSelectedItem, setOpen }) {

    const priorityColor = {
        "Low": "green",
        "Normal": "blue",
        "Urgent": "red",
    }
    const priorityBorderColor = {
        "Low": "green-400",
        "Normal": "blue-400",
        "Urgent": "red-400",
    }

    const handleUpdate = (cardItem) => {
        console.log({ cardItem })
        setSelectedItem(cardItem)
        setOpen(true);
    }

    const handleShowTag = () => {
        setOpen(false);
        setShowTag(!showTag)
        setOpen(false);
    }

    return (
        <Draggable draggableId={`${card.id}`} index={index} key={index} isDragDisabled={false}>
            {(provided, snapshot) => (

                <div
                    className="pr-1"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    isDragging={snapshot.isDragging}
                    isDragDisabled={false}
                >
                    <Badge.Ribbon text={card?.priority} color={priorityColor[card?.priority]}>
                        <div className="border px-2 pt-4 rounded-lg bg-white shadow">
                            <div
                                onClick={() => handleUpdate(card)}
                                className="hover:cursor-pointer"
                            >
                                <DotIcon/>
                            </div>
                            <div className="pt-1">
                                <p className=" font-medium " style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>{card.taskName}</p>
                                <p className="text-justify text-gray-400">
                                    {card?.taskDescription != "undefined" && card?.taskDescription.length > 2 && card?.taskDescription.substring(0, 60) + "..."}
                                </p>
                                <div className="py-2 flex justify-between mt-2">
                                    <div className={`flex gap-x-1 items-center ${dayjs(card?.dueDate).diff(dayjs(), 'day') < 0 && card?.taskStatus !== "Completed" ? "text-red-500" : dayjs(card?.dueDate).diff(dayjs(), 'day') < 2 && card?.taskStatus !== "Completed" ? "text-yellow-500" : card?.taskStatus !== "Completed" ? "text-green-500" : "text-black" }`}><Clock />{dayjs(card?.dueDate).format('D MMM, YYYY')}</div>
                                    <div className="w-[30px] h-[30px] hover:cursor-auto">
                                        <img src={card?.assignee?.pfp?.split('?')[0]} title={card?.assignee?.name} className="w-full h-full rounded-full border-2 p-1" />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </Badge.Ribbon>
                </div>
            )}
        </Draggable>
    );
}