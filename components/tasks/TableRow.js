import React, { useEffect, useState } from "react";
import moment from "moment";
import { Avatar, Modal } from "antd";
import { EditOutlined } from "@ant-design/icons";

export default function TableRow({
  index,
  handleDragStart,
  item,
  showModal,
  setItemsToDelete,
  itemsToDelete,
}) {
  const [showCheckBox, setShowCheckBox] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const colorTag = {
    "To Do": "border-l-slate-600",
    "In Progress": "border-l-blue-700",
    Idle: "border-l-purple-700",
    Completed: "border-l-green-700",
    Normal: "border-l-amber-500",
    Urgent: "border-l-red-500",
    Low: "border-l-green-500",
  };

  const textTag = {
    "To Do": "text-slate-600",
    "In Progress": "text-blue-700",
    Idle: "text-purple-700",
    Completed: "text-green-700",
    Normal: "text-amber-500",
    Urgent: "text-red-500",
    Low: "text-green-500",
  };

  const tags = {
    "To Do": "orange",
    "In Progress": "processing",
    Idle: "purple",
    Completed: "success",
    Normal: "bg-amber-500",
    Urgent: "bg-red-500",
    Low: "bg-green-500",
  };

  const bgColor = {
    Normal: "#f59e0b",
    Urgent: "#ef4444",
    Low: "#22c55e",
  };

  const handleShowModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleShowCheckBox = () => {
    setShowCheckBox(true);
  };

  const handleHideCheckBox = () => {
    if (!isChecked) {
      setShowCheckBox(false);
    }
  };

  const toggleCheckBox = (item) => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      setItemsToDelete([...itemsToDelete, item?.id]);
    }
    if (isChecked) {
      setItemsToDelete(itemsToDelete.filter((i) => i !== item?.id));
    }
  };

  useEffect(() => {
    if (itemsToDelete.length == 0) {
      setIsChecked(false);
      setShowCheckBox(false);
    }
  }, [itemsToDelete]);

  return (
    <>
      <tr
        key={index}
        draggable
        onDragStart={(event) => handleDragStart(event, item, index)}
        className={`relative border-l-4 ${
          colorTag[item?.taskStatus]
        } w-[70%] hover:bg-gray-50`}
        onMouseEnter={handleShowCheckBox}
        onMouseLeave={handleHideCheckBox}
      >
        <th
          scope="row"
          className="px-6 relative py-1 w-[60%] font-medium whitespace-nowrap text-left"
        >
          <p className="hover:cursor-move absolute top-1/2 -translate-y-1/2 left-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
              />
            </svg>
          </p>
          <div className="flex gap-x-2 items-center">
            {showCheckBox && (
              <div
                onClick={() => toggleCheckBox(item)}
                className={`w-4 h-4 border rounded-full  ${
                  isChecked
                    ? "bg-blue-600 border-gray-200 border-4"
                    : "bg-gray-200 border-gray-400 "
                } hover:cursor-pointer`}
              >
                {" "}
              </div>
            )}
            <p onClick={handleShowModal} className="w-full">
              {item?.taskName}
            </p>
          </div>
        </th>
        <td className="px-6 py-1 w-[9%]">
          {
            <Avatar
              title={item?.assignee?.name}
              src={item?.assignee?.pfp?.split("?")[0]}
            />
          }
        </td>
        <td className={`px-6 py-1 w-[9%]`}>
          {moment(item?.dueDate).calendar(null, {
            sameDay: "[Today]",
            nextDay: "[Tomorrow]",
            nextWeek: "dddd",
            lastDay: "[Yesterday]",
            lastWeek: "[Last] dddd",
            sameElse: "DD MMM",
          })}
        </td>
        <td className={`px-6 py-1 w-[2%] `}>
          <div
            className={`flex justify-center items-center ${
              textTag[item?.priority]
            }`}
            title={item?.priority}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={`${bgColor[item?.priority]}`}
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5"
              />
            </svg>
          </div>
        </td>
        <td className="px-6 py-1 w-[2%]">
          <EditOutlined
            key="edit"
            style={{ color: "#3b82f6" }}
            onClick={() => showModal(item)}
          />
        </td>
      </tr>
      {
        <Modal
          footer={null}
          title="Task Description"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div>
            <p>{item?.taskDescription}</p>
          </div>
        </Modal>
      }
    </>
  );
}
