import React, { useEffect, useState } from "react";
import { deleteAxios, getAxios } from "@/functions/ApiCalls";
import dynamic from "next/dynamic";
import Loading from "@/components/Loading/Loading";
const NewCalendar = dynamic(() => import("@/components/NewCalendar/NewCalendar"), {
  loading: () => <Loading />,
});

export default function index() {
  const [calendarEvents, setCalendarEvents] = useState([])

  useEffect(() => {
    getEvents()
  }, [])

  const getEvents = async () => {
    const url = `${process.env.DIGITALOCEAN}/calendar/`
    let res = await getAxios(url)

    setCalendarEvents(res)
  }

  return (
    <NewCalendar
      calendarEvents={calendarEvents}
      getEvents={getEvents}
    />
  )
}

export const getServerSideProps = async (ctx) => {
  let accessToken = ctx.req.cookies["AccessTokenSBS"];
  let userPermission = ctx.req.cookies["userPermission"];
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
  return { props: { accessToken, userPermission, } };
};
