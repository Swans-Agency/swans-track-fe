import React from "react";
import Features from "./Features";
import Link from "next/link";

export default function OurFeatures(props) {
  return (
    <section id="Features" className="h-auto">
      <h1 className="desktop:text-[3.75rem] phone:text-[2.188rem] text-[#0191E7] font-black text-center mt-4">
        Our Features
      </h1>
      <div className="desktop:flex justify-between w-[80%] m-auto text-[0.938rem] pt-5 phone:hidden">
        <Link href="#Calendar">Calendar</Link>
        <Link href="#Sched">Sched Track</Link>
        <Link href="#Tasks">Tasks</Link>
        <Link href="#Projects">Projects</Link>
        <Link href="#Client">Client Portal</Link>
        <Link href="#Intelligent">Intelligent Swan (ChatGPT)</Link>
        <Link href="#Proposals">Proposals & Invoicing</Link>
        <Link href="#Expenses">Expenses and income tracking</Link>
        <Link href="#Team">Team members collaboration</Link>
      </div>
      <Features />
    </section>
  );
}
