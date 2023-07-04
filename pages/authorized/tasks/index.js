import React, { useEffect, useState, useRef } from 'react';
import { ref, set, onValue } from "firebase/database";
import dynamic from 'next/dynamic'
import database from '@/components/firebaseNotify/Firebase';
import { deleteAxios, getAxios, patchAxios, patchDataWithout, postAxios } from '@/functions/ApiCalls';
import { Drawer, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Image from 'next/image';
import Loading from '@/components/Loading/Loading';
import NoTableData from '@/components/ANTD/NoTableData';




const TasksTable = dynamic(() => import('@/components/tasks/TasksTable'), {
    loading: () => <Loading />,
});
const TaskForm = dynamic(() => import('@/components/tasks/NewTask'), {
    loading: () => <Loading />,
});



export default function index({ accessToken, userPermission, userId }) {
    const dbRef = useRef(null);
    const [tasks, setTasks] = useState([]);
    const [doneTasks, setDoneTasks] = useState([]);
    const [idleTasks, setIdleTasks] = useState([]);
    const [inProgressTasks, setInProgressTasks] = useState([]);
    const [open, setOpen] = useState(false);
    const [notifyData, setNotifyData] = useState({});
    const [showDelete, setShowDelete] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [itemIndex, setItemIndex] = useState(null);
    const [itemsToDelete, setItemsToDelete] = useState([]);

    const showModal = (item) => {
        setIsModalOpen(true);
        setSelectedItem(item)
    };

    const handleOk = () => {
        setIsModalOpen(false);
        setSelectedItem(null)
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setSelectedItem(null)
    };

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        getTasks()
        getDoneTasks()
        getIdleTasks()
        getInProgressTasks()
    }, []);

    const getTasks = async () => {
        let url = `${process.env.DIGITALOCEAN}/tasks/create-task/`
        let data = await getAxios(url)
        setTasks(data)
    }

    const getDoneTasks = async () => {
        let url = `${process.env.DIGITALOCEAN}/tasks/done-tasks/`
        let data = await getAxios(url)
        setDoneTasks(data)
    }

    const getIdleTasks = async () => {
        let url = `${process.env.DIGITALOCEAN}/tasks/idle-tasks/`
        let data = await getAxios(url)
        setIdleTasks(data)
    }

    const getInProgressTasks = async () => {
        let url = `${process.env.DIGITALOCEAN}/tasks/inprogress-tasks/`
        let data = await getAxios(url)
        setInProgressTasks(data)
    }

    useEffect(() => {
        dbRef.current = ref(database, 'notify');

        set(dbRef.current, false);

        onValue(dbRef.current, (snapshot) => {
            const data = snapshot.val();
            if (data === true) {
                getTasks()
                getDoneTasks()
                getIdleTasks()
                getInProgressTasks()
                set(dbRef.current, false)
                if (notifyData?.assignee == userId) {
                    console.log('Notify team')
                    alert(`A new task has been assigned to you. \n Task Name: ${notifyData?.taskName}`)
                }
                setSelectedItem(null)
                // alert('Tasks updated!')
                // console.log('Notify is true. Do something!');
            }
        })

    }, []);

    const handleNotifyTeam = (assignee, taskName) => {
        setNotifyData({
            assignee: assignee,
            taskName: taskName
        })
        set(dbRef.current, true)

    };

    const handleDragStart = (event, item, index) => {
        setItemIndex(index)
        // event.target.style.opacity = '0.5';
        // console.log(event, "EVENT", item, "item")
        event.dataTransfer.setData('text/plain', JSON.stringify(item));
        setShowDelete(true)
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        event.target.style.opacity = '1';
        console.log({ "dragOver": event })
    };

    const handleDrop = async (event, destinationTable) => {
        event.preventDefault();
        const item = JSON.parse(event.dataTransfer.getData('text/plain'));
        const refTable = {
            "toDo": tasks,
            "completed": doneTasks,
            "idle": idleTasks,
            "inProgress": inProgressTasks
        }
        const oldRef = {
            "To Do": tasks,
            "Completed": doneTasks,
            "Idle": idleTasks,
            "In Progress": inProgressTasks
        }
        oldRef[item?.taskStatus].splice(itemIndex, 1)
        setItemIndex(null)

        console.log({ "handleDrop": { "item": item, "destinationTable": destinationTable } })
        refTable[destinationTable] ? refTable[destinationTable].push(item) : ""

        if (destinationTable == "delete") {
            const delURL = `${process.env.DIGITALOCEAN}/tasks/create-task/${item.id}/`
            await deleteAxios(delURL)
            handleNotifyTeam(item.assignee, `The Task ${item?.taskName} was Deleted`)
        }
        setShowDelete(false)

        if (destinationTable !== "delete" && destinationTable !== item?.taskStatus) {
            const updateURL = `${process.env.DIGITALOCEAN}/tasks/create-task/${item.id}/`
            const data = {
                "taskStatus": destinationTable == "toDo" ? "To Do" : destinationTable == "idle" ? "Idle" : destinationTable == "completed" ? "Completed" : destinationTable == "inProgress" ? "In Progress" : item?.taskStatus
            }
            await patchAxios(updateURL, data)
            handleNotifyTeam(item.assignee, `The Task ${item?.taskName} was moved to On Going`)
        }

    }

    const handleMultipleDelete = async () => {
        console.log({ "itemsToDelete": itemsToDelete })
        const delURL = `${process.env.DIGITALOCEAN}/tasks/multiple-delete/`
        await postAxios(delURL, itemsToDelete)
        setItemsToDelete([])
        handleNotifyTeam("", "")
    }


    return (
        <>
            {itemsToDelete.length > 0 && <div className='absolute  top-0 text-center left-0 w-[100%] h-14 flex  items-center justify-around bg-gray-500 !z-[10000000000000]'>
                <div className='flex gap-x-2 items-center'>
                    <div className='w-4 h-4 rounded-full bg-blue-600 border-[3.5px] border-white'></div>
                    <p className="text-white">{itemsToDelete.length} selected tasks</p>
                </div>
                <div onClick={handleMultipleDelete} className='flex gap-x-2 justify-center items-center text-white hover:cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                    </svg>
                </div>
            </div>}
            <div>
                <h1 className='text-2xl font-bold text-maincl mb-3'>Company Tasks</h1>
                <div className='flex  justify-end mb-3'>
                    <button onClick={() => showDrawer()} className='flex gap-x-2 bg-sidebarbg hover:bg-foreignBackground hover:text-white rounded py-[0.4rem] px-3 mb-3'><PlusOutlined className=' pt-1' />Add Task</button>
                </div>
                <TasksTable itemsToDelete={itemsToDelete} setItemsToDelete={setItemsToDelete} showModal={showModal} id="toDo" handleDragOver={handleDragOver} handleDrop={handleDrop} handleDragStart={handleDragStart} bgColor={"bg-slate-700"} tableType={"To Do"} data={tasks} />
                <TasksTable itemsToDelete={itemsToDelete} setItemsToDelete={setItemsToDelete} showModal={showModal} id="inProgress" handleDragOver={handleDragOver} handleDrop={handleDrop} handleDragStart={handleDragStart} bgColor={"bg-blue-700"} tableType={"In Progress"} marginTop={"mt-10"} data={inProgressTasks} />
                <TasksTable itemsToDelete={itemsToDelete} setItemsToDelete={setItemsToDelete} showModal={showModal} id="completed" handleDragOver={handleDragOver} handleDrop={handleDrop} handleDragStart={handleDragStart} bgColor={"bg-green-700"} tableType={"Completed"} marginTop={"mt-10"} data={doneTasks} />
                <TasksTable itemsToDelete={itemsToDelete} setItemsToDelete={setItemsToDelete} showModal={showModal} id="idle" handleDragOver={handleDragOver} handleDrop={handleDrop} handleDragStart={handleDragStart} paddingBottom={"mb-20"} bgColor={"bg-purple-700"} tableType={"Idle"} marginTop={"mt-10"} data={idleTasks} />
                {
                    inProgressTasks.length == 0 && tasks.length == 0 && doneTasks.length == 0 && idleTasks.length == 0 && 
                    <div className='flex flex-col justify-center items-center'>
                            <NoTableData />
                    </div>
                }
                {showDelete && <div title="Drop to delete!" onDrop={(event) => handleDrop(event, "delete")} onDragOver={(event) => handleDragOver(event)} className='animate-jump fixed bottom-2 left-[58%] -translate-x-1/2 w-[50%] p-4 border rounded-xl border-dashed border-red-600 bg-red-50 opacity-75'>
                    <div className='flex justify-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="red" class="w-10 h-10 animate-bounce">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </div>
                </div>}
            </div>
            <Drawer width="600" placement="right" title="Add New Task" onClose={onClose} open={open}>
                <TaskForm handleNotifyTeam={handleNotifyTeam} />
            </Drawer>
            {selectedItem && <Modal footer={null} title="Edit Task" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <TaskForm handleNotifyTeam={handleNotifyTeam} selectedItem={selectedItem} />
            </Modal>}
        </>
    );
};

export const getServerSideProps = async (ctx) => {
    let accessToken = ctx.req.cookies["AccessTokenSBS"]
    let userPermission = ctx.req.cookies["userPermission"]
    let userId = ctx.req.cookies["userId"]
    try {
        if (accessToken) {

        } else {
            return {
                redirect: {
                    destination: '/401',
                    permanent: false,
                }
            }
        }
    } catch (e) {
        console.log(e);
    }
    return { props: { accessToken, userPermission, userId } };
};