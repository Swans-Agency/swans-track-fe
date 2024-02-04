import React, { useEffect, useRef, useState } from "react";
import { getAxiosServer, getAxios } from "@/functions/ApiCalls";
import dynamic from "next/dynamic";
import Loading from "@/components/Loading/Loading";
const TasksComponent = dynamic(() => import("@/components/tasks/TasksComponent"), {
  loading: () => <Loading />,
});


export default function index() {
  const [companyTasks, setCompanyTasks] = useState(null)
  const [initialData, setInitialData] = useState(null)
  const [columns, setColumns] = useState(null)

  useEffect(() => {
    getTasks()
  }, [])

  useEffect(() => {
    getColumns()
  }, [companyTasks]);

  const getColumns = async () => {
    let url = `${process.env.DIGITALOCEAN}/tasks/tasks-columns/`
    let data = await getAxios(url, false, false, () => { }, false)
    let columnsOrder = data?.map((item) => item?.columnName)
    setInitialData({
      tasks: {},
      columnOrder: columnsOrder
    })

    let columnObj = {}
    let dataLoop = data?.forEach((item) => {
      return (
        columnObj[item?.columnName] = {
          id: item?.columnName,
          title: item?.columnName,
          taskIds: []
        }
      )
    })
    setColumns(columnObj)
  }

  const getTasks = async () => {
    let url = `${process.env.DIGITALOCEAN}/tasks/active-tasks/`
    let tasks = await getAxios(url, false, false, () => { }, false)
    setCompanyTasks(tasks)
  }


  for (let i = 0; i < companyTasks?.length; i++) {
    companyTasks[i].start = new Date(companyTasks[i]?.start)
    companyTasks[i].end = new Date(companyTasks[i]?.end)
  }

  return (
    initialData && columns && <TasksComponent companyTasks={companyTasks} initialData={initialData} columns={columns} />
  );
}

export const getServerSideProps = async (ctx) => {
  let accessToken = ctx.req.cookies["AccessTokenSBS"];
  let userPermission = ctx.req.cookies["userPermission"];
  let userId = ctx.req.cookies["userId"];
  let companyTasks = [];
  try {
    if (accessToken) {

    } else {
      return {
        redirect: {
          destination: "/401",
          permanent: false,
        },
      };
    }
  } catch (e) {
    ;
  }
  return { props: { accessToken, userPermission, userId, companyTasks } };
};
