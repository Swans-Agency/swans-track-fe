import React from "react";
import TasksComponent from "@/components/tasks/TasksComponent";
import TasksHeader from "@/components/tasks/TasksHeader";
import { getAxiosServer } from "@/functions/ApiCalls";

export default function index({ companyTasks }) {
  const initialData = {
    tasks: {
    },
    columnOrder: ["toDo", "inProgress", "completed", "idle"],
  };
  return (
    <div className="">
      <TasksHeader />
      <TasksComponent companyTasks={companyTasks} initialData={initialData} />
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  let accessToken = ctx.req.cookies["AccessTokenSBS"];
  let userPermission = ctx.req.cookies["userPermission"];
  let userId = ctx.req.cookies["userId"];
  let companyTasks = [];
  let authorized = null;
  try {
    if (accessToken) {
      authorized = await getAxiosServer(
        `${process.env.DIGITALOCEAN}/validateToken/`,
        accessToken,
        false
      );
      companyTasks = await getAxiosServer(`${process.env.DIGITALOCEAN}/tasks/active-tasks/`, accessToken, false)
      if (authorized.status === 200) {
      } else {
        accessToken = null;
      }
    } else {
      return {
        redirect: {
          destination: "/401",
          permanent: false,
        },
      };
    }
  } catch (e) {
    console.log(e);
  }
  return { props: { accessToken, userPermission, userId, companyTasks } };
};
