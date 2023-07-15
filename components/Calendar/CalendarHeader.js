import React from "react";
import { NotificationLoading } from "@/functions/Notifications";
import { getAxios } from "@/functions/ApiCalls";
import ConnectGoogleCalendar from "./ConnectGoogleCalendar";
import ToggleMonth from "./ToggleMonth";

export default function CalendarHeader({
  selectedDate,
  setSelectedDate,
  isConnected,
  handleConnectGoogleCalendar
}) {

  return (
    <div className="flex justify-between items-center mb-4">
      <ToggleMonth
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <ConnectGoogleCalendar
        isConnected={isConnected}
        handleConnectGoogleCalendar={handleConnectGoogleCalendar}
      />
    </div>
  );
}
