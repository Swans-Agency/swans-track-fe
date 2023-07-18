import React from "react";
import { RiseOutlined, FallOutlined } from "@ant-design/icons";
export default function CardPercent({
  title,
  main,
  percent,
  icon,
  color,
  number,
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
    <div>
      {main > 0 ? (
         <div className="grid rounded-lg bg-gray-100 hover:shadow-lg hover:shadow-gray-300 px-5 py-5">
         <div className="space-y-1">
           <div className="grid justify-items-stretch">
             <div
               className={`${color} p-2 rounded-2xl w-12 justify-self-center`}
             >
               {icon}
             </div>
           </div>
           <h1 className="text-lg font-light text-center">{title}</h1>
           <h1 className="font-thin tracking-tight text-2xl text-center">
             {number}
           </h1>
           <div className="flex items-center justify-center gap-x-1 text-lg text-gray-500"></div>
           <div className="flex text-green-600 items-center justify-center gap-x-1 font-semibold">
             <RiseOutlined style={{ fontSize: "1.3rem" }} />
             <div className="flex gap-x-1">
               +{typeof formatNumber(percent * -1) != NaN
                 ? formatNumber(percent)
                 : "-"}
               <p>%</p>
             </div>
           </div>
           <h1 className="tracking-tight text-black text-center">
             as from the beginning of the month
           </h1>
         </div>
       </div>
      ) : (
    

        <div className="grid rounded-lg bg-gray-100 hover:shadow-lg hover:shadow-gray-300 px-5 py-5">
          <div className="space-y-1">
            <div className="grid justify-items-stretch">
              <div
                className={`${color} p-2 rounded-2xl w-12 justify-self-center`}
              >
                {icon}
              </div>
            </div>
            <h1 className="text-lg font-light text-center">{title}</h1>
            <h1 className="font-thin tracking-tight text-2xl text-center">
              {number}
            </h1>
            <div className="flex items-center justify-center gap-x-1 text-lg text-gray-500"></div>
            <div className="flex text-red-600 items-center justify-center gap-x-1 font-semibold">
              <FallOutlined style={{ fontSize: "1.3rem" }} />
              <div className="flex gap-x-1">
                {typeof formatNumber(percent * -1) != NaN
                  ? formatNumber(percent)
                  : "-"}
                <p>%</p>
              </div>
            </div>
            <h1 className="tracking-tight text-black text-center">
              as from the beginning of the month
            </h1>
          </div>
        </div>
      )}
    </div>
  );
}
