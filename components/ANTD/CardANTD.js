import { Card } from "antd";
import React from "react";

export default function CardANTD({ key, title, children, className="" }) {
  return (
    <Card key={key} title={title} bordered={true} className={className}>
      {children}
    </Card>
  );
}
