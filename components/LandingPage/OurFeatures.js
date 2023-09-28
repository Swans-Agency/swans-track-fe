import React from "react";
import Features from "./Features";

export default function OurFeatures(props) {
  return (
    <section className="h-auto">
      <h1 className="text-[3.75rem] text-[#0191E7] font-bold text-center mt-4">
        Our Features
      </h1>
      <div className="flex justify-between w-[80%] m-auto text-[0.938rem] pt-5">
        <h3>Calendar</h3>
        <h3>Sched Track</h3>
        <h3>Tasks</h3>
        <h3>Projects</h3>
        <h3>Client Portal</h3>
        <h3>Intelligent Swan (ChatGPT)</h3>
        <h3>Proposals & Invoicing</h3>
        <h3>Expenses and income tracking</h3>
        <h3>Team members collaboration</h3>
      </div>
      <Features />
    </section>
  );
}
