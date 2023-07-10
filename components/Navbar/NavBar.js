import React, { useContext } from "react";
import {
    CalendarOutlined,
    DownOutlined,
    DashboardOutlined,
    SwapOutlined,
    SnippetsOutlined,
    LoginOutlined,
    LogoutOutlined,
    DotChartOutlined,
    UserOutlined,
    TeamOutlined,
    FileTextOutlined,
    ReconciliationOutlined,
    MedicineBoxOutlined,
    ProfileOutlined,
    ExportOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import { NavCollapse } from "@/context/NavContext";
import { logout } from "@/functions/GeneralFunctions";
import MenuItem from "./MenuItem";

export default function Navbar({ userPermission }) {
    const { collapsed, toggleCollapsed } = useContext(NavCollapse);

    const menuItems = [
        {
            key: "dashboard",
            label: "Dashboard",
            icon: <DashboardOutlined />,
        },
        {
            label: "Ins & Outs",
            icon: <SwapOutlined />,
            arrow: <DownOutlined />,
            children: [
                {
                    key: "ins-out/income",
                    label: "Incomes",
                    icon: <LoginOutlined />,
                },
                {
                    key: "ins-out/expenses",
                    label: "Expenses",
                    icon: <LogoutOutlined />,
                },
            ],
        },
        {
            key: "reports",
            label: "Reports",
            icon: <DotChartOutlined />,
        },
        {
            label: "Proposals & Invoices",
            icon: <FileTextOutlined />,
            arrow: <DownOutlined />,
            children: [
                {
                    key: "invoice/proposal",
                    label: "Proposals",
                    icon: <ReconciliationOutlined />,
                },
                {
                    key: "invoice",
                    label: "Invoices",
                    icon: <MedicineBoxOutlined />,
                },
            ],
        },
        {
            key: "calendar",
            label: "Calendar",
            icon: <CalendarOutlined />,
        },
        {
            key: "tasks",
            label: "Tasks",
            icon: <SnippetsOutlined />,
        },
        {
            key: "client",
            label: "Clients List",
            icon: <ProfileOutlined />,
        },
        {
            key: "team",
            label: "Team Members",
            icon: <TeamOutlined />,
        },
        {
            key: "company-preference",
            label: "Company Preferences",
            icon: <ReconciliationOutlined />,
        },
        {
            key: "profile",
            label: "Profile",
            icon: <UserOutlined />,
        },
    ];

    const logOutButton = {
        key: "logout",
        label: "Logout",
        icon: <ExportOutlined />,
    };

    return (
        <div className='sticky top-0 left-0 !z-[10000]'>
            <div className='absolute border-r border-foreignBackground !z-[1000]'>
                <div
                    className={`absolute  ${!collapsed ? "left-[200px] top-5 border border-foreignBackground hover:shadow shadow-foreignBackground rounded p-3 z-[1000]" : "left-0 h-[100vh] top-0"}  p-1 bg-sidebar flex items-center hover:cursor-pointer`}
                    onClick={toggleCollapsed}
                    title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                >
                    {!collapsed ? <MenuFoldOutlined className='text-textIcons' /> : <MenuUnfoldOutlined className='text-textIcons' />}
                </div>

                
                <div className={`bg-sidebar h-[100vh] ${collapsed ? "w-[20px] hidden" : "w-[256px]"} relative overflow-y-auto overflow-x-hidden text-textIcons px-2 pt-2`}>
                    <div className='pb-4'>
                        <Image src="/Logo.png" width={60} height={60} />
                    </div>
                    {
                        menuItems.map((item, index) => {
                            return (
                                <MenuItem item={item} index={index} userPermission={userPermission} />
                            )
                        })
                    }
                    <div
                        className={`absolute bottom-2 flex ${collapsed ? "w-[20px] hidden" : "w-[240px]"} justify-between gap-x-3 items-center bg-sidebar text-[1rem] hover:bg-mainBackground hover:cursor-pointer px-2 py-2 rounded-lg`}
                        onClick={() => logout()}
                    >
                        <div className='flex gap-x-3 items-center'>
                            {logOutButton?.icon}
                            <p>{logOutButton?.label}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
