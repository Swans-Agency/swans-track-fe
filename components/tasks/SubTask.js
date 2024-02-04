import { Checkbox, Popconfirm } from 'antd';
import React, { useState } from 'react';
import ModalANTD from '../ANTD/ModalANTD';
import { postAxios } from '@/functions/ApiCalls';
import { useRouter } from 'next/router';


export default function SubTask({ itemTask, handleCheckTask, handleDeleteTask, handleNotifyTeam, projectId, getAllTasksNew, item }) {
    const [mouseOver, setMouseOver] = useState(false)
    const [lineThrough, setLineThrough] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const router = useRouter()
    const handleClose = () => {
        setIsModalOpen(false)
    }

    const convertToCard = async () => {
        const formData = new FormData();
        formData.append("taskName", itemTask?.itemName)
        formData.append("taskStatus", item?.task)
        formData.append("status", true)
        formData.append("project", projectId)

        let url = `${process.env.DIGITALOCEAN}/tasks/create-task/`
        let pathname = router.pathname.startsWith("/invited-project") ? true : false

        await postAxios(url, formData, true, true, () => { }, false, "", pathname)
        handleNotifyTeam()
        getAllTasksNew(projectId)
        handleClose()
    }

    return (
        <>
            <div className="flex justify-between hover:bg-gray-100 dark:hover:bg-[#141414] rounded py-1 px-7" onMouseOver={() => setMouseOver(true)} onMouseOut={() => setMouseOver(false)} >
                <div className="flex justify-start items-center gap-2">
                    <Checkbox className={`${itemTask?.status ? "text-gray-400 line-through" : ""} `} checked={itemTask?.status} onChange={(e) => { handleCheckTask(itemTask) }}>
                        <p className=''>{itemTask?.itemName}</p>
                    </Checkbox>
                </div>

                {mouseOver && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 hover:cursor-pointer" onClick={() => setIsModalOpen(true)}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                </svg>}
            </div>
            <ModalANTD
                title="Task Actions"
                footer={null}
                isModalOpen={isModalOpen}
                handleOk={handleClose}
                handleCancel={handleClose}

                renderComponent={
                    <div className='rounded-lg py-2'  >
                        <div className='flex justify-start items-center gap-x-3 px-2 py-2 hover:cursor-pointer rounded-lg hover:bg-[#141414]' onClick={() => convertToCard()}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
                            </svg>

                            <p>Convert to Card</p>
                        </div>

                        <div className='flex justify-start items-center gap-x-3 px-2 py-2 hover:cursor-pointer hover:text-red-400 rounded-lg hover:bg-[#141414]' onClick={() => handleDeleteTask(itemTask?.id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                            </svg>
                            <p>Delete Task</p>
                        </div>
                    </div>
                }

            />
        </>

    );
};