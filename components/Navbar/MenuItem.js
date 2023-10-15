import { logout } from "@/functions/GeneralFunctions";
import { Divider } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import cookie, { remove } from "react-cookies";
import DrawerANTD from "../ANTD/DrawerANTD";
import TextBox from "../SwanAi/TextBox";

export default function MenuItem({ item, index, userPermission, toggleCollapsed, selectedTab, setSelectedTab }) {
  const [showChildren, setShowChildren] = useState(false);
  const [hide, setHide] = useState("");
  const [showGPT, setShowGPT] = useState(false);
  const router = useRouter();

  const handleClick = (item) => {
    if (item.key === "swan-ai") {
      setShowGPT(true)
    } else if (item.key === "collapse") {
      toggleCollapsed()
    } else if (item?.key === "logout") {
      logout();
    } else {
      if (item?.key && !item?.children) {
        setSelectedTab(item?.key);
        router.push(`/authorized/${item?.key}`);
        cookie.save("selectedTab", item?.key, {
          path: "/",
        });
      } else {
        setShowChildren(!showChildren);
      }
    }
  };
  const handleSelectParent = (key) => {
    setSelectedTab(key);
    cookie.save("selectedTab", key, {
      path: "/",
    });
  }

  useEffect(() => {
    setSelectedTab(cookie.load("selectedTab", { path: "/" }) || "dashboard");
    if (!item?.permissions?.includes(userPermission) && item?.permissions) {
      setHide("hidden");
    } else {
      setHide("");
    }
  }, [userPermission]);

  return (
    <>
      <div key={index} className={`${hide} `}>
        <div
          className={`flex font-extralight justify-between gap-x-3 items-center text-[1rem] hover:bg-mainBackground hover:cursor-pointer px-2 py-2 rounded-lg ${selectedTab === item?.key ? "bg-mainBackground" : ""} `}
          onClick={() => handleClick(item)}
        >
          <div className="flex gap-x-3 items-center text-[15px]">
            {item?.icon}
            <p>{item?.label}</p>
          </div>
          <div className="text-sm">{item?.arrow}</div>
        </div>
        <div
          className={`${!showChildren ? "hidden" : ""
            } bg-mainBackground rounded-lg my-1`}
        >
          {item?.children?.map((child, cIndex) => {
            return (
              <div
                key={cIndex}
                className="flex gap-x-3 items-center  text-[15px] hover:bg-foreignBackground hover:text-white hover:cursor-pointer pl-8 px-2 py-2 rounded-lg"
                onClick={() => {handleClick(child); handleSelectParent(item?.key)}}
              >
                {child?.icon}
                <p>{child?.label}</p>
              </div>
            );
          })}
        </div>
      </div>
      {item?.divider && <Divider />}
      <DrawerANTD
        title="ChatGPT"
        children={<TextBox />}
        onClose={() => setShowGPT(false)}
        open={showGPT}
      />
    </>
  );
}
