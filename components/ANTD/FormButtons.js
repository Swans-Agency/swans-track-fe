import { LoadingOutlined } from "@ant-design/icons";
import React from "react";

export default function FormButtons({ content, classNames, disable=false, isLoading=false }) {
  return (
    <>
   { !isLoading ? <button
      htmlType="submit"
      type="primary"
        className={`bg-foreignBackground dark:bg-[#282828]  hover:shadow-lg  hover:dark:shadow-[#1d1d1d] text-textButtons rounded-lg ${!classNames ? "py-[0.5rem]" : ""} px-4 ${classNames}`}
      disabled={disable}
    >
      {content}
    </button>:
        <div className='flex bg-gray-400 dark:bg-[#282828] gap-x-3 rounded-lg min-w-fit justify-center items-center  text-white py-[0.6rem] px-4'>
          <LoadingOutlined /> Loading
        </div>
    }
    
    </>
  );
}
