import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space } from "antd";

import Highlighter from "react-highlight-words";
import { useRouter } from "next/router";
import TableANTD from "../ANTD/TableANTD";
import IncomeForm from "./IncomeForm";
import { getColumnSearchProps, paymentColors } from "@/functions/GeneralFunctions";


export default function Incomes({ showModal }) {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const router = useRouter();

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };


  const columns = [
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ...getColumnSearchProps("description", searchInput, searchedColumn, searchText, handleSearch, handleReset, setSearchText, setSearchedColumn),
    },
    {
      title: "Reference",
      dataIndex: "invoice",
      key: "invoice",
      render: (_, item) => <>{item?.invoice?.invoiceNo}</>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      sorter: (a, b) => a.amount - b.amount,
      ...getColumnSearchProps("amount", searchInput, searchedColumn, searchText, handleSearch, handleReset, setSearchText, setSearchedColumn),
      render: (_, item) => <>{Number(item?.amount).toFixed(2)}</>,
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      ...getColumnSearchProps("paymentMethod", searchInput, searchedColumn, searchText, handleSearch, handleReset, setSearchText, setSearchedColumn),
    },
    {
      title: "Attachment",
      dataIndex: "attachment",
      key: "attacement",
      render: (_, item) => {
        return (
          <>
            {item?.attachment ? (
              <a
                className="text-blue-600 underline hover:underline hover:text-blue-500"
                href={item?.attachment.substring(
                  0,
                  item?.attachment.indexOf("?")
                )}
                target="_blank"
              >
                View attachement
              </a>
            ) : (
              <div>No attachment</div>
            )}
          </>
        );
      },
      width: "13%",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
  ];

  return (
    <>
      <TableANTD
        columns={columns}
        getUrl={`${process.env.DIGITALOCEAN}/invoice/get-income/`}
        multiDeleteUrl={`${process.env.DIGITALOCEAN}/invoice/multi-income-delete/`}
        addButton={true}
        buttonTitle="Add Income"
        addDrawer={true}
        drawerTitle="Add New Income"
        drawerContent={(setReload, onClose) => (
          <IncomeForm setReload={setReload} onClose={onClose} />
        )}
      />
    </>
  );
}
