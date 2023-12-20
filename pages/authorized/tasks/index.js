import React, { useEffect, useState } from "react";
import { getAxiosServer } from "@/functions/ApiCalls";
import dynamic from "next/dynamic";
import Loading from "@/components/Loading/Loading";
const TasksComponent = dynamic(() => import("@/components/tasks/TasksComponent"), {
  loading: () => <Loading />,
});


export default function index({ companyTasks }) {
  const initialData = {
    tasks: {
    },
    columnOrder: ["To Do", "In Progress", "Completed", "Idle"],
  };

  let columnsObj = {
    "To Do": {
      id: "To Do",
      title: "Backlog",
      taskIds: [],
    },
    "In Progress": {
      id: "In Progress",
      title: "In Progress",
      taskIds: [],
    },
    "Completed": {
      id: "Completed",
      title: "Completed",
      taskIds: [],
    },
    "Idle": {
      id: "Idle",
      title: "Idle",
      taskIds: [],
    },
  }

  for (let i = 0; i < companyTasks?.length; i++) {
    companyTasks[i].start = new Date(companyTasks[i]?.start)
    companyTasks[i].end = new Date(companyTasks[i]?.end)
  }

  return (
    initialData && <TasksComponent companyTasks={companyTasks} initialData={initialData} columns={columnsObj} />
  );
}

export const getServerSideProps = async (ctx) => {
  let accessToken = ctx.req.cookies["AccessTokenSBS"];
  let userPermission = ctx.req.cookies["userPermission"];
  let userId = ctx.req.cookies["userId"];
  let companyTasks = [];
  try {
    if (accessToken) {
      companyTasks = await getAxiosServer(`${process.env.DIGITALOCEAN}/tasks/active-tasks/`, accessToken, false)

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
