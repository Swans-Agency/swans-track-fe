import React, { useEffect, useState } from "react";
import { deleteAxios, getAxios, getAxiosServer } from "@/functions/ApiCalls";
import dynamic from "next/dynamic";
import Loading from "@/components/Loading/Loading";
import { Calendar } from "antd";
import Events from "@/components/Calendar/Events";
import dayjs from "dayjs";
import ModalANTD from "@/components/ANTD/ModalANTD";
import EventModal from "@/components/Calendar/SwansCalendar/EventModal";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import NewCalendar from "@/components/NewCalendar/NewCalendar";
import CalendarHeader from "@/components/Calendar/CalendarHeader";
// const Calendar = dynamic(() => import("@/components/Calendar/Calendar"), {
//   loading: () => <Loading />,
// });

// export default function index({ isConnected }) {
//   useEffect(() => {
//     console.log("index")
//     console.log({ isConnected })
//   }, [isConnected])
//   return <Calendar isConnected={isConnected} />;
// }
export default function index() {
  const [calendarEvents, setCalendarEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    getEvents()
  }, [])

  useEffect(() => {
    console.log({ calendarEvents })
  }, [calendarEvents])



  const getEvents = async () => {
    const url = `${process.env.DIGITALOCEAN}/calendar/`
    let res = await getAxios(url)
    console.log({ res })
    setCalendarEvents(res)
  }

  const handleShowEvent = (event) => {
    setSelectedEvent(event)
    setIsModalOpen(true)
  }

  const handleClose = () => {
    setIsModalOpen(false)
    setSelectedEvent(null)
  }

  const handleDeleteEvent = async (id) => {
    let url = `${process.env.DIGITALOCEAN}/calendar/delete/${id}/`
    let res = await deleteAxios(url, true, true)
    handleClose()
    getEvents()
  }


  return (
    <>
      {/* <h1 className="text-3xl font-light tracking-tight text-black">
        Calendar
      </h1> */}

      <NewCalendar
        calendarEvents={calendarEvents}
        getEvents={getEvents}
      />
    </>
  )
}

export const getServerSideProps = async (ctx) => {
  let accessToken = ctx.req.cookies["AccessTokenSBS"];
  let userPermission = ctx.req.cookies["userPermission"];
  let isConnected = null;
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
    console.log({ e });
  }
  return { props: { accessToken, userPermission,  } };
};
