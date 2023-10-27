import React from "react";
import { NotificationLoading } from "@/functions/Notifications";
import { getAxios } from "@/functions/ApiCalls";
import ConnectGoogleCalendar from "./ConnectGoogleCalendar";
import ToggleMonth from "./ToggleMonth";

export default function CalendarHeader({
  selectedDate,
  setSelectedDate,
  isConnected,
  handleConnectGoogleCalendar,
  isHidden = false,
  createNew=false,
  setIsModalOpenNew =()=>{},
  setClickedDate =()=>{}
}) {

  return (
    <div className=" sticky top-6 left-0 mt-2 pb-2 bg-white  dark:text-white dark:bg-[#141414] ">
      <ToggleMonth
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        createNew={createNew}
        setIsModalOpenNew={setIsModalOpenNew}
        setClickedDate={setClickedDate}
        
      />
    </div>
  );
}
