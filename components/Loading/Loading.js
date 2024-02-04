import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import Image from 'next/image'


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
      <h1 className="text-3xl font-light mb-10">
        <Image src="/logoNew.svg" width={100} height={100} />

      </h1>
      <div className="loader h-fit  "></div>
    </div>

  );
}
