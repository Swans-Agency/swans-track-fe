import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

export default function Navbar(props) {
  const router = useRouter();

  return (
    <div className="flex px-[10%] bg-sidebar text-white">
      <div className="flex-1 p-2">
        <Image src="/Logo.png" width={60} height={60} />
      </div>
      <div className="flex-none self-center">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a href="/signup" className="text-white">
              Sign Up
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
