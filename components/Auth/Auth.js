import React, { useEffect } from 'react';
import cookie from "react-cookies";
import { useRouter } from 'next/router';


export default function AuthWrapper({ children }) {
    const router = useRouter();  

    useEffect(() => {
        checkAuthorization()
    }, [router.pathname]);

    const checkAuthorization = () => {
        const token = cookie.load("AccessTokenSBS", { path: "/" });
        const path = "authorized"
        if (router.pathname.includes(path)) {
            if (!token) {
                router.push('/401')
            } 
        }
    }

    return <>{children}</>;
};