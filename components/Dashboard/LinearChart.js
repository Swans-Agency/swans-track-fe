import React from "react";
import { Card } from "antd";

export default function LinearChart({ title, chart, classs }) {
  return (
    <Card
      bordered={false}
      hoverable={true}
      className={`grid rounded-lg bg-gray-100 ${classs}
      `}
    >
      <p className="text-lg font-semibold mb-2">{title}</p>
      {chart}
    </Card>
  );
}
