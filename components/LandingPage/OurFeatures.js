import React from "react";
import Features from "./Features";
import Link from "next/link";

export default function OurFeatures(props) {
  return (
    <section id="Features" className="h-auto">
      <h1 className="desktop:text-[3.75rem] phone:text-[2.188rem] text-[#0191E7] font-black text-center mt-4">
        Our Features
      </h1>
      <Features />
    </section>
  );
}
