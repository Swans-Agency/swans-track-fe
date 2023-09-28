import Image from "next/image";
import React from "react";

export default function ServicesButtonStyle({ img, text }) {
  return (
    <button className="text-[#0191E7] text-[1.563rem] cursor-default border border-[#0191E7] px-6 py-2 rounded-xl text-center flex justify-center gap-4">
      <Image src={img} width={20} height={20} className="self-center" />
      <span className="self-center">{text}</span>
    </button>
  );
}
