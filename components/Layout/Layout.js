import React, { useContext, useEffect, useState } from 'react';

import { NavShowContext } from '@/context/ShowNavContext';
import { NavCollapse } from '@/context/NavContext';
import Navbar from '../Navbar/NavBar';


export default function Layout({ children, accessToken, }) {
    const { showNav, userPermission } = useContext(NavShowContext);
    const { collapsed, marginLeft, navBarWidth, toggleCollapsed } = useContext(NavCollapse);

    return (
        <>
            {showNav && userPermission ?
                <>
                    <Navbar
                        userPermission={userPermission}
                    />
                    <div className={`tablet:px-10 phone:px-5 py-5  min-h-[100vh] ${!collapsed ? "desktop:ml-[256px]" : "phone:ml-[25px]"}`}>
                        {children}
                    </div>
                </> :
                <div className=' min-h-[100vh]'>
                    {children}
                </div>
            }
        </>
    );
};

export const getServerSideProps = async (ctx) => {
    let accessToken = ctx.req.cookies["AccessTokenSBS"]
    let userPermission = ctx.req.cookies["userPermission"]
    try {
        if (accessToken) {
            console.log("userPermission", userPermission)
        } else {
            return {
                redirect: {
                    destination: '/401',
                    permanent: false,
                }
            }
        }
    } catch (e) {
        console.log(e);
    }
    return { props: { accessToken, userPermission } };
};