import React, { useContext, useEffect, useState } from 'react';

import Navbar from '../Navbar/Navbar';
import { NavShowContext } from '@/context/ShowNavContext';


export default function Layout({ children, accessToken, }) {
    const { showNav, userPermission } = useContext(NavShowContext);

    return (
        <>
            {showNav && userPermission &&
                <Navbar
                    userPermission={userPermission}
                />
            }
            {children}
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