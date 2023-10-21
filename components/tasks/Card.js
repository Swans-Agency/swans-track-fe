import React, { useState } from "react";
import { AlignLeftOutlined } from "@ant-design/icons";
import { Draggable } from "react-beautiful-dnd";
import { Badge, Progress } from 'antd';
import dayjs from "dayjs";
import DotIcon from "./dotIcon";
import Clock from "./Clock";

export default function Card({ card, index, showTag, setShowTag, setSelectedItem, setOpen }) {
    const [minimize, setMinimize] = useState(false);

    const priorityColor = {
        "Low": "green",
        "Normal": "blue",
        "Urgent": "red",
    }

    const handleUpdate = (cardItem) => {
        console.log({ cardItem })
        setSelectedItem(cardItem)
        setOpen(true);
    }

    console.log({ card })
    

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
                    onClick={() => setMinimize(!minimize)}
                >
                    {console.log(card)}
                    <Badge.Ribbon text={ card?.priority} color={priorityColor[card?.priority]}>
                        <div className="border px-2 pt-4 rounded-lg bg-white shadow">
                            <div
                                onClick={() => {handleUpdate(card)}}
                                className="hover:cursor-pointer !z-[10000000000]"
                            >
                                <DotIcon />
                            </div>
                            <div className="pt-1">
                                <p className=" font-medium " style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>{card.taskName}</p>
                                <p className="text-justify text-gray-400">
                                    {card?.taskDescription != "undefined" && card?.taskDescription.length > 2 && 
                                        <div
                                        style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}
                                        dangerouslySetInnerHTML={{ __html: card?.taskDescription?.substring(0, 150)}}
                                        />
                                    }
                                </p>
                                {card?.subTasks > 0 && <div className="flex justify-start items-center gap-1 text-gray-400 mt-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
                                    </svg>
                                    <div>

                                    {card?.subTasks}
                                    </div>
                                </div>}
                                <div className="py-2 flex justify-between">
                                    <div className={`flex gap-x-1 items-center ${dayjs(card?.dueDate).diff(dayjs(), 'day') < 0 && card?.taskStatus !== "Completed" ? "text-red-500" : dayjs(card?.dueDate).diff(dayjs(), 'day') < 2 && card?.taskStatus !== "Completed" ? "text-yellow-500" : card?.taskStatus !== "Completed" ? "text-green-500" : "text-black"}`}><Clock />{dayjs(card?.dueDate).format('D MMM, YYYY')}</div>
                                    <div className="w-[30px] h-[30px] hover:cursor-auto">
                                        <img src={card?.assignee?.pfp?.split('?')[0]} title={card?.assignee?.name} className="w-full h-full rounded-full border-2 p-1" />
                                    </div>
                                </div>

                            </div>
                            </div>
                        {/* </div> :
                            <div
                                className="border  pl-1 pt-2 rounded bg-white shadow"
                                onClick={() => setMinimize(!minimize)}
                            >
                                <div className=" flex items-center gap-x-2">
                                    <div className="w-[30px] h-[30px] hover:cursor-auto">
                                        <img src={card?.assignee?.pfp?.split('?')[0]} title={card?.assignee?.name} className="w-full h-full rounded-full border-2 p-1" />
                                    </div>
                                    <p className="font-normal w-2/3" style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>{card.taskName}</p>
                                </div>
                                <div className="pr-2" >
                                    <Progress
                                        style={{
                                            marginBottom: '0px'
                                        }}
                                        showInfo={false}
                                        percent={
                                            ((dayjs(card?.dueDate).diff(dayjs(card?.createdAt), 'day') - dayjs(card?.dueDate).diff(dayjs(), 'day')) / dayjs(card?.dueDate).diff(dayjs(card?.createdAt), 'day')) * 100
                                        }
                                        trailColor="#DDE6ED"
                                        strokeColor={{
                                            '0%': '#C8E4B2',
                                            '50%': '#F2EE9D',
                                            '100%': '#FFBFBF',
                                        }}
                                        size={['100%', '2.5px']}
                                    />
                                </div>
                            </div> */}
                        {/* } */}
                    </Badge.Ribbon>
                </div>
            )}
        </Draggable>
    );
}