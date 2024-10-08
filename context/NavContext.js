import React, { createContext, useState } from "react";

export const NavCollapse = createContext();

export function NavCollapseWraper({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [marginLeft, setMarginLeft] = useState("ml-[256px]");
  const [navBarWidth, setNavBarWidth] = useState("w-[256px]");

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
    if (collapsed == false) {
      setMarginLeft("ml-[256px]");
      setNavBarWidth("w-[256px]");
    } else {
      setMarginLeft("ml-[30px]");
      setNavBarWidth("w-[30px]");
    }
  };

  let sharedState = {
    collapsed,
    marginLeft,
    navBarWidth,
    toggleCollapsed,
  };

  return (
    <NavCollapse.Provider value={sharedState}>{children}</NavCollapse.Provider>
  );
}
