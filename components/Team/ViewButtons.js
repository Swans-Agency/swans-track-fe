import React from "react";
import { UserAddOutlined } from "@ant-design/icons";

export default function ViewButtons({ showModal }) {
  return (
    <div className="flex justify-end mb-3">
      <button
        onClick={showModal}
        className="flex gap-x-2 hover:bg-foreignBackground text-black hover:text-white rounded py-[0.4rem] px-3"
      >
        <UserAddOutlined className=" pt-1" />
        Add member
      </button>
    </div>
  );
}
