import React from "react";
import { Card } from "antd";

export default function Quote({ quotes }) {
  return (
    <Card
      bordered={false}
      hoverable={false}
      className="grid rounded-2xl col-span-3 items-center text-center bg-gray-200 dark:text-white dark:bg-[#282828] relative text-black   "
    >
      <div className="w-[100%] py-4 px-3 ">
        <svg
          aria-hidden="true"
          class="w-12 h-12 mx-auto mb-0 "
          viewBox="0 0 24 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
            fill="currentColor"
          />
        </svg>
        <p className="mt-0 italic">{quotes?.quote}</p>
        <p className="font-bold italic">- {quotes?.author} -</p>
      </div>
    </Card>
  );
}
