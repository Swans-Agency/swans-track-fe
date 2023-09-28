import React from "react";
import HeroPhone from "./HeroPhone";
import Image from "next/image";
import { useRouter } from "next/router";

export default function HeroSection() {
  const router = useRouter();
  return (
    <section
      id="hero-section"
      className="w-full h-[100vh]  overflow-hidden grid gap-0"
      style={{ backgroundImage: "url(/Main.png)" }}
    >
      <nav className="flex justify-between w-[80%] m-auto fixed right-0 left-0 top-4 z-50">
        <div>
          {/* <Image src="/logoNew.svg" width={54} height={54} /> */}
          <Image src="/Main.svg" width={54} height={54} />

        </div>
        <div className="flex justify-between gap-10 text-[#0191E7]">
        {/* <div className="flex justify-between gap-10 text-white"> */}
          <button className="">Home</button>
          <button className="">Features</button>
          <button className="">User</button>
        </div>
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
      </nav>

      <div className="desktop:block mt-2 self-center">
        <HeroPhone />
      </div>
    </section>
  );
}
