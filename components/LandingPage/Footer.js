import React, { useState } from "react";
import { Input } from "antd";
import Image from "next/image";
import Link from "next/link";
import { postAxiosAllowAny } from "@/functions/ApiCalls";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleSetEmail = (e) => {
    setEmail(e.target.value)
    if (e.target.value === "") {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }

  const onFinish = () => {
    let url = `${process.env.DIGITALOCEAN}/account/mailing-list/`;
    postAxiosAllowAny(url, { email: email }, true, true);
    setButtonDisabled(true)
    setEmail("")
  }
  
  return (
    <section className="py-10 border-t border-t-[#282828]">
      <div className="m-auto desktop:flex desktop:flex-wrap desktop:justify-between phone:">
        <div className=" desktop:flex gap-24">

          <div className="self-center phone:flex phone:justify-center phone:mb-5">
            <Image src="/LogoWhite.svg" width={100} height={100} />
          </div>
          <div className="phone:flex justify-between gap-1 desktop:hidden phone:mb-10">
            <a href="/" className="text-white">Home</a>
            <a href="#Features" className="text-white">Features</a>
            <a href="#User" className="text-white">Users</a>
            <a href="/signup" className="text-white">Sign up</a>
          </div>
          <div >
            <h1 className="text-white text-[1.375rem] phone:text-center desktop:text-start">Stay Connected</h1>
            <div className="desktop:flex pt-2 gap-2 phone:place-items-center phone:grid">
              <Input
                placeholder="Type your email"
                type="email"
                size="large"
                className=""
                onChange={(e) => handleSetEmail(e.target.value)}
              />
              <button disabled={buttonDisabled} onClick={() => onFinish()} className={`${buttonDisabled ? "cursor-not-allowed": "cursor-pointer"} bg-white text-[#282828] hover:bg-[#bebebe] py-2 px-4 font-bold rounded-lg m-0`}>
                Submit
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-10 pt-4 ">
          <div className="desktop:flex justify-between gap-10 phone:hidden">
            <a href="/" className="text-white">Home</a>
            <a href="#Features" className="text-white">Features</a>
            <a href="#User" className="text-white">Users</a>
            <a href="/signup" className="text-white">Sign up</a>
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
