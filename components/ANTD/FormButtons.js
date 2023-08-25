import React from "react";

export default function FormButtons({ content, classNames, disable=false }) {
  return (
    <button
      htmlType="submit"
      type="primary"
      className={`bg-foreignBackground hover:bg-mainBackground text-textButtons rounded ${!classNames ? "py-[0.4rem]" : ""} px-3 ${classNames}`}
      disable={disable}
    >
      {content}
    </button>
  );
}
