import React from "react";

export default function FormButtons({ content, disable=false }) {
  return (
    <button
      htmlType="submit"
      type="primary"
      className="bg-foreignBackground hover:bg-mainBackground text-textButtons rounded py-[0.4rem] px-3"
      disable={disable}
    >
      {content}
    </button>
  );
}
