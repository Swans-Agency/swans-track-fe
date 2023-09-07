import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

export default function HeroPhone() {
  const router = useRouter();
  return (
    <div className="px-3 flex flex-col items-center text-center w-[100%] tablet:px-10">
      <Image
        src="/logoNew.svg"
        width={110}
        height={110}
        className="opacity-100"
      />
      <h1 className="text-[2.4rem] my-[15px] font-light text-black">
        Create. Manage. Succeed Effortlessly
      </h1>
      <iframe
        title="SwanS Track Promo"

        src="https://www.youtube.com/embed/MIK4ZRDI3ok"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        width="100%"
        height="350"
        frameborder="0"
        allowfullscreen
      ></iframe>
      <p className="text-[1.25rem] tracking-[0.2rem] my-[15px] font-extralight text-black">
        Unleash your productivity with our{" "}
        <span className="font-bold">magic</span> powered{" "}
        <span className="font-bold">management</span> tools.
      </p>
      <a href="/login" class="relative inline-block w-full text-lg group">
        <span class="relative z-10 block px-5 py-[1rem] overflow-hidden font-medium leading-tight text-red-600 transition-colors duration-300 ease-out border-2 border-red-600 rounded-lg group-hover:text-white">
          <span class="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
          <span class="absolute left-0 w-full h-48  transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-red-600 group-hover:-rotate-180 ease"></span>
          <span class="relative">Join the Swans</span>
        </span>
        <span class="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-red-600 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
      </a>
      {/* <button
        className="py-3 px-8 text-[1.25rem] text-white hover:text-[#dc2626] hover:bg-white bg-[#dc2626] rounded-lg border border-[#dc2626] flex items-center gap-x-2"
        onClick={() => router.push("/login")}
      >
        Don't Click Here
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
          />
        </svg>
      </button> */}
    </div>
  );
}
