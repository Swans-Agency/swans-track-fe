import Image from "next/image";
import React from "react";

export default function SvgRight({ title, description, image,id }) {
  return (
    <div id={id} className="flex justify-between w-[70%] m-auto pt-20">
      <div className="self-center">
        <h1 className="text-[2.188rem] text-[#0191E7] font-black mt-4">
          {title}
        </h1>
        <p className="text-[1.25rem] w-[80%]">{description}</p>
      <div className="flex justify-center">
      <Image src={'/Right.svg'} width={100} height={100} />

  
      </div>
      </div>
      <div>
        <Image src={image} width={300} height={300} />
      </div>
    </div>
  );
}
