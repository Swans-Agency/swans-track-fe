import React from "react";
import { UserAddOutlined } from "@ant-design/icons";

export default function ViewButtons({ showModal }) {
  return (
    <div className="flex justify-end mb-3">
      <button
        onClick={showModal}
        className="flex justify-center items-center gap-x-2 hover:bg-foreignBackground hover:text-white rounded py-[0.35rem] px-2"
      >
        <UserAddOutlined/>
        Add member
      </button>
    </div>
  );
}
