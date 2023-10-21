import React from "react";
import { Drawer } from "antd";

export default function DrawerANTD({ title, children, onClose, open }) {
  return (
    <Drawer
      width="600"
      placement="right"
      title={title}
      onClose={onClose}
      open={open}
      className="bg-white z-[100000000] rounded-l-lg"
    >
      {children}
    </Drawer>
  );
}
