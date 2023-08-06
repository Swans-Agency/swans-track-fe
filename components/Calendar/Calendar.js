import React, { useEffect, useState } from "react";
import { startOfMonth, endOfMonth, eachDayOfInterval, set } from "date-fns";
import CalendarHeader from "./CalendarHeader";
import moment from "moment";
import { getAxios, postAxios } from "@/functions/ApiCalls";
import { useRouter } from "next/router";
import CardInfo from "./CardInfo";

export default function Calendar({ isConnected }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [monthEvents, setMonthEvents] = useState({});
  const [authorizedNow, setAuthorizedNow] = useState(false);

  const router = useRouter();

  const currentMonth = eachDayOfInterval({
    start: startOfMonth(selectedDate),
    end: endOfMonth(selectedDate),
  });

  
    const handleGoolgeAuthorize = async() => {
      let res = await getAxios(`${process.env.DIGITALOCEAN}/tasks/authenticate-google/`, true, false, () => { }, false);
      window.open(res?.redirectUrl, "_blank");
    }
  
    const handleGetEvents = async () => {
      let bodyData = {
        StartMonth: moment(moment(selectedDate).startOf("month") - 1).format("YYYY-MM-DD[T00:00:00Z]"),
        endMonth: moment(moment(selectedDate).endOf("month") + 1).format("YYYY-MM-DD[T00:00:00Z]"),
      };
      let url = `${process.env.DIGITALOCEAN}/tasks/authenticate-google/`;
      let res = await postAxios(url, bodyData, false, false, () => { }, false);
      console.log({ res });
      if (res?.redirectUrl) {
        console.log("reeeeeeeeeeeeeeees", { res })
        const newTab = window.open(res?.redirectUrl, "_blank");
        // newTab.focus();
      } else {
        setMonthEvents(res);
      }
    };

  const handleAuthorize = async (url, bodyData) => {
    await postAxios(url, bodyData, false, false, () => { }, false);
  };
  
  useEffect(() => {
    handleGetEvents();
  }, [selectedDate, isConnected, authorizedNow])

  useEffect(() => {
    const { state, code } = router.query;
    if (state && code) {
      let bodyData = {
        state: state,
        authorizationCode: code,
      };
      let url = `${process.env.DIGITALOCEAN}/tasks/exchange-code/`;
      handleAuthorize(url, bodyData);
      setAuthorizedNow(true);
      setTimeout(() => {
        router.reload();
        window.history.replaceState({}, document.title, window.location.pathname);
      } , 1000)
    }
  }, []);

  const handleConnectGoogleCalendar = async () => {
    let url = `${process.env.DIGITALOCEAN}/tasks/authenticate-google/`;
    let redirectURI = await getAxios(url, true, false, () => { });
    if (redirectURI?.redirectUrl) {
      const newTab = window.open(redirectURI.redirectUrl, "_blank");
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
