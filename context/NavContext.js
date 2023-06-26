import React, { createContext, useContext, useEffect, useState } from 'react';

export const NavCollapse = createContext();

export function NavCollapseWraper({ children }) {
    const [collapsed, setCollapsed] = useState(false);
    const [marginLeft, setMarginLeft] = useState("ml-[256px]");

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
        if (collapsed == false) { setMarginLeft("ml-[256px]") } else { setMarginLeft("ml-[80px]") }
    }

    let sharedState = {
        collapsed,
        marginLeft,
        toggleCollapsed,
    }

    return (
        <NavCollapse.Provider value={sharedState}>
            {children}
        </NavCollapse.Provider>
    );
}
