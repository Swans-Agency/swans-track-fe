import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

export default function Loading() {
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 100,
      }}
      spin
    />
  );
  return (
    <div className="w-full flex flex-col items-center justify-center align-middle mt-[15rem]">
      <h1 className="text-3xl font-light mb-4 text-white">
        Content Loading...
      </h1>
      <Spin indicator={antIcon} style={{ color: "white" }} />
    </div>
  );
}
