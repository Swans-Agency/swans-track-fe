import React, { useEffect, useRef, useState } from "react";
import { ref, set, onValue } from "firebase/database";
import database from "@/components/firebaseNotify/Firebase";
import { DragDropContext } from "react-beautiful-dnd";
import { getAxios } from "@/functions/ApiCalls";
import { PlusOutlined } from "@ant-design/icons";
import List from "./List";

export default function TasksComponent() {
  const dbRef = useRef(null);
  const [tasks, setTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const [idleTasks, setIdleTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [notifyData, setNotifyData] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    getTasks();
    getDoneTasks();
    getIdleTasks();
    getInProgressTasks();
  }, []);

  const getTasks = async () => {
    let url = `${process.env.DIGITALOCEAN}/tasks/create-task/`;
    let data = await getAxios(url, false, false);
    setTasks(data);
  };

  const getDoneTasks = async () => {
    let url = `${process.env.DIGITALOCEAN}/tasks/done-tasks/`;
    let data = await getAxios(url, false, false);
    setDoneTasks(data);
  };

  const getIdleTasks = async () => {
    let url = `${process.env.DIGITALOCEAN}/tasks/idle-tasks/`;
    let data = await getAxios(url, false, false);
    setIdleTasks(data);
  };

  const getInProgressTasks = async () => {
    let url = `${process.env.DIGITALOCEAN}/tasks/inprogress-tasks/`;
    let data = await getAxios(url, false, false);
    setInProgressTasks(data);
  };

  const handleNotifyTeam = (assignee, taskName) => {
    setNotifyData({
      assignee: assignee,
      taskName: taskName,
    });
    set(dbRef.current, true);
  };

  useEffect(() => {
    dbRef.current = ref(database, "notify");

    set(dbRef.current, false);

    onValue(dbRef.current, (snapshot) => {
      const data = snapshot.val();
      if (data === true) {
        getTasks();
        getDoneTasks();
        getIdleTasks();
        getInProgressTasks();
        set(dbRef.current, false);
        setSelectedItem(null);
      }
    });
  }, []);

  const handleDragEnd = (result) => {
    // TODO: Implement logic to handle the dragged
  };
  const handleDragStart = (result) => {};

  const handleDragUpdate = (result) => {};

  const initialData = {
    tasks: {
      "task-1": { id: "task-1", content: "Take out the garbage" },
      "task-2": { id: "task-2", content: "Watch my favorite show" },
      "task-3": { id: "task-3", content: "Charge my phone" },
      "task-4": { id: "task-4", content: "Cook dinner" },
      "task-5": { id: "task-5", content: "Cook dinner1" },
      "task-6": { id: "task-6", content: "Cook dinner2" },
      "task-7": { id: "task-7", content: "Cook dinner3" },
      "task-8": { id: "task-8", content: "Cook dinner4" },
      "task-9": { id: "task-9", content: "Cook dinner5" },
      "task-10": { id: "task-10", content: "Cook dinner6" },
      "task-11": { id: "task-11", content: "Cook dinner7" },
      "task-12": { id: "task-12", content: "Cook dinner8" },
    },
    columns: {
      "column-1": {
        id: "column-1",
        title: "To do",
        taskIds: [
          "task-1",
          "task-2",
          "task-3",
          "task-4",
          "task-5",
          "task-6",
          "task-7",
          "task-8",
          "task-9",
          "task-10",
          "task-11",
        ],
      },
    },
    columnOrder: ["column-1"],
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex flex-wrap justify-start gap-5">
        {initialData.columnOrder.map((value, key) => {
          let columns = initialData?.columns?.[value];
          let tasks = columns?.taskIds?.map(
            (value) => initialData?.tasks?.[value]
          );
          return (
            <div className="rounded-xl bg-gray-200 px-4 py-3 min-w-[250px] w-[300px] max-h-[90vh] overflow-auto">
              <h2 className="text-lg font-bold border-b mb-2 border-gray-100 sticky inset-0 bg-gray-200">
                {columns.title}
              </h2>
              <List
                key={key}
                title={columns.title}
                cards={tasks}
                listId={value}
              />
              <div className="pl-2 mt-4 hover:text-gray-600 text-black hover:cursor-pointer flex justify-start items-center gap-x-1">
                <PlusOutlined /> Add new task
              </div>
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
}
