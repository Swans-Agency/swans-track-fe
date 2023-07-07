import { useRouter } from "next/router";
import React, { createContext, useEffect, useState } from "react";
import cookie from "react-cookies";
export const NavShowContext = createContext();

export function NavShowWraper({ children }) {
  const [showNav, setShowNav] = useState(false);
  const [userPermission, setUserPermission] = useState(null);
  const router = useRouter();

  const path = "authorized";

  useEffect(() => {
    let accessToken = cookie.load("AccessTokenSBS", { path: "/" });
    if (accessToken && router.pathname.includes(path)) {
      setShowNav(true);
    } else {
      setShowNav(false);
    }
  }, [router.pathname]);

  useEffect(() => {
    setUserPermission(cookie.load("userPermission", { path: "/" }));
  }, [showNav, router.pathname]);

  let sharedState = {
    showNav,
    userPermission,
  };

  return (
    <NavShowContext.Provider value={sharedState}>
      {children}
    </NavShowContext.Provider>
  );
}
