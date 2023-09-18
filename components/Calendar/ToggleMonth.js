import React from "react";
import { format } from "date-fns";

export default function ToggleMonth({ setSelectedDate, selectedDate, visibleRight = "visible", visibleLeft = "visible" }) {
  return (
    <div className="flex justify-between gap-x-2 items-center">
      <p className="text-lg items-start text-black  text-center justify-center ">
        {format(new Date(selectedDate), "MMMM yyyy")}
      </p>

      <div className="flex gap-x-1 items-center">
        <div
          className={`w-[2rem] text-black hover:text-white text-center hover:bg-foreignBackground hover:cursor-pointer rounded-full ${visibleLeft}`}
          onClick={() => {
            setSelectedDate(
              (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
            )
          }
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-full h-full p-1 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </div>
        <div
          className={`w-[2rem] text-black hover:text-white text-center hover:bg-foreignBackground hover:cursor-pointer rounded-full ${visibleRight}`}
          onClick={() => {
            setSelectedDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
          }
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-full h-full p-1 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
