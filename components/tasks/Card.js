import React, { useState } from "react";
import { AlignLeftOutlined } from "@ant-design/icons";
import { Draggable } from "react-beautiful-dnd";
import { Badge, Progress } from 'antd';
import dayjs from "dayjs";
import DotIcon from "./dotIcon";
import Clock from "./Clock";
import Image from "next/image";

export default function Card({ card, index, showTag, setShowTag, setSelectedItem, setOpen }) {
    const [minimize, setMinimize] = useState(false);
    const [minTag, setMinTag] = useState(false);

    const priorityColor = {
        "Low": "bg-green-600",
        "Normal": "bg-blue-600",
        "Urgent": "bg-red-600",
    }

    const handleUpdate = (cardItem) => {

        setSelectedItem(cardItem)
        setOpen(true);
    }


    return (
        <Draggable draggableId={`${card?.id}`} index={index} key={index} isDragDisabled={false}>
            {(provided, snapshot) => (

                <div
                    className="pr-1"
                    {...provided?.draggableProps}
                    {...provided?.dragHandleProps}
                    ref={provided?.innerRef}
                    isDragging={snapshot?.isDragging}
                    isDragDisabled={false}
                    onClick={() => setMinimize(!minimize)}
                >
                    { }
                    <Badge.Ribbon className="absolute top-0 left-0 w-0 h-0" color="transparent">
                        <div className={`border dark:border-0 px-2 pt-4 rounded-lg bg-white dark:bg-[#141414] dark:text-white shadow  py-2`}>
                            <div className="flex items-center justify-between">
                                <div
                                    onClick={() => { handleUpdate(card) }}
                                    className="hover:cursor-pointer !z-[100]"
                                >
                                    <DotIcon />
                                </div>
                                <p
                                    className={`px-2 py-[0.3rem] min-w-[50px] text-center rounded hover:cursor-pointer text-white text-light text-sm ${priorityColor[card?.priority]}`}
                                    onClick={() => setMinTag(!minTag)}
                                >
                                    {minTag ? card?.priority : ""}</p>
                            </div>
                            <div className="pt-1">
                                <p className=" font-medium " style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>{card?.taskName}</p>
                                <p className="text-justify text-gray-400">
                                    {card?.taskDescription != "undefined" && card?.taskDescription?.length > 2 &&
                                        <div
                                            style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}
                                            dangerouslySetInnerHTML={{ __html: card?.taskDescription?.substring(0, 150) }}
                                        />
                                    }
                                </p>
                                {card?.subTasks > 0 && <div className="flex justify-start items-center gap-1 text-gray-400 mt-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
                                    </svg>
                                    <div>
                                        {card?.subTasks}
                                    </div>
                                </div>}
                                {<div className="py-2 flex justify-between">
                                    {card?.dueDate && <div 
                                    className={`flex gap-x-1 items-center ${dayjs(card?.dueDate).diff(dayjs(), 'day') < 0 && card?.taskStatus !== "Completed" ? "text-red-500" : dayjs(card?.dueDate).diff(dayjs(), 'day') < 2 && card?.taskStatus !== "Completed" ? "text-yellow-500" : card?.taskStatus !== "Completed" ? "text-green-500" : "text-black dark:text-gray-600"}`}><Clock />{dayjs(card?.dueDate).format('D MMM, YYYY')}</div>}

                                    {card?.assignee?.name && <div className="w-[30px] h-[30px] hover:cursor-auto ml-auto">
                                        {card?.assignee?.pfp?.split('?')[1] ? <img  src={card?.assignee?.pfp?.split('?')[0]} title={card?.assignee?.name} className="w-full h-full rounded-full border-2 p-1" /> :
                                        <Image width={20} height={20}  src={"/LogoWhite.svg"} title={card?.assignee?.name} className="w-full h-full rounded-full border-2 p-1" /> }
                                    </div>}
                                </div>}

                            </div>
                        </div>

                    </Badge.Ribbon>
                </div>
            )}
        </Draggable>
    );
}