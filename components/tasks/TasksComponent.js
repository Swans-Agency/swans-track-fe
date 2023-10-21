import React, { useEffect, useRef, useState } from "react";
import { ref, set, onValue } from "firebase/database";
import database from "@/components/firebaseNotify/Firebase";
import { DragDropContext } from "react-beautiful-dnd";
import { getAxios, postAxios } from "@/functions/ApiCalls";
import List from "./List";
import DrawerANTD from "../ANTD/DrawerANTD";
import TaskForm from "./NewTask";
import ModalANTD from "../ANTD/ModalANTD";
import { Avatar } from 'antd';

export default function TasksComponent({ companyTasks, initialData }) {
  const dbRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [allData, setAllData] = useState(companyTasks);
  const [data, setData] = useState(initialData);
  const [showTag, setShowTag] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teamMembers, setTeamMembers] = useState([])

  const columnNames = {
    "To Do": "toDo",
    "In Progress": "inProgress",
    "Completed": "completed",
    "Idle": "idle",
  }

  let columns = {
    "toDo": {
      id: "toDo",
      title: "To do",
      taskIds: [],
    },
    "inProgress": {
      id: "inProgress",
      title: "In Progress",
      taskIds: [],
    },
    "completed": {
      id: "completed",
      title: "Completed",
      taskIds: [],
    },
    "idle": {
      id: "idle",
      title: "Idle",
      taskIds: [],
    },
  }

  const getAllEmployees = async () => {
    const url = `${process.env.DIGITALOCEAN}/account/list-employees-no-pagination/`;
    const employeeData = await getAxios(url);
    const arrData = employeeData?.map((item) => {
      return (
        item
      )
    })
    setTeamMembers(arrData);
  };

  useEffect(() => {
    getAllEmployees()
  }, [])

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    allData?.forEach((value) => {
      setData((data) => (
        {
          ...data,
          tasks: {
            ...data.tasks,
            [value.id]: {
              id: value.id,
              taskName: value.taskName,
              taskDescription: value.taskDescription,
              assignee: value.assignee,
              taskStatus: value.taskStatus,
              priority: value.priority,
              createdAt: value.createdAt,
              dueDate: value.dueDate,
              subTasks: value.subTasks,
            }
          }
        }
      ))
    })

    allData?.forEach((value) => {
      let status = columnNames[value.taskStatus]
      columns[status]?.taskIds?.push(value?.id)
    })

    setData((data) => ({
      ...data,
      columns: columns
    }))
  }, [allData]);

  const handleNotifyTeam = async () => {
    set(dbRef.current, true);
    setIsModalOpen(false);
    setOpen(false)
  };

  const getAllTasksNew = async () => {
    let newData = await getAxios(`${process.env.DIGITALOCEAN}/tasks/active-tasks/`, false, false, () => { })
    setAllData(newData)
  }

  useEffect(() => {
    dbRef.current = ref(database, "notify");
    set(dbRef.current, false);

    onValue(dbRef.current, (snapshot) => {
      const dataNot = snapshot.val();
      if (dataNot === true) {
        getAllTasksNew()
        set(dbRef.current, false)
        setSelectedItem(null)
      }
    })

  }, []);


  const handleDragEnd = (result) => {

    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }

    if (
      destination?.droppableId === source?.droppableId &&
      destination?.index === source?.index
    ) {
      return;
    }

    if (destination?.droppableId === source?.droppableId) {
      let ourColumn = data?.columns?.[source?.droppableId];
      let newTasksIds = Array.from(ourColumn?.taskIds);
      newTasksIds.splice(source?.index, 1);
      newTasksIds.splice(destination?.index, 0, draggableId);

      let newColumn = {
        ...ourColumn,
        taskIds: newTasksIds,
      }

      setData((data) => ({
        ...data,
        columns: {
          ...data?.columns,
          [newColumn?.id]: newColumn,
        }
      }))
      reorderList(result, "reorder-samelist/")
    } else {
      let sourceColumn = data?.columns?.[source?.droppableId];
      let newSourceTaskIds = Array.from(sourceColumn?.taskIds);
      newSourceTaskIds.splice(source?.index, 1);
      let newSourceColumn = {
        ...sourceColumn,
        taskIds: newSourceTaskIds,
      }
      let destinationColumn = data?.columns?.[destination?.droppableId];
      let newDestinationTaskIds = Array.from(destinationColumn?.taskIds);
      newDestinationTaskIds.splice(destination?.index, 0, draggableId);
      let newDestinationColumn = {
        ...destinationColumn,
        taskIds: newDestinationTaskIds,
      }

      setData((data) => ({
        ...data,
        columns: {
          ...data?.columns,
          [newSourceColumn?.id]: newSourceColumn,
          [newDestinationColumn?.id]: newDestinationColumn,
        }
      }))
      reorderList(result, "move-item/")
    }
  };

  const reorderList = async (result, url) => {
    await postAxios(`${process.env.DIGITALOCEAN}/tasks/${url}`, result, false, false, () => { })
    handleNotifyTeam()
  }

  const handleopenNewTask = () => {
    setSelectedItem(null)
    setOpen(true)
  }

  const handleOkModal = () => {
    setSelectedItem(null)
    setIsModalOpen(false)
  }

  const handleCancelModal = () => {
    setSelectedItem(null)
    setIsModalOpen(false)
  }

  const openModalUpdate = () => {
    setIsModalOpen(true)
  }

  return (
    <>
      <div className="flex justify-between gap-x-4 mb-3">
        {teamMembers &&
          <Avatar.Group
            maxCount={3}
            size="large"
            maxStyle={{
              color: 'white',
              backgroundColor: '#205295',
            }}
            >
            {teamMembers?.map((item) => {
              return (
                <Avatar
                  src={item?.userProfile?.pfp?.split("?")[0] || "https://xsgames.co/randomusers/avatar.php?g=pixel&key=1"}
                  className="w-10 h-10 rounded-full border-2"
                  style={{
                    border: "1px solid gray"
                  }}
                />
              )
            })}
          </Avatar.Group>
        }
        <button
          onClick={() => handleopenNewTask()}
          className="flex justify-center items-center gap-x-2 bg-mainBackground hover:bg-foreignBackground text-white rounded py-[0.6rem] px-3"
        >
          Add new task
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className='flex justify-start gap-5 overflow-auto'>
          {data?.columnOrder?.map((value, key) => {
            let columns = data?.columns?.[value];
            let tasks = columns?.taskIds?.map((value) => data?.tasks?.[value]);
            return (
              <div className='px-1 relative  min-w-[250px] w-[300px] max-h-[75vh] mb-4 h-fit overflow-hidden'>
                <div className={`text font-bold rounded text-center p-1 mb-2 sticky inset-0 `}>
                  <div className="flex justify-start items-center gap-x-2">
                    {columns?.title}
                    <div className="border rounded px-2  text-[0.75rem] bg-gray-50">
                      {tasks?.length}
                    </div>
                  </div>
                  <p className={`mt-1 w-full h-[0.1rem] bg-gray-500 `}></p>
                </div>

                <div className='custom-scroll max-h-[71vh] overflow-y-auto p-2'>
                  <List
                    key={key}
                    cards={tasks}
                    listId={value}
                    showTag={showTag}
                    setShowTag={setShowTag}
                    setSelectedItem={setSelectedItem}
                    setOpen={openModalUpdate}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </DragDropContext>
      <DrawerANTD
        title={"Add New Task"}
        onClose={onClose}
        open={open}
        children={<TaskForm handleNotifyTeam={handleNotifyTeam} />}
      />
      {selectedItem && <ModalANTD
        title={"Task Details"}
        footer={null}
        isModalOpen={isModalOpen}
        handleOk={handleOkModal}
        handleCancel={handleCancelModal}
        renderComponent={<TaskForm handleNotifyTeam={handleNotifyTeam} selectedItem={selectedItem} />}
      />}
    </>
  );
}
