import React from "react";
import { Tag } from "antd";

export default function TagANTD({ bordered, color, text }) {
  return (
    <Tag bordered={bordered} color={color}>
      {text}
    </Tag>
  );
}
