import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space } from "antd";

import Highlighter from "react-highlight-words";
import { useRouter } from "next/router";
import TableANTD from "../ANTD/TableANTD";
import IncomeForm from "./IncomeForm";

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

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            type="primary"
            className="bg-blue-500 hover:bg-blue-600"
            size="small"
            style={{
              width: 90,
              paddingBottom: 20,
            }}
          >
            <div className="flex gap-x-2 items-center justify-center">
              <SearchOutlined /> Search
            </div>
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ...getColumnSearchProps("description"),
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
      ...getColumnSearchProps("amount"),
      render: (_, item) => <>{Number(item?.amount).toFixed(2)}</>,
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      ...getColumnSearchProps("paymentMethod"),
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
      <h1 className="text-3xl font-light tracking-tight text-black mb-3">
        Company Income
      </h1>
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
