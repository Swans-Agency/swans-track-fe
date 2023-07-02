import React from "react";
import { Table } from "antd";

export default function Tasks({ columns, tasks }) {
  return (
    <>
      <div className="mt-2">
        <Table
          columns={columns}
          dataSource={tasks}
          id="custom-table"
          className="w-[100%]"
          // pagination={false}
          scroll={{
            y: 390,
          }}
        />
      </div>
    </>
  );
}
