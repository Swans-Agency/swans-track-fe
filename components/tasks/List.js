import { Droppable } from "react-beautiful-dnd";
import Card from "./Card";
import { useState } from "react";
import { Empty } from 'antd';

export default function List({ cards, listId, showTag, setShowTag, setSelectedItem, setOpen }) {

    return (
        <Droppable droppableId={listId}>
            {(provided, snapshot) => (
                <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    isDraggingOver={snapshot.isDraggingOver}
                    className={`flex flex-col gap-y-2 ${snapshot.isDraggingOver && "drag-over"} min-h-[5px] `}
                >
                    {cards?.length ?
                        <>   {cards?.map((card, index) => (
                            <Card key={card?.id} card={card} index={index} showTag={showTag} setShowTag={setShowTag} setSelectedItem={setSelectedItem} setOpen={setOpen} />
                        ))}
                            {provided.placeholder}
                        </>
                        :
                        <div className="flex justify-center">
                            <Empty
                                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                                imageStyle={{
                                    height: 60,
                                }}
                                description={false}
                            ></Empty>
                        </div>
                    }
                </div>
            )}
        </Droppable>
    );
}