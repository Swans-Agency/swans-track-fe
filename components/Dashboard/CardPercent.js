import React from "react";
import { RiseOutlined, FallOutlined } from "@ant-design/icons";
export default function CardPercent({
  title,
  main,
  percent,
  icon,
  color,
  number,
  classes
}) {
  const formatNumber = (number) => {
    if (Math.abs(number) >= 1000 && Math.abs(number) < 1000000) {
      return (number / 1000).toFixed(1) + "k";
    } else if (Math.abs(number) >= 1000000) {
      return (number / 1000000).toFixed(1) + "m";
    }
    return number?.toString();
  };

  return (
    <div className="grid laptop:col-span-1 phone:col-span-3 text-black">
      <div className={`rounded-2xl p-5 relative ${classes}`}>
        <img className="!z-0 absolute top-0 right-0 h-[100%]" src={"https://demo.bootstrapdash.com/purple-admin-free/assets/images/dashboard/circle.svg"} />
        <div className="space-y-1">
          <div className="flex justify-center w-full">
            <div
              className={`${color} p-2 rounded-2xl w-12 justify-self-center shadow-lg `}
            >
              {icon}
            </div>
          </div>
          <h1 className="text-lg font-light text-center ">{title}</h1>
          <h1 className="font-thin tracking-tight text-2xl text-center ">
            {number}
          </h1>
          <div className="flex  items-center justify-center gap-x-1 font-semibold">
            {main > 0 ? <RiseOutlined style={{ fontSize: "1.3rem", color: "green" }} /> : <FallOutlined style={{ fontSize: "1.3rem", color: "red" }} />}
            <div className={`flex gap-x-1 ${main > 0 ? "text-green-700" : "text-red-500"}`}>
              {typeof formatNumber(percent * -1) != NaN
                ? formatNumber(percent)
                : ""}
              <p>%</p>
            </div>
          </div> 
          <h1 className="tracking-tight  text-center !z-[1000]">
            as from the beginning of the month
          </h1>
        </div>
      </div>
    </div>
  );
}
