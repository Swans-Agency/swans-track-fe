import Image from "next/image";
import React from "react";

export default function SvgLeft({ title, description, image, id }) {
  return (
    <div
      id={id}
      className="desktop:flex desktop:justify-between tablet:mx-auto phone: desktop:w-[70%] phone:w-[90%] m-auto pt-20"
    >
      <div>
        <Image src={image} width={300} height={300} className="m-auto" />
      </div>
      <div className="self-center desktop:text-right phone:text-center phone:space-y-2">
        <h1 className="desktop:text-[2.188rem] phone:text-[1.5rem] text-[#0191E7] font-black mt-4">
          {title}
        </h1>
        <div className="flex desktop:justify-end desktop:text-right phone:text-center">
          <p className="desktop:w-[80%] text-[1.25rem] desktop:m-0 phone:m-auto">
            {description}
          </p>
        </div>

        <div className="flex justify-center">
          <Image src={"/Left.svg"} width={100} height={100} />
        </div>
      </div>
    </div>
  );
}
