import React from "react";
import { Input } from "antd";
import Image from "next/image";
import Link from "next/link";

export default function Footer(props) {
  return (
    <section className="bg-gradient-to-b from-[#01417E] to-[#019DF7] py-10">
      <div className="w-[90%] m-auto desktop:flex desktop:flex-wrap desktop:justify-between phone:">
        <div className=" desktop:flex gap-24">

        <div className="self-center phone:flex phone:justify-center phone:mb-5">
          <Image src="/LogoWhite.svg" width={100} height={100} />
        </div>
        <div className="phone:flex justify-between gap-1 desktop:hidden phone:mb-10">
            <button className="text-white">Home</button>
            <button className="text-white">Features</button>
            <button className="text-white">Users</button>
            <button className="text-white">Sign up</button>
          </div>
        <div>
          <h1 className="text-white text-[1.375rem] phone:text-center desktop:text-start">Stay Connected</h1>
          <div className="desktop:flex gap-2 pt-2 phone:place-items-center phone:grid">
            <Input
              placeholder="Type your email"
              className="max-w-[356px] desktop:w-[356px] h-[48px] rounded-lg phone:items-center desktop:m-0"
            />
            <div className="flex justify-center phone:pt-3 desktop:pt-0">
            <button className="border w-[117px] h-[48px] rounded-lg bg-white text-[#0191E7] font-bold text-[1.125rem]">
              Submit
            </button>
            </div>
          </div>
        </div>
        </div>
        <div className="flex flex-col gap-10 pt-4 ">
          <div className="desktop:flex justify-between gap-10 phone:hidden">
            <button className="text-white">Home</button>
            <button className="text-white">Features</button>
            <button className="text-white">Users</button>
            <button className="text-white">Sign up</button>
          </div>
          <div className="flex flex-wrap phone:justify-center gap-3 text-white phone:text-center w-full">
            <p className="phone:text-center phone:block phone:w-[100%] desktop:w-fit">© 2023 Swanstrack Ltd</p>
            <span className="desktop:block phone:hidden">|</span>
            <Link href="/terms-conditions">Terms</Link>
            <span>|</span>
            <Link href="/swans-cookies">Cookies</Link>
            <span>|</span>
            <Link href="/swans-privacy-policy">Privacy</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
