import React from "react";
import { Card } from "antd";

export default function Circular({ title, chart }) {
  return (
    <Card
      bordered={false}
      hoverable={true}
      className="grid tablet:col-span-2 laptop:col-span-1 rounded-lg bg-gray-100"
    >
      <p className="text-lg font-semibold mb-2">{title}</p>
      {chart}
    </Card>
  );
}
