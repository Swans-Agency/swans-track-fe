import Image from "next/image";
import React from "react";

export default function SvgRight({ title, description, image, id }) {
  return (
    <div
      id={id}
      className=" flex-col-reverse desktop:w-[70%] phone:w-[90%] m-auto pt-20"
    >
      <div className=" ">
        <Image src={image} width={300} height={300} className="m-auto" />
      </div>
      <div className="self-center phone:text-center desktop:text-start phone:space-y-2">
        <h1 className="desktop:text-[2.188rem] phone:text-[1.5rem] text-[#0191E7] font-black mt-4">
          {title}
        </h1>
        <p className="text-[1.25rem] desktop:w-[80%]">{description}</p>
        <div className="desktop:flex justify-center phone:hidden">
          <Image src={"/Right.svg"} width={100} height={100} />
        </div>
      </div>
    </div>
  );
}
