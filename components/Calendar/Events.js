import moment from "moment";
import React, { useState } from "react";
import { format } from "date-fns";
import EventModal from "./EventModal";

export default function Events({ date, monthEvents }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const showModal = (item) => {
    setSelectedItem(item);
    console.log(item);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <>
      {monthEvents?.hasOwnProperty(format(new Date(date), "yyyy-MM-dd")) &&
        monthEvents[format(new Date(date), "yyyy-MM-dd")]?.map((item) => {
          return (
            <div
              onClick={() => showModal(item)}
              className="font-light text-xs text-black  text-left px-2 m-0 hover:cursor-zoom-in "
            >
              <div className="flex gap-x-2 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="green"
                  className="w-3 h-3"
                >
                  <path
                    fill-rule="evenodd"
                    d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm8 1a1 1 0 100-2 1 1 0 000 2zm-3-1a1 1 0 11-2 0 1 1 0 012 0zm7 1a1 1 0 100-2 1 1 0 000 2z"
                    clip-rule="evenodd"
                  />
                </svg>
                <div>
                  <p>{item?.summary}</p>
                  <p className="text-[0.65rem] font-extralight text-black">
                    {moment(item?.start?.dateTime).format("HH:mm")} -{" "}
                    {moment(item?.end?.dateTime).format("HH:mm")}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      <EventModal
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        selectedItem={selectedItem}
      />
    </>
  );
}
