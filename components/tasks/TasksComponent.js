import React, { useEffect, useRef, useState } from "react";
import { ref, set, onValue } from "firebase/database";
import database from "@/components/firebaseNotify/Firebase";
import { DragDropContext } from "react-beautiful-dnd";
import { getAxios, postAxios } from "@/functions/ApiCalls";
import { PlusOutlined } from "@ant-design/icons";
import List from "./List";
import DrawerANTD from "../ANTD/DrawerANTD";
import TaskForm from "./NewTask";
import ModalANTD from "../ANTD/ModalANTD";

export default function TasksComponent({ companyTasks, initialData }) {
  const dbRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [allData, setAllData] = useState(companyTasks);
  const [data, setData] = useState(initialData);
  const [showTag, setShowTag] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className='flex justify-start gap-5 overflow-auto'>
          {data?.columnOrder?.map((value, key) => {
            let columns = data?.columns?.[value];
            let tasks = columns?.taskIds?.map((value) => data?.tasks?.[value]);
            return (
              <div className=' rounded-lg relative bg-gray-200 pl-4 pr-2  min-w-[250px] w-[300px] max-h-[85vh] mb-4 h-fit overflow-hidden'>
                <h2 className='text-lg font-bold py-2 sticky inset-0 bg-gray-200 text-black'>{columns?.title}</h2>
                <div className='custom-scroll max-h-[70vh] overflow-y-auto '>
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
                <div
                  className='pl-2 my-2 mb-3 py-2 sticky mr-2 rounded-lg bottom-0 left-0 text-sm bg-gray-200 hover:bg-gray-300 text-black hover:cursor-pointer flex justify-start items-center gap-x-1'
                  onClick={() => handleopenNewTask()}
                >
                  <PlusOutlined />
                  <p>Add new task</p>
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
