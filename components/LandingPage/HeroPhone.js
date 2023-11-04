import React from "react";
import { useRouter } from "next/router";
import SignupButton from "../NewLanding/SignupButton";

export default function HeroPhone() {
  const router = useRouter();
  return (
    <div className="px-3 flex flex-col justify-center items-center text-center h-[80vh] text-white ">
      <h1 className="laptop:text-[3.5rem] phone:text-[2rem] font-black text-white text-center">
        Create. Manage. Succeed Effortlessly
      </h1>
      <p className="text-white text-[1.563rem] laptop:block phone:hidden ">
        Simplify Freelance Project Management Effortlessly organize, track, and collaborate on your freelance projects.
      </p>
      <SignupButton text="Join for free" style="py-4 px-6 mt-4" />
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mt-10 animate-bounce">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75" />
      </svg>

    </div>
  );
}
