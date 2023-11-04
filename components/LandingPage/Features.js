import React from "react";
import SvgRight from "./SvgRight";
import SvgLeft from "./SvgLeft";
import Image from "next/image";
import { Router } from "react-router-dom";
import { useRouter } from "next/router";

export default function Features() {
  const router = useRouter();
  const data = [
    { id: "Calendar", title: "Calendar", description: "Effortlessly manage your appointments and events, whether personal or collaborative with colleagues.", image: "/Calender.svg" },
    { id: "Sched", title: "Sched Track", description: "Automation scheduling platform for eliminating the back-and-forth emails to find the perfect time", image: "/Sched.svg" },
    { id: "Tasks", title: "Tasks", description: "Streamline your daily routine by organizing and monitoring tasks and assignments with ease.", image: "/Task.svg" },
    { id: "Projects", title: "Projects", description: "Empower yourself to create and oversee projects systematically from a centralized hub.", image: "/Projects.svg" },
    { id: "Client", title: "Client Portal", description: "Bring your people, clients and partners under one roof for a modern transparency and professional business experience", image: "/Client.svg" },
    { id: "Intelligent", title: "Intelligent Swan", description: "Enhance your web experience with ChatGPT, your AI-powered conversational companion.", image: "/Intelligent.svg" },
    { id: "Proposals", title: "Proposals & Invoicing", description: "Simplify your project workflow by effortlessly generating proposals and issuing invoices for both projects and clients", image: "/Proposals.svg" },
    { id: "Expenses", title: "Expenses and income", description: "Gain a comprehensive understanding of your personal or business finances with precise tracking of expenses and income", image: "/Expenses.svg" },
    { id: "Team", title: "Team collaboration", description: "Elevate collaboration within your team through shared projects, tasks, and smooth interaction", image: "/Team.svg" },
  ]

  return (
    <section id = "Features" className = "h-fit pb-20">
      <h1 className="desktop:text-[3rem] phone:text-[2rem] text-[#0191E7] font-black text-center mb-6 ">
        What's in Swans?
        <span className="text-lg text-white font-light"><br className="phone:block laptop:hidden" ></br>All the tools you need to streamline your work.</span>
      </h1>
      <section className="grid laptop:grid-cols-2 gap-5">
        {
          data.map((item, index) => {
            return (
              <div className="border border-[#282828] rounded-2xl p-10 text-white relative bg-[#ffffff04]  hover:shadow-[#ffffff04] hover:shadow-xl hover:scale-90">
                <div className="w-[200px] h-[200px] flex justify-center items-center">
                  <img src={item?.image} width="200px" height="200px" className="" />
                </div>
                <h1 className="desktop:text-[2rem] phone:text-[1.5rem] font-black flex justify-start items-center gap-x-5 text-[#0191E7]">
                  {item?.title}
                  <Image src={"/Right.svg"} width={50} height={50} />
                </h1>
                <p className="font-light">{item?.description}</p>
                <svg onClick={() => router.push("/login")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-[#0191E7] w-5 h-5 hover:cursor-pointer absolute top-5 right-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </div>
            )
          })
        }
      </section>
    </section>
  );
}
