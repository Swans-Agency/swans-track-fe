import React, { useState } from 'react';
import CheckList from './CheckList';
import SubTask from './SubTask';
import { Input } from 'antd';
import { deleteAxios, patchAxios, postAxios } from '@/functions/ApiCalls';
import { useRouter } from 'next/router';


export default function AllCheckLists({ item, handleInitialValues, handleNotifyTeam, projectId, getAllTasksNew, selectedItem }) {
    const [showInputTask, setShowInputTask] = useState(false);
    const router = useRouter()

    const [taskName, setTaskName] = useState("")



    const handleCreateTask = async (item) => {
        let pathname = router.pathname.startsWith("/invited-project") ? true : false

        const url = `${process.env.DIGITALOCEAN}/tasks/items-list/`
        const data = {
            itemName: taskName,
            checklist: item?.id
        }
        await postAxios(url, data, false, false, () => { }, false, "", pathname)
        handleInitialValues()
        setShowInputTask(false)
    }

    const handleDeleteChecklist = async (id) => {
        const url = `${process.env.DIGITALOCEAN}/tasks/check-list/${id}/`
        let pathname = router.pathname.startsWith("/invited-project") ? true : false

        await deleteAxios(url, true, true, () => { }, pathname)
        handleInitialValues()
    }

    const handleCheckTask = async (item) => {
        const url = `${process.env.DIGITALOCEAN}/tasks/items-list/${item?.id}/`
        let pathname = router.pathname.startsWith("/invited-project") ? true : false

        await patchAxios(url, {}, false, false, () => { }, pathname)
        handleInitialValues()
    }

    const handleDeleteTask = async (id) => {
        const url = `${process.env.DIGITALOCEAN}/tasks/items-list/${id}/`
        let pathname = router.pathname.startsWith("/invited-project") ? true : false

        await deleteAxios(url, true, true, () => { }, pathname)
        handleInitialValues()
    }

    return (
        <div className="mb-4">
            <CheckList
                item={item}
                handleDeleteChecklist={handleDeleteChecklist}
                handleNotifyTeam={handleNotifyTeam}
                projectId={projectId}
            />
            {item?.checkListItems?.map((itemTask) => {
                return (
                    <SubTask
                        itemTask={itemTask}
                        item={item}
                        selectedItem={selectedItem}
                        handleCheckTask={handleCheckTask}
                        handleDeleteTask={handleDeleteTask}
                        handleNotifyTeam={handleNotifyTeam}
                        projectId={projectId}
                        getAllTasksNew={getAllTasksNew}
                    />
                )
            })}
            {showInputTask &&
                <div className="flex items-center gap-2 ml-7 mt-1">
                    <Input
                        autoFocus placeholder="Task name" size="" className=""
                        onChange={(e) => setTaskName(e.target.value)}
                    />
                    <div className="flex gap-1">
                        <div className="bg-mainBackground dark:bg-[#141414] rounded-lg text-white hover:shadow-lg hover:cursor-pointer px-3 py-1 " onClick={() => handleCreateTask(item)}>Save</div>
                        <div className="bg-gray-400 dark:bg-[#282828] rounded-lg text-white hover:shadow-lg hover:cursor-pointer px-3 py-1 " onClick={() => setShowInputTask(false)}>Cancel</div>
                    </div>
                </div>
            }
            <p className="ml-7 bg-gray-400 dark:bg-[#141414] text-white w-fit mt-2 px-3 py-1 rounded-lg hover:shadow-lg hover:cursor-pointer" onClick={() => setShowInputTask(true)}>Add an Item</p>
        </div>

    );
};