import React from "react";
import HeroPhone from "./HeroPhone";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

export default function HeroSection() {
  const router = useRouter();
  return (
    <section
      id="hero-section"
      className="w-full h-[100vh]  overflow-hidden grid gap-0 relative"
      style={{ backgroundImage: "url(/Main.png)" }}
    >
      <nav className="sticky top-0 left-0">
        <div className="flex justify-between h-24 items-center px-[10%] w-full mx-auto py-6">

        <div>
          <Image src="/logoNew.svg" width={54} height={54} />
        </div>
        <ul className="flex justify-between gap-10 text-white inset-0">
          <li className="">
            Home
          </li>
          <li className="">
            Features
          </li>
          <li className="">
            User
          </li>
        </ul>
        <div>
          <button
            onClick={() => {
              router.push("/signup");
            }}
            className="bg-gradient-to-br from-[#003B76] to-[#00A3FF] hover:shadow-md hover:shadow-white text-white font-bold py-3 px-4 rounded-lg my-3"
          >
            Register Now !
          </button>
        </div>
        </div>
      </nav>

      <div className="desktop:block mt-2 self-center">
        <HeroPhone />
      </div>
    </section>
  );
}
