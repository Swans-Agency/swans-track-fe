import { useRouter } from "next/router";
import React, { createContext, useEffect, useState } from "react";
import cookie from "react-cookies";
import secureLocalStorage from "react-secure-storage";
export const NavShowContext = createContext();

export function NavShowWraper({ children }) {
  const [showNav, setShowNav] = useState(false);
  const [userPermission, setUserPermission] = useState(null);
  const [plan, setPlan] = useState(null);
  const router = useRouter();

  const path = "authorized";

  useEffect(() => {
    let accessToken = cookie.load("AccessTokenSBS", { path: "/" });
    if (accessToken && router.pathname == "/authorized/new-company") {
      setShowNav(false);
    } else if (accessToken && router.pathname.includes(path)) {
      setShowNav(true);
    } else {
      setShowNav(false);
    }
    if (window !== undefined) {
      const html = document.querySelector("html");
        html.classList.add("dark");
    }
  }, [router.pathname]);

  useEffect(() => {
    setUserPermission(cookie.load("userPermission", { path: "/" }));
    setPlan(secureLocalStorage.getItem("plan"));
  }, [showNav, router.pathname]);

  let sharedState = {
    showNav,
    userPermission,
    plan
  };

  return (
    <NavShowContext.Provider value={sharedState}>
      {children}
    </NavShowContext.Provider>
  );
}
