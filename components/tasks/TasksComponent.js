import React, { useEffect, useRef, useState, memo } from "react";
import { ref, set, onValue } from "firebase/database";
import database from "@/components/firebaseNotify/Firebase";
import { DragDropContext } from "react-beautiful-dnd";
import { getAxios, postAxios } from "@/functions/ApiCalls";
import List from "./List";
import DrawerANTD from "../ANTD/DrawerANTD";
import TaskForm from "./NewTask";
import ModalANTD from "../ANTD/ModalANTD";
import { Avatar, Input, Segmented } from 'antd';
import { Gantt } from 'gantt-task-react';
import "gantt-task-react/dist/index.css";
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import ManageColumns from "@/components/tasks/ManageColumns"
import cookie from "react-cookies";
import Loading from "../Loading/Loading";
import ListHeader from "./ListHeader";


export default function TasksComponent({ companyTasks, initialData, columns, projectId = null }) {
  const dbRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [allData, setAllData] = useState(companyTasks);
  const [ganttData, setGanttData] = useState([]);
  const [data, setData] = useState(initialData);
  const [showTag, setShowTag] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teamMembers, setTeamMembers] = useState([])
  const [search, setSearch] = useState("")
  const [message, setMessage] = useState(null)
  const [dontShowSwitch, setDontShowSwitch] = useState(false)
  const [openColumns, setOpenColumns] = useState(false)
  const [selectedValue, setSelectedValue] = useState('Board'); // Set 'Board' as the default value
  const router = useRouter()
  // const [columns, setColumns] = useState(columnsObj)
  // let columns = {
  //   "To Do": {
  //     id: "To Do",
  //     title: "Backlog",
  //     taskIds: [],
  //   },
  //   "In Progress": {
  //     id: "In Progress",
  //     title: "In Progress",
  //     taskIds: [],
  //   },
  //   "Completed": {
  //     id: "Completed",
  //     title: "Completed",
  //     taskIds: [],
  //   },
  //   "Idle": {
  //     id: "Idle",
  //     title: "Idle",
  //     taskIds: [],
  //   },
  // }

  useEffect(() => {
    getAllEmployees();
  }, []);

  useEffect(() => {
    if (search.length >= 3 || search.length === 0) {
      getAllTasksNew(projectId);
    }
  }, [search]);


  useEffect(() => {
    if (allData?.length > 0) {

      // setData(null)
      let newData = {};

      allData?.forEach((value) => {
        newData[value.id] = {
          id: value?.id,
          taskName: value?.taskName,
          taskDescription: value?.taskDescription,
          assignee: value?.assignee,
          taskStatus: value?.taskStatus,
          priority: value?.priority,
          createdAt: value?.createdAt,
          dueDate: value?.dueDate,
          subTasks: value?.subTasks,
          history: value?.history,
          comments: value?.comments,
          startDate: value?.startDate,
        };
      });

      // setData((data) => ({
      //   ...data,
      //   tasks: newData
      // }));

      // data.tasks = newData
      console.log({ newData })
      console.log({ data })
      setData((prevState) => ({
        ...prevState,
        tasks: newData
      }));



      let filterGant = allData?.filter((task) => {
        return task.startDate && task.dueDate
      })
      if (filterGant?.length > 0) {
        setDontShowSwitch(false)
        setGanttData(filterGant)
      } else {
        setDontShowSwitch(true)
      }

      Object.keys(columns).forEach((key) => {
        columns[key].taskIds = [];
      });

      allData?.forEach((value) => {
        let status = value.taskStatus;
        if (!columns[status]?.taskIds?.includes(value.id)) {
          columns[status]?.taskIds?.push(value.id);
        }
      });

      setData((data) => ({
        ...data,
        columns: columns
      }))
    }
  }, [allData]);

  const onClose = () => {
    setOpen(false);
  };

  const getAllEmployees = async () => {
    const url = `${process.env.DIGITALOCEAN}/account/list-employees-no-pagination/`;
    let pathname = router.pathname.startsWith("/invited-project") ? true : false
    const employeeData = await getAxios(url, false, false, () => { }, pathname);
    const arrData = employeeData?.map((item) => {
      return (
        item
      )
    })
    setTeamMembers(arrData);
  };

  const handleNotifyTeam = async (message) => {
    // set(dbRef.current, true);
    setIsModalOpen(false);
    setOpen(false)
    setMessage(message)

  };

  const getAllTasksNew = async (projectId) => {
    let newData = []
    let pathname = router.pathname.startsWith("/invited-project") ? true : false

    if (projectId) {
      newData = await getAxios(`${process.env.DIGITALOCEAN}/tasks/active-tasks/?search=${search}&project=${projectId}`, false, false, () => { }, pathname)
    } else {
      newData = await getAxios(`${process.env.DIGITALOCEAN}/tasks/active-tasks/?search=${search}`, false, false, () => { }, pathname)
    }
    for (let i = 0; i < newData?.length; i++) {
      newData[i].start = new Date(newData[i]?.start)
      newData[i].end = new Date(newData[i]?.end)
    }

    setAllData(newData)
  }

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
      newTasksIds?.splice(source?.index, 1);
      newTasksIds?.splice(destination?.index, 0, draggableId);

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
    let pathname = router.pathname.startsWith("/invited-project") ? true : false
    await postAxios(`${process.env.DIGITALOCEAN}/tasks/${url}`, result, false, false, () => { }, false, "", pathname)
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

  const handleSegmentChange = (value) => {
    setSelectedValue(value);

  };

  const handleCloseColumns = async () => {
    setOpenColumns(false)
  }

  return (
    <>
      <div className="flex flex-grow justify-between gap-x-4 mb-3">
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
        <div className="flex justify-end items-center gap-x-2 w-full">

          {projectId && !dontShowSwitch && <Segmented
            size="large"
            options={[
              {
                value: 'Board',
                icon: <AppstoreOutlined />,
              },
              {
                value: 'Gantt',
                icon: <BarsOutlined />,

              },
            ]}
            defaultValue={selectedValue}
            onChange={handleSegmentChange}
          />}
          {/* <Input size="large" className="max-w-[450px]" placeholder="Search by assignee or task name" onChange={(e) => setSearch(e.target.value)} /> */}
          <button
            onClick={() => handleopenNewTask()}
            className="flex justify-center items-center gap-x-2 bg-mainBackground dark:bg-[#282828]  text-white rounded py-[0.5rem] px-3"
          >
            Add new task
          </button>
          {(cookie.load("userPermission", { path: "/" }) !== "Employee") && !router.pathname.startsWith("/invited-project") && <button
            onClick={() => setOpenColumns(true)}
            className="flex justify-center items-center gap-x-2 bg-mainBackground dark:bg-[#282828]  text-white rounded py-[0.5rem] px-3"
          >
            Manage columns
          </button>}
        </div>
      </div>


      {selectedValue == "Gantt" && allData.length ?
        <div className="mt-6 overflow-x-auto">
          <Gantt
            tasks={ganttData}
            onClick={task => { setSelectedItem(task); setIsModalOpen(true) }}
            preStepsCount={1}
            columnWidth={100}
            viewMode={"Day"}
            barBackgroundColor="#282828"
            barBackgroundSelectedColor="#1d1d1d"
            todayColor="#00a2ff18"
            type="task" />
        </div>
        :
        <div>
          {data && allData ? <DragDropContext onDragEnd={handleDragEnd}>
            <div className='flex justify-start gap-5 overflow-auto'>
              {initialData?.columnOrder?.map((value, key) => {
                let columns = data?.columns?.[value];
                let tasks = columns?.taskIds?.map((value) => data?.tasks?.[value]);
                return (
                  <div className='px-2 relative  min-w-[300px] w-[300px]  mb-4 max-h-full h-fit overflow-hidden bg-gray-50 dark:bg-[#282828] dark:text-white rounded-xl pt-2'>
                    <ListHeader columns={columns} tasks={tasks} />
                    <div className='custom-scroll max-h-[65vh] overflow-y-auto p-2'>
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
                    <div className="!h-5"></div>
                  </div>
                );
              })}
            </div>
          </DragDropContext> : <Loading />}
        </div>
      }






      <DrawerANTD
        title={"Add New Task"}
        onClose={onClose}
        open={open}
        children={<TaskForm handleNotifyTeam={handleNotifyTeam} getAllTasksNew={getAllTasksNew} projectId={projectId} />}
      />

      <DrawerANTD
        title={"Manage columns"}
        onClose={handleCloseColumns}
        open={openColumns}
        children={<ManageColumns handleNotifyTeam={handleNotifyTeam} columnsObj={columns} />}
      />

      {selectedItem && <ModalANTD
        title={"Task Details"}
        footer={null}
        isModalOpen={isModalOpen}
        handleOk={handleOkModal}
        handleCancel={handleCancelModal}
        renderComponent={<TaskForm handleNotifyTeam={handleNotifyTeam} selectedItem={selectedItem} projectId={projectId} getAllTasksNew={getAllTasksNew} />}
        customWidth={true}
        width={1000}
      />}
    </>
  );
}
