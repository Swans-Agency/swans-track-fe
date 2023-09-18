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
}) {

  return (
    <div className=" sticky top-6 left-0 mt-2 pb-2 bg-white">
      <ToggleMonth
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      {/* <ConnectGoogleCalendar
        isConnected={isConnected}
        handleConnectGoogleCalendar={handleConnectGoogleCalendar}
        isHidden={isHidden}
      /> */}
    </div>
  );
}
