import React, { useContext, useState } from "react";
import { DownOutlined} from "@ant-design/icons";
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

export default function Navbar({ userPermission }) {
  const { collapsed, toggleCollapsed } = useContext(NavCollapse);
  const [selectedTab, setSelectedTab] = useState("dashboard"); 

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
      label: "Intelligent Swan",
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
    },
    {
      key: "company-preference",
      label: "Company Settings",
      icon: <GearIcon />,
      permissions: ["Admin", "Supervisor"],
    },
    {
      key: "profile",
      label: "Profile",
      icon: <User />,
      divider: true,
    },
    {
      key: "settings",
      label: "Billing & Plans",
      icon: <Money />,
      permissions: ["Admin"],
    },
    {
      key: "support",
      label: "Support & Tickets",
      icon: <Support />,
    },
    {
      key: "collapse",
      label: "Collapse Sidebar",
      icon: <Collapse />,
    },
    {
      key: "logout",
      label: "Logout",
      icon: <Logout />,
    },
  ];

  return (
    <div className="sticky top-0 left-0 !z-[10000]">
      <div className="absolute !z-[1000]">
        <div
          className={`${!collapsed ? "hidden" : "left-0 h-[100vh] top-0 "} text-textIcons  p-1 bg-sidebar flex items-center hover:cursor-pointer`}
          onClick={toggleCollapsed}
          title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          <Expand />
        </div>

        <div
          className={`bg-navbar h-[100vh] ${collapsed ? "w-[20px]  hidden" : "w-[256px] rounded-r-xl"
            } fixed overflow-hidden text-textIcons font-extralight px-2`}
        >
          <div className="w-full flex justify-center py-1 sticky top-0 inset-0 bg-navbar ">
            <div className="pt-3">
              <Image src="/logoNew.svg" width={60} height={60} />
            </div>
          </div>

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
  );
}
