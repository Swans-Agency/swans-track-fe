import React from "react";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
export default function InvoicesRatio({ title, main, percChange, icon }) {
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
      {main?.successRatio > 0 ? (
        <div className="grid rounded-lg bg-gray-100 hover:shadow-lg hover:shadow-gray-300 px-5 py-5">
          <div className="space-y-3">
            <h1 className="text-lg font-semibold">{title}</h1>
            <div className="flex items-center justify-start gap-x-1 text-lg text-gray-500">
              {icon}{" "}
              <p>
                {main?.invoices}/{main?.proposals}
              </p>
            </div>
            <div className="flex text-green-600">
              <span className="place-self-start">
                <CaretUpOutlined />
              </span>
              <p className="flex gap-1">
                {typeof formatNumber(percChange?.successRatio) != NaN
                  ? formatNumber(percChange?.successRatio)
                  : "-"}
                <p>%</p>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid rounded-lg bg-gray-100 hover:shadow-lg hover:shadow-gray-300 px-5 py-5">
          <div className="space-y-3">
            <h1 className="text-lg font-semibold">{title}</h1>
            <div className="flex items-center justify-start gap-x-1 text-lg text-gray-500">
              {icon}{" "}
              <p>
                {main?.invoices}/{main?.proposals}
              </p>
            </div>
            <div className="flex text-red-600">
              <span className="place-self-start">
                <CaretDownOutlined />
              </span>
              <p className="flex gap-1">
                {typeof formatNumber(percChange?.successRatio) != NaN
                  ? formatNumber(percChange?.successRatio)
                  : "-"}
                <p>%</p>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
