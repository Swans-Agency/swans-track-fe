import React from "react";
import { Input } from "antd";
import Image from "next/image";
import Link from "next/link";

export default function Footer(props) {
  return (
    <section className="bg-gradient-to-b from-[#01417E] to-[#019DF7] h-[25vh] grid">
      <div className="w-[80%] m-auto flex justify-between ">
        <div className="flex gap-24">

        <div className="self-center">
          <Image src="/logoNew.svg" width={100} height={100} />
        </div>
        <div>
          <h1 className="text-white text-[1.375rem]">Stay Connected</h1>
          <div className="space-x-2 pt-2">
            <Input
              placeholder="Type your email"
              className="w-[356px] h-[48px] rounded-lg"
            />
            <button className="border w-[117px] h-[48px] rounded-lg bg-white text-[#0191E7] font-bold text-[1.125rem]">
              Submit
            </button>
          </div>
        </div>
        </div>
        <div className="flex flex-col gap-10 pt-4 ">
          <div className="flex justify-between gap-10">
            <button className="text-white">Home</button>
            <button className="text-white">Features</button>
            <button className="text-white">Users</button>
            <button className="text-white">Sign up</button>
          </div>
          <div className="  space-x-3 text-white">
            <Link href="/">© 2023 Swanstrack Ltd</Link>
            <span>|</span>
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
