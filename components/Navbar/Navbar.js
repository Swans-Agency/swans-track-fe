import { useState, useContext } from 'react';
import { CalendarOutlined, DownOutlined, DashboardOutlined, SwapOutlined, SnippetsOutlined, LoginOutlined, LogoutOutlined, DotChartOutlined, UserOutlined, TeamOutlined, FileTextOutlined, ReconciliationOutlined, MedicineBoxOutlined, ProfileOutlined, ExportOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { NavCollapse } from '@/context/NavContext';
import { logout } from '@/functions/GeneralFunctions';
import MenuItem from './MenuItem';


export default function Navbar({userPermission}) {
    const { collapsed, marginLeft, toggleCollapsed } = useContext(NavCollapse);

    const menuItems = [
        {
            key: 'dashboard',
            label: 'Dashboard',
            icon: <DashboardOutlined />,
        },
        {
            label: 'Ins & Outs',
            icon: <SwapOutlined />,
            arrow: <DownOutlined />,
            children: [
                {
                    key: 'ins-out/income',
                    label: 'Incomes',
                    icon: <LoginOutlined />,
                },
                {
                    key: 'ins-out/expenses',
                    label: 'Expenses',
                    icon: <LogoutOutlined />,
                },
            ],
        },
        {
            key: 'reports',
            label: 'Reports',
            icon: <DotChartOutlined />,
        },
        {
            label: 'Proposals & Invoices',
            icon: <FileTextOutlined />,
            arrow: <DownOutlined />,
            children: [
                {
                    key: 'invoice/proposal',
                    label: 'Proposals',
                    icon: <ReconciliationOutlined />,
                },
                {
                    key: 'invoice',
                    label: 'Invoices',
                    icon: <MedicineBoxOutlined />,
                },
            ],
        },
        {
            key: 'calendar',
            label: 'Calendar',
            icon: <CalendarOutlined />,
        },
        {
            key: 'tasks',
            label: 'Tasks',
            icon: <SnippetsOutlined />,
        },
        {
            key: 'client',
            label: 'Clients List',
            icon: <ProfileOutlined />,
        },
        {
            key: 'team',
            label: 'Team Members',
            icon: <TeamOutlined />,
        },
        userPermission == "Supervisor" ? {
            key: 'company-preference',
            label: 'Company Preferences',
            icon: <ReconciliationOutlined />,
        } : null,
        {
            key: 'profile',
            label: 'Profile',
            icon: <UserOutlined />,
        },
    ]

    const logOutButton = {
        key: 'logout',
        label: 'Logout',
        icon: <ExportOutlined />,
    }

    return (
        <div className='fixed border-r border-foreignBackground '>
            <div className='bg-mainBackground h-[100vh] w-[256px] relative overflow-y-auto text-textIcons px-2 pt-2'>
                <div className='pb-4'>
                    <Image src="/logo.png" width={60} height={60} />
                </div>
                {
                    menuItems.map((item, index) => {
                        return (
                            <MenuItem item={item} index={index} />
                        )
                    })
                }
                <div
                    className='fixed bottom-2 flex w-[240px]  justify-between gap-x-3 items-center text-[1rem] hover:bg-foreignBackground hover:cursor-pointer px-2 py-2 rounded-lg'
                    onClick={() => logout()}
                >
                    <div className='flex gap-x-3 items-center'>
                        {logOutButton?.icon}
                        <p>{logOutButton?.label}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
