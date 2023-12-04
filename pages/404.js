import { Result } from "antd";
import React from "react";
import { redirect } from "@/functions/GeneralFunctions";

export default function Custom404() {
  return (
    <Result
      status="404"
      title={<div className="text-white font-black text-[5rem]">404</div>}
      subTitle={
        <div className="text-white text-xl">
          Sorry, the page you visited does not exist.
        </div>
      }
      extra={
        <button
          className="dark:bg-[#282828] rounded-lg text-lg py-2 px-4 bg-foreignBackground hover:bg-sidebar text-textButtons"
          onClick={() => {
            redirect("/");
          }}
        >
          Back Home
        </button>
      }
    />
  );
}
