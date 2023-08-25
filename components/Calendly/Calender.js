import React, { useEffect, useState } from "react";
import { startOfMonth, endOfMonth, eachDayOfInterval, set } from "date-fns";
import CalendarHeader from "./CalendarHeader";
import dayjs from "dayjs";

export default function Calender({ data,setSelectedDay }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [visibleLeft, setvisibleLeft] = useState("hidden");
  const [visibleRight, setvisibleRight] = useState("visible");
  const currentMonth = eachDayOfInterval({
    start: startOfMonth(selectedDate),
    end: endOfMonth(selectedDate),
  });
  const monthsAllowed = {
    "one month": new Date().getMonth() + 1,
    "this month": new Date().getMonth(),
    "three months": new Date().getMonth() + 3,
  };
  const Allow = () => {
    if (selectedDate.getMonth() === new Date().getMonth()) {
      setvisibleLeft("hidden");
      setvisibleRight("visible");
    }

     if (
      selectedDate.getMonth() !== new Date().getMonth() &&
      selectedDate.getMonth() !== monthsAllowed[data?.dateRange]

    ) {
      setvisibleLeft("visible");
      setvisibleRight("visible");
    }

     if (monthsAllowed[data?.dateRange] === monthsAllowed["this month"]) {
      setvisibleLeft("hidden");
      setvisibleRight("hidden");
      return;
    }
    

     if (selectedDate.getMonth() === monthsAllowed[data?.dateRange]) {
      setvisibleLeft("visible");
      setvisibleRight("hidden");
      
    }
  };

  useEffect(() => {
    Allow();
    console.log(
      monthsAllowed[data?.dateRange],
      new Date().getMonth(),
      selectedDate.getMonth()
    );
  }, [visibleLeft, visibleRight, monthsAllowed,selectedDate]);
  return (
    <div className="space-y-10">
      <CalendarHeader
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        visibleLeft={visibleLeft}
        visibleRight={visibleRight}
      />

      <div className="calendar">
        <div className="grid desktop:grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr] tablet:grid-cols-[1fr_1fr_1fr_1fr] phone:grid-cols-[1fr] gap-4 text-center">
          {currentMonth?.map((date, index) => {
            const DayName = dayjs(date)?.format("dddd");
            return (
              <div key={index} className="w-16 h-16">
                <button
              onClick={()=>setSelectedDay(dayjs(date)?.format("YYYY-MM-DD"))}
              className={`border-2 text-center w-full h-full px-3 py-2  rounded-xl ${
                    data?.[DayName]?.available
                      ? "hover:text-blue-600 hover:border-blue-600 focus:text-blue-600 focus:border-blue-600 border-black"
                      : "border-gray-400 text-gray-400"
                  }`
              
                }
                  disabled={!data?.[DayName]?.available}
                >
                  <p>{dayjs(date)?.format("ddd")}</p>
                  <p>{date?.getDate()}</p>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
