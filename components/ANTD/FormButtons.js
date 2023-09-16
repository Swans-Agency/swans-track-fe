import React from "react";

export default function FormButtons({ content, classNames, disable=false }) {
  return (
    <button
      htmlType="submit"
      type="primary"
      className={`bg-foreignBackground hover:bg-mainBackground text-textButtons rounded ${!classNames ? "py-[0.5rem]" : ""} px-4 ${classNames}`}
      disable={disable}
    >
      {content}
    </button>
  );
}
