import { getAxios, patchAxios, postAxios } from '@/functions/ApiCalls';
import { Button, Cascader, Dropdown, Input, Popconfirm } from 'antd';
import Image from 'next/image';
import React, { useState } from 'react';
import ModalANTD from '../ANTD/ModalANTD';
import {
    HomeOutlined,
    LoadingOutlined,
    SettingFilled,
    SmileOutlined,
    SyncOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/router';


export default function CheckList({ item, handleDeleteChecklist, handleNotifyTeam }) {
    const [showInput, setShowInput] = useState(false);
    const [checkListName, setCheckListName] = useState(item?.checklistName)
    const [showLists, setShowLists] = useState(false)
    const [mousePosition, setMousePosition] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [companyTasks, setCompanyTasks] = useState(null)
    const [loadingMore, setLoadingMore] = useState(false)
    const router = useRouter()

    const handleChangeName = async () => {
        if (checkListName !== "") {
            const url = `${process.env.DIGITALOCEAN}/tasks/check-list/${item?.id}/`
            let pathname = router.pathname.startsWith("/invited-project") ? true : false

            const data = {
                checklistName: checkListName
            }
            setShowInput(false)
            await patchAxios(url, data, false, false, () => { }, pathname)
            handleNotifyTeam()
        }
    }

    const handleHideInput = () => {
        setShowInput(false)
    }

    const handleRightClick = (e) => {
        setMousePosition({ position: "fixed", left: e.clientX, top: e.clientY })
        setIsModalOpen(true)
        getAllCompanyTasks()
    }

    const getAllCompanyTasks = async () => {
        const url = `${process.env.DIGITALOCEAN}/tasks/list-tasks/`
        let pathname = router.pathname.startsWith("/invited-project") ? true : false

        if (!companyTasks) {
            let response = await getAxios(url, false, false, () => { }, pathname)
            setCompanyTasks(response)
        }
    }

    const replaceHttpWithHttps = (link) => {
        const index = link.indexOf("/?");
        if (index !== -1) {
            const result = link.substring(index);
            return result
        } else {
            return link
        }
    }

    const loadMoreTasks = async () => {
        const filters = replaceHttpWithHttps(companyTasks?.next)
        const url = `${process.env.DIGITALOCEAN}/tasks/list-tasks${filters}`
        let pathname = router.pathname.startsWith("/invited-project") ? true : false
        setLoadingMore(true)
        let response = await getAxios(url, false, false, () => { }, pathname)
        setCompanyTasks({
            ...companyTasks,
            results: [...companyTasks?.results, ...response?.results],
            next: response?.next
        })
        setLoadingMore(false)
    }

    const cloneChecklist = async (id) => {
        const url = `${process.env.DIGITALOCEAN}/tasks/clone-checklist/`
        let pathname = router.pathname.startsWith("/invited-project") ? true : false

        await postAxios(url, { checklistId: item?.id, destinationId: id }, true, true, () => { }, false, "", pathname)
        handleNotifyTeam()
    }



    const handleClose = () => {
        setIsModalOpen(false)
    };

    return (
        <div className="font-semibold flex gap-x-2 items-center justify-between mb-2 border-b pb-1" >
            <div className="flex gap-x-2 items-center w-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
                </svg>
                {!showInput &&
                    <div className='w-full' onClick={() => setShowInput(true)}>
                        {checkListName}
                    </div>
                }
                {showInput && <div className="flex items-center gap-2">
                    <Input
                        autoFocus
                        placeholder="Task name"
                        size=""
                        className=""
                        defaultValue={checkListName}
                        onChange={(e) => setCheckListName(e.target.value)}
                    />
                    <div className="flex gap-1">
                        <div className="bg-mainBackground dark:bg-[#141414] rounded-lg text-white hover:shadow-lg hover:cursor-pointer px-3 py-1 " onClick={() => handleChangeName()}>
                            Save
                        </div>
                        <div className="bg-gray-400 dark:bg-[#282828] rounded-lg text-white hover:shadow-lg hover:cursor-pointer px-3 py-1 " onClick={() => handleHideInput()}>
                            Cancel
                        </div>
                    </div>
                </div>}
            </div>

            <div className='hover:cursor-pointer' onClick={(e) => handleRightClick(e)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                </svg>
            </div>


            <ModalANTD
                title="Checklist Actions"
                footer={null}
                isModalOpen={isModalOpen}
                handleOk={handleClose}
                handleCancel={handleClose}

                renderComponent={
                    <div id="_checklist-close" className='rounded-lg py-2'  >
                        <div id="_cloneChecklist" className='flex justify-between items-center gap-x-3 px-2 py-2 hover:cursor-pointer rounded-lg hover:bg-[#141414]' onClick={() => setShowLists(!showLists)}>
                            <div className='flex justify-start items-center gap-x-3'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                                </svg>
                                <p>Copy Checklist To</p>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-5 h-5 ${showLists ? "rotate-180" : ""}`}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>

                        </div>
                        {showLists &&
                            <div className='rounded-lg bg-[#141414] px-4 py-2 my-2 max-h-[300px] overflow-auto'>
                                {companyTasks?.results?.map((task) => {
                                    if (task?.id !== item?.id) {
                                        return (
                                            <div
                                                className='py-1 border-b border-b-[#282828] hover:text-gray-400 hover:cursor-pointer flex justify-between items-center gap-x-4'
                                                onClick={() => cloneChecklist(task?.id)}
                                            >
                                                <p>#{task?.id} {task?.taskName}</p>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m-6 3.75l3 3m0 0l3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75" />
                                                </svg>
                                            </div>
                                        )
                                    }
                                })}
                                {companyTasks?.next && !loadingMore && <p className={`w-full text-center pt-6 text-blue-400 underline hover:cursor-pointer ${!loadingMore ? "pb-2" : ""}`} onClick={() => loadMoreTasks()}>Load more</p>}
                                {loadingMore && <div className='w-full text-center text-xl '><SyncOutlined spin /></div>}
                            </div>
                        }
                        <div id="_deleteChecklist" className='flex justify-start items-center gap-x-3 px-2 py-2 hover:cursor-pointer hover:text-red-400 rounded-lg hover:bg-[#141414]' onClick={() => handleDeleteChecklist(item?.id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                            </svg>
                            <p>Delete Checklist</p>
                        </div>
                    </div>
                }
            />

        </div>
    );
};