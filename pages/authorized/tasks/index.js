import React from "react";
import TasksComponent from "@/components/tasks/TasksComponent";
import { getAxiosServer } from "@/functions/ApiCalls";

export default function index({ companyTasks }) {
  const initialData = {
    tasks: {
    },
    columnOrder: ["toDo", "inProgress", "completed", "idle"],
  };

  for (let i = 0; i < companyTasks?.length; i++) {
    companyTasks[i].start = new Date(companyTasks[i]?.start)
    companyTasks[i].end = new Date(companyTasks[i]?.end)
  }

  ;
  return (
    <TasksComponent companyTasks={companyTasks} initialData={initialData} />
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
