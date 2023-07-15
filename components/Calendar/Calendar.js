import React, { useEffect, useState } from "react";
import { startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import CalendarHeader from "./CalendarHeader";
import moment from "moment";
import { getAxios, postAxios } from "@/functions/ApiCalls";
import { useRouter } from "next/router";
import CardInfo from "./CardInfo";
import { NotificationLoading } from "@/functions/Notifications";

export default function Calendar({ isConnected }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [monthEvents, setMonthEvents] = useState({});
  const [authorizedNow, setAuthorizedNow] = useState(false);

  const router = useRouter();

  const currentMonth = eachDayOfInterval({
    start: startOfMonth(selectedDate),
    end: endOfMonth(selectedDate),
  });

  // Send request to get the events of the month, if returend url, then open it in a new tab.
  const handleGetEvents = async () => {
    console.log("A7AAAAA")
    let bodyData = {
      StartMonth: moment(moment(selectedDate).startOf("month") - 1).format("YYYY-MM-DD[T00:00:00Z]"),
      endMonth: moment(moment(selectedDate).endOf("month") + 1).format("YYYY-MM-DD[T00:00:00Z]"),
    };
    let url = `${process.env.DIGITALOCEAN}/tasks/authenticate-google/`;
    let res = await postAxios(url, bodyData, false, false, () => { });
    console.log({ res });
    if (res?.redirectUrl) {
      const newTab = window.open(res?.url, "_blank");
      newTab.focus();
    } else {
      setMonthEvents(res);
    }
  };

  // If the user has credentials file in the DB, then get the events.
  useEffect(() => {
    if (isConnected?.details) {
      handleGetEvents();
    }
  }, [isConnected, selectedDate, authorizedNow]);


  const handleAuthorize = async (url, bodyData) => {
    await postAxios(url, bodyData, false, false, () => { });
  };


  useEffect(() => {
    const { state, code } = router.query;
    if (!isConnected?.details && state && code) {
      let bodyData = {
        state: state,
        authorizationCode: code,
      };
      let url = `${process.env.DIGITALOCEAN}/tasks/exchange-code/`;
      handleAuthorize(url, bodyData);
      setAuthorizedNow(true);
    }
  }, []);

  const handleConnectGoogleCalendar = async () => {
    NotificationLoading();
    let url = `${process.env.DIGITALOCEAN}/tasks/authenticate-google/`;
    let redirectURI = await getAxios(url, false, false, () => { });
    if (redirectURI?.url) {
      const newTab = window.open(redirectURI.url, "_blank");
      newTab.focus();
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-light tracking-tight text-black">
        Calendar
      </h1>
      <CalendarHeader
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        isConnected={isConnected}
        handleConnectGoogleCalendar={handleConnectGoogleCalendar}
      />
      <div className="grid desktop:grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr] tablet:grid-cols-[1fr_1fr_1fr_1fr] phone:grid-cols-[1fr] gap-1">
        {currentMonth.map((date, index) => (
          <CardInfo
            key={index}
            date={date}
            monthEvents={monthEvents}
            isConnected={isConnected}
          />
        ))}
      </div>
    </div>
  );
}
