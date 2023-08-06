import React from "react";
import TableANTD from "../ANTD/TableANTD";

export default function TableMembers({ columns, reloadData }) {
  return (
    <div className="mt-2">
      <TableANTD
        columns={columns}
        getUrl={`${process.env.DIGITALOCEAN}/account/list-employees/`}
        reloadData={reloadData}
      />
    </div>
  );
}
