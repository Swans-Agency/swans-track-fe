import React from "react";
import { useRouter } from "next/router";
import SignupButton from "../NewLanding/SignupButton";

export default function Join() {
  const router = useRouter();
  return (
    <section className="pb-20 text-center">
      <h1 className="desktop:text-[3rem] phone:text-[2rem] font-black text-[#0191E7] text-center">
        Join for free
      </h1>
      <p className="text-center mt-10 text-[1.25rem] flex flex-wrap justify-center gap-2 desktop:w-auto phone:w-[90%] desktop:m-0 phone:m-auto phone:pt-5 text-white">
        No credit card needed, just sign up and enjoy
        your <span className="text-[#0191E7]">30 days free trial.</span>
      </p>
      <SignupButton text="Join for free" style="py-4 px-6 mt-4 hover:bg-[#282828] border border-[#282828] hover:text-white" />
    </section>
  );
}
