import React from "react";
import { useRouter } from "next/router";
import SignupButton from "../NewLanding/SignupButton";

export default function HeroPhone() {
  const router = useRouter();
  return (
    <div className="px-3 flex flex-col justify-center items-center text-center h-[90vh] text-white ">
      <h1 className="laptop:text-[3.5rem] phone:text-[2rem] font-black text-[#0191E7] text-center">
        Create. Manage. Succeed Effortlessly
      </h1>
      <p className="text-white text-[1.563rem] tablet:block phone:hidden ">
        Manage your projects, and client-based workflows.
      </p>
      <SignupButton text="Join for free" style="py-4 px-6 mt-4 hover:bg-[#282828] border border-[#282828] hover:text-white" />

      <svg className="mt-10 animate-bounce" width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 15C5 16.8565 5.73748 18.6371 7.05023 19.9498C8.36299 21.2626 10.1435 21.9999 12 21.9999C13.8565 21.9999 15.637 21.2626 16.9497 19.9498C18.2625 18.6371 19 16.8565 19 15V9C19 7.14348 18.2625 5.36305 16.9497 4.05029C15.637 2.73754 13.8565 2 12 2C10.1435 2 8.36299 2.73754 7.05023 4.05029C5.73748 5.36305 5 7.14348 5 9V15Z" stroke="#0191E7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M12 6V10" stroke="#0191E7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>

    </div>
  );
}
