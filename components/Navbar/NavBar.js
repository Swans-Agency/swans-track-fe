import React, { useContext, useEffect, useState } from "react";
import { DownOutlined } from "@ant-design/icons";
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
import Logout from "./Icons/Logout";
import GearIcon from "./Icons/GearIcon";
import Booked from "./Icons/Booked";
import SchedIcon from "./Icons/SchedIcon";
import Gpt from "./Icons/Gpt";
import ProjectIcons from "./Icons/ProjectIcons";
import { Avatar, ConfigProvider, Menu, Popover, Progress, theme } from "antd";
import cookie from "react-cookies";
import { logout } from "@/functions/GeneralFunctions";
import FormIcon from "./Icons/FormIcon";
import Leads from "./Icons/Leads";
import secureLocalStorage from "react-secure-storage";

export default function Navbar({ userPermission, plan }) {
  const { collapsed, toggleCollapsed } = useContext(NavCollapse);
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const [userPfp, setUserPfp] = useState("https://xsgames.co/randomusers/avatar.php?g=pixel&key=1");
  const [storagePercent, setStoragePercent] = useState(0);
  const [titleStorage, setTitleStorage] = useState()
  const router = useRouter();

  useEffect(() => {
    setUserPfp(cookie.load("userImage", { path: "/" }).split("?")[0])
    CalculateStorage()
  }, [userPermission])

  const CalculateStorage = () => {
    let storage = secureLocalStorage.getItem("storage")
    let maxStorage = secureLocalStorage.getItem("maxStorage")
    let percent = ((storage / maxStorage) * 100).toFixed(2)
    setTitleStorage(`${(storage / 1000000000).toFixed(2)} used of ${(maxStorage / 1000000000).toFixed(2) } GB`)
    setStoragePercent(percent)
  }

  

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
      plan:['Solo']
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
      label: "Tasks Board",
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
      plan: ['Solo']
    },
    {
      key: "leads",
      label: "Leads & Clients",
      key: "leads",
      icon: <Clients />,
      arrow: <DownOutlined />,
      children: [
        {
          key: "leads",
          label: "Leads",
          icon: <Leads />,
        },
        {
          key: "leads/forms",
          label: "Form Leads",
          icon: <FormIcon />,
        },
      ],
    },
    {
      key: "team",
      label: "Team Members",
      icon: <TeamMembers />,
      plan: ['Solo']
    },
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
    },
  ];

  function toTitleCase(str) {
    if (str == "projects/details/[project]") {
      return "Project Details"
    }
    return str
      .toLowerCase()
      .split(' ')
      .map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
  }

  return (
    <>
      <link href="https://fonts.cdnfonts.com/css/southernsky" rel="stylesheet" />

      <div
        className={`${collapsed ? "left-[0.85rem]" : "left-[14.85rem]"} fixed top-[1rem] rounded-full p-1 dark:bg-[#141414] dark:text-white !z-[1000] bg-white  shadow hover:shadow-xl border hover:cursor-pointer`}
        onClick={toggleCollapsed}
        title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
      >
        {!collapsed ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg> :
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>}

      </div>


      <div className="sticky top-0 left-0 !z-[500]">
        <div className="absolute !z-[500]        ">
          <div
            className={`ease-in ${!collapsed ? "hidden" : "left-0 h-[100vh] top-0 w-[30px] dark:bg-[#141414] dark:text-white"} dark:border-r-[#282828] dark:border-r  text-white p-1 bg-navbar flex items-center hover:cursor-pointer`}
            onClick={toggleCollapsed}
            title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            <div className=" flex justify-center  gap-x-4 py-2 sticky top-0 inset-0">
              <Image src="/logoNew.svg" width={50} height={50} />
            </div>
          </div>


          <div className={`bg-navbar h-[100vh] ease-in ${collapsed ? "w-[20px]  hidden" : "w-[256px] dark:border-r-[#282828]  dark:border-r"} dark:bg-[#141414] dark:text-white fixed overflow-hidden text-white font-extralight px-2`}>
            <div className=" flex justify-center w-[256px] items-center gap-x-4 h-[4rem]  sticky top-0 inset-0 ">
              <Image src="/logoNew.svg" width={45} height={45} />
              {/* <p className="text-lg font-semibold">Swans Track</p> */}
            </div>

            <div className="h-[80vh] pr-1 overflow-y-scroll">
              {menuItems.map((item, index) => {
                return (
                  <MenuItem
                    item={item}
                    index={index}
                    userPermission={userPermission}
                    plan={plan}
                    toggleCollapsed={toggleCollapsed}
                    selectedTab={selectedTab}
                    setSelectedTab={setSelectedTab}
                  />
                ); 
              })}
              <div className="absolute bottom-0 left-0 w-full  border-t dark:border-t-[#282828]">
                <div
                  className={`flex py-4 px-4 font-extralight justify-between gap-x-3 items-center text-[1rem] element2 hover:cursor-pointer`}
                  onClick={() => logout()}
                >
                  <div className="flex gap-x-3 items-center text-[15px]">
                    <Logout />
                    <p>Logout</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={
          `${collapsed ? 
            "w-[100%-30px] ml-[30px]" : 
            "w-[100%-256px] ml-[256px] overflow-hidden"} dark:bg-[#141414] dark:text-white !z-[500] sticky top-0 left-0 shadow dark:border-b-[#282828] dark:border-b bg-white h-[4rem]  px-5 flex justify-between items-center gap-x-2  text-black `}
      >
        <div className=" flex items-center gap-x-4 py-1 sticky top-0 inset-0 ">
          <span className="text-2xl pl-5  font-light">{toTitleCase(router.pathname.split("authorized/")[1])}</span>
        </div>
        <div className="flex items-center gap-x-2 h-full text-black dark:text-white">
          <p className="laptop:block phone:hidden">Hello, {cookie.load("userFullname", { path: "/" }) || cookie.load("username", { path: "/" })}</p>
          <Avatar
            src={userPfp}
            className="w-9 h-9 rounded-full border-2"
            style={{
              border: "1px solid gray"
            }}
          />
          <ConfigProvider
            theme={{
              algorithm: [theme.darkAlgorithm,]
            }}
          >
          <Popover
            placement="bottomLeft"
            className="mr-4   "
            content={
              <div className="text-black dark:text-white">
                {hoverItems.map((item, index) => {
                  return (
                    <MenuItem
                      item={item}
                      index={index}
                      userPermission={userPermission}
                      plan={plan}
                      toggleCollapsed={toggleCollapsed}
                      selectedTab={selectedTab}
                      setSelectedTab={setSelectedTab}
                    />
                  );
                })}

                <div className="w-full flex flex-col items-center justify-center gap-2 py-5 text-white" title={titleStorage}>
                  <p className=" text-[15px] font-extralight">Storage consumption </p>
                  <Progress percent={storagePercent} type="circle" trailColor="#282828" status="active"  />
                </div>

              </div>
            } >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </Popover>
          </ConfigProvider>
        </div>
      </div>
    </>
  );
}
