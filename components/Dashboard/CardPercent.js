import React from "react";
import { RiseOutlined, FallOutlined } from "@ant-design/icons";
export default function CardPercent({ title, main, percent, icon }) {
  const formatNumber = (number) => {
    if (number >= 1000 && number < 1000000) {
      return (number / 1000).toFixed(1) + "k";
    } else if (number >= 1000000) {
      return (number / 1000000).toFixed(1) + "m";
    }
    return number?.toString();
  };

  return (
    <div>
      {main > 0 ? (
        <div className="grid rounded-lg bg-gray-100 hover:shadow-lg hover:shadow-gray-300 px-5 py-5">
          <div className="space-y-3">
            <h1 className="text-lg font-semibold">{title}</h1>
            <div className="flex items-center justify-start gap-x-1 text-lg text-gray-500">
              {icon}
            </div>
            <div className="flex text-green-600 items-center justify-start gap-x-1 font-semibold">
              <RiseOutlined style={{ fontSize: "1.3rem" }} />
              <div className="flex gap-x-1">
                {typeof formatNumber(percent) != NaN
                  ? formatNumber(percent)
                  : "-"}
                <p>%</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid rounded-lg bg-gray-100 hover:shadow-lg hover:shadow-gray-300 px-5 py-5">
          <div className="space-y-3">
            <h1 className="text-lg font-semibold">{title}</h1>
            <div className="flex items-center justify-start gap-x-1 text-lg text-gray-500">
              {icon}
            </div>
            <div className="flex text-red-600 items-center justify-start gap-x-1 font-semibold">
              <FallOutlined style={{ fontSize: "1.3rem" }} />
              <div className="flex gap-x-1">
                {typeof formatNumber(percent * -1) != NaN
                  ? formatNumber(percent)
                  : "-"}
                <p>%</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
