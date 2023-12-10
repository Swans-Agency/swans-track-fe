import React, { useEffect, useState } from "react";
import { startOfMonth, endOfMonth, eachDayOfInterval, set } from "date-fns";
import CalendarHeader from "./CalendarHeader";
import dayjs from "dayjs";
import { Select } from "antd";
import { timeZones } from "@/functions/GeneralFunctions";
import { Calendar } from 'antd';

export default function Calender({ data, setSelectedDay, dataTimeZone, setNewTimeZone, newTimeZone, setIsModalOpen }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [visibleLeft, setvisibleLeft] = useState("hidden");
  const [visibleRight, setvisibleRight] = useState("visible");
  const [daysWeek, setDaysWeek] = useState(["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"])
  const [clicked, setClicked] = useState({});
  

  const currentMonth = eachDayOfInterval({
    start: startOfMonth(selectedDate),
    end: endOfMonth(selectedDate),
  });

  const monthsAllowed = {
    "one month": new Date().getMonth() + 1,
    "this month": new Date().getMonth(),
    "three months": new Date().getMonth() + 2,
  };


  const Allow = () => {
    if (selectedDate.getMonth() === new Date().getMonth() && selectedDate.getFullYear() === new Date().getFullYear()) {
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
  }, [visibleLeft, visibleRight, monthsAllowed, selectedDate]);

  const handleClickDate = (date, key) => {
    setSelectedDay(dayjs(date)?.format("YYYY-MM-DD"))
    setIsModalOpen(true)
    setClicked({ key: key, clicked:true})
  }

  return (
    <div className="">
      <CalendarHeader
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        visibleLeft={visibleLeft}
        visibleRight={visibleRight}
      />

      <div className="mt-7 ">
        <div className="grid grid-cols-7 gap-3 text-center">
          {daysWeek?.map((date, index) => {
            return(
              <div >
                <p className="text-sm text-gray-400">{date}</p>
              </div>
            )
          })}
          {currentMonth?.map((date, index) => {
            if (index === 0) {
              const dayOfWeek = dayjs(date).day();
              const emptyDivs = Array.from({ length: dayOfWeek }, (_, i) => (
                <div key={i} className="w-[3rem] h-[3rem] m-auto">
                  <p></p>
                </div>
              ));
              return emptyDivs;
            }
          })}
          {currentMonth?.map((date, index) => {
            const DayName = dayjs(date)?.format("dddd");
            return (
              <div key={index} className="w-[3rem] h-[3rem] m-auto">
                <button
                  onClick={() => handleClickDate(date, index)}
                  className={`text-center w-full h-full rounded ${data?.weeklySchedule?.[DayName]?.check && !dayjs(date)?.isBefore(dayjs())
                    ? ` hover:bg-foreignBackground hover:dark:bg-[#1f1f1f] dark:text-white hover:text-white ${clicked?.key == index && clicked?.clicked ? "  bg-foreignBackground text-white dark:bg-[#1f1f1f]" : "bg-gray-100 "} dark:bg-[#282828] `
                    : "text-gray-600 "
                    }`
                  }
                  disabled={data?.weeklySchedule?.[DayName]?.check && !dayjs(date)?.isBefore(dayjs()) ? false : true}
                >
                  <p>{date?.getDate()}</p>
                </button>
              </div>
            );
          })}
        </div>
      </div>


      
      {dataTimeZone &&
        <div className="mt-[1.75rem] desktop:mb-0 phone:mb-10 pl-[0.4rem] dark:text-white">
          <div className="mb-1 flex gap-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
            </svg>
            <p>
              Time Zone
            </p>
          </div>
          <Select
            className="w-1/2"
            placeholder="Select a time zone"
            size="large"
            options={timeZones}
            showSearch
            defaultValue={dataTimeZone}
            onChange={(value) => {
              setNewTimeZone(value);
            }}
          />
        </div>
      }
    </div>
  );
}
