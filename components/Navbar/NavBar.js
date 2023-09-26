import React, { useContext, useEffect, useState } from "react";
import { DownOutlined, PieChartOutlined } from "@ant-design/icons";
import Image from "next/image";
import { NavCollapse } from "@/context/NavContext";
import MenuItem from "./MenuItem";
import { useRouter } from "next/router";
import Dashboard from "./Icons/Dashboard";
import Arrows from "./Icons/Arrows";
import TrendingUp from "./Icons/TrendingUp";
import TrendingDown from "./Icons/TrendingDown";
import Chart from "./Icons/Chart";
import ProposalInvoice from "./Icons/ProposalInvoice";
import Proposal from "./Icons/Proposal";
import Invoice from "./Icons/Invoice";
import CalendarIcon from "./Icons/CalendarIcon";
import Tasks from "./Icons/Tasks";
import Clients from "./Icons/Clients";
import TeamMembers from "./Icons/TeamMembers";
import User from "./Icons/User";
import Money from "./Icons/Money";
import Support from "./Icons/Support";
import Collapse from "./Icons/Collapse";
import Logout from "./Icons/Logout";
import Expand from "./Icons/Expand";
import GearIcon from "./Icons/GearIcon";
import Booked from "./Icons/Booked";
import SchedIcon from "./Icons/SchedIcon";
import Gpt from "./Icons/Gpt";
import ProjectIcons from "./Icons/ProjectIcons";
import { Avatar, Menu, Popover } from "antd";
import cookie from "react-cookies";

export default function Navbar({ userPermission }) {
  const { collapsed, toggleCollapsed } = useContext(NavCollapse);
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const [userPfp, setUserPfp] = useState("https://xsgames.co/randomusers/avatar.php?g=pixel&key=1");

  useEffect(() => {
    setUserPfp(cookie.load("userImage", { path: "/" }).split("?")[0])
  }, [userPermission])

  const menuItems = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: <Dashboard />,
    },
    {
      label: "Ins & Outs",
      icon: <Arrows />,
      arrow: <DownOutlined />,
      key: "ino",
      children: [
        {
          key: "ins-out/income",
          label: "Incomes",
          icon: <TrendingUp />,
        },
        {
          key: "ins-out/expenses",
          label: "Expenses",
          icon: <TrendingDown />,
        },
      ],
    },
    {
      key: "reports",
      label: "Reports",
      icon: <Chart />,
    },
    {
      label: "Proposals & Invoices",
      icon: <ProposalInvoice />,
      arrow: <DownOutlined />,
      key: "prop",
      children: [
        {
          key: "invoice/proposal",
          label: "Proposals",
          icon: <Proposal />,
        },
        {
          key: "invoice",
          label: "Invoices",
          icon: <Invoice />,
        },
      ],
    },
    {
      key: "calendar",
      label: "Calendar",
      icon: <CalendarIcon />,
    },
    {
      label: "Sched Track",
      icon: <SchedIcon />,
      arrow: <DownOutlined />,
      key: "sched",
      children: [
        {
          key: "sched-track/appointments",
          label: "Appointments",
          icon: <Booked />,
        },
        {
          key: "sched-track/settings",
          label: "Settings",
          icon: <GearIcon />,
        },
      ],
    },
    {
      key: "tasks",
      label: "Tasks",
      icon: <Tasks />,
    },
    {
      key: "projects",
      label: "Projects",
      icon: <ProjectIcons />,
    },
    {
      key: "swan-ai",
      label: "ChatGPT",
      icon: <Gpt />,
    },
    {
      key: "client",
      label: "Clients List",
      icon: <Clients />,
    },
    {
      key: "team",
      label: "Team Members",
      icon: <TeamMembers />,
      divider: true,
    },
    // {
    //   key: "company-preference",
    //   label: "Company Settings",
    //   icon: <GearIcon />,
    //   permissions: ["Admin", "Supervisor"],
    // },
    // {
    //   key: "profile",
    //   label: "Profile",
    //   icon: <User />,
    //   divider: true,
    // },
    // {
    //   key: "settings",
    //   label: "Billing & Plans",
    //   icon: <Money />,
    //   permissions: ["Admin"],
    // },
    // {
    //   key: "support",
    //   label: "Support & Tickets",
    //   icon: <Support />,
    // },
    {
      key: "collapse",
      label: "Collapse Sidebar",
      icon: <Collapse />,
    },
    // {
    //   key: "logout",
    //   label: "Logout",
    //   icon: <Logout />,
    // },
  ];

  const hoverItems = [
    {
      key: "company-preference",
      label: "Company Settings",
      icon: <GearIcon />,
      permissions: ["Admin", "Supervisor"],
    },
    {
      key: "support",
      label: "Support & Tickets",
      icon: <Support />,
    },
    {
      key: "settings",
      label: "Billing & Plans",
      icon: <Money />,
      permissions: ["Admin"],
    },
    {
      key: "profile",
      label: "Profile",
      icon: <User />,
      divider: true,
    },
    {
      key: "logout",
      label: "Logout",
      icon: <Logout />,
    },
  ];

  function toTitleCase(str) {
    return str
      .toLowerCase()
      .split(' ')
      .map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
  }
  const router = useRouter();




  return (
    <>
      <link href="https://fonts.cdnfonts.com/css/southernsky" rel="stylesheet" />

      <div className="sticky top-0 left-0 !z-[1000]">
        <div className="absolute !z-[1000]">
          <div
            className={`${!collapsed ? "hidden" : "left-0 h-[100vh] top-0 "} text-white  p-1 bg-sidebar flex items-center hover:cursor-pointer`}
            onClick={toggleCollapsed}
            title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            <Expand />
          </div>

          <div
            className={`bg-navbar h-[100vh] ${collapsed ? "w-[20px]  hidden" : "w-[256px] "
              } fixed overflow-hidden text-white font-extralight px-2`}
          >
            {/* <div className="w-full flex justify-center py-1 sticky top-0 inset-0 bg-navbar ">
              <div className="pt-3">
                <Image src="/logoNew.svg" width={60} height={60} />
              </div>
            </div> */}
            <div className=" flex justify-center items-center gap-x-4 py-2 sticky top-0 inset-0">

              <Image src="/logoNew.svg" width={50} height={50} />

              {/* <span className="text-2xl a7a font-bold">Swans Track</span> */}
            </div>
            {/* <div className="w-full h-16"></div> */}

            <div className="h-[80vh] pr-2 overflow-y-scroll">
              {menuItems.map((item, index) => {
                return (
                  <MenuItem
                    item={item}
                    index={index}
                    userPermission={userPermission}
                    toggleCollapsed={toggleCollapsed}
                    selectedTab={selectedTab}
                    setSelectedTab={setSelectedTab}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className={`${collapsed ? "w-[100%-30px] ml-[30px]" : "w-[100%-256px] ml-[256px] overflow-hidden"} !z-[1000] sticky top-0 left-0 bg-gray-200 h-14  px-5 flex justify-between items-center gap-x-2  text-black `}>


        <div className=" flex items-center gap-x-4 py-1 sticky top-0 inset-0 ">
          <span className="text-2xl pl-5 a7a font-bold">{toTitleCase(router.pathname.split("authorized/")[1])}</span>
        </div>

        <div className="flex items-center gap-x-2 h-full text-black ">
          <p className="">Hello, {cookie.load("userFullname", { path: "/" }) || cookie.load("username", { path: "/" })}</p>
          <Avatar
            src={userPfp}
            className="w-9 h-9 rounded-full border-2"
            style={{
              border: "1px solid gray"
            }}
          />
          <Popover
            content={
              <div className="text-white">
                {hoverItems.map((item, index) => {
                  return (
                    <MenuItem
                      item={item}
                      index={index}
                      userPermission={userPermission}
                      toggleCollapsed={toggleCollapsed}
                      selectedTab={selectedTab}
                      setSelectedTab={setSelectedTab}
                    />
                  );
                })}

              </div>
            } >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </Popover>
        </div>
      </div>
    </>
  );
}
