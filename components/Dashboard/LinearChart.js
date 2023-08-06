import React from "react";
import { Card } from "antd";

export default function LinearChart({ title, chart, classs }) {
  return (
    <Card
      bordered={false}
      hoverable={false}
      className={`grid rounded bg-gray-100 ${classs}`}
    >
      <p className="text-lg font-semibold mb-2">{title}</p>
      {chart}
    </Card>
  );
}
