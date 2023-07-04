import React, { useEffect, useRef, useState } from "react";
import {
  PlusOutlined,
  SearchOutlined,
  QuestionCircleOutlined,
  CloudDownloadOutlined,
} from "@ant-design/icons";
import { Button, Input, Popconfirm, Space, Table } from "antd";
import {
  NotificationLoading,
  NotificationPermission,
  getAxios,
  deleteAxios,
} from "@/functions/ApiCalls";
import Highlighter from "react-highlight-words";
import TableANTD from "../ANTD/TableANTD";

export default function Invoices({
  showModal,
  userPermission,
  setReloadData,
  reloadData,
}) {
  const [allProposals, setAllProposals] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  useEffect(() => {
    getAllProposals();
  }, [reloadData]);

  const getAllProposals = async () => {
    const url = `${process.env.DIGITALOCEAN}/invoice/get-invoices/`;
    let data = await getAxios(url);
    setAllProposals(data);
  };

  const downloadPdf = async (id) => {
    NotificationLoading();
    let response = await getAxios(
      `${process.env.DIGITALOCEAN}/invoice/download-invoice/${id}`
    );
    let base64Data = response.invoice;
    const byteString = atob(base64Data.split(",")[1]);
    const mimeString = base64Data.split(",")[0].split(":")[1].split(";")[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([arrayBuffer], { type: mimeString });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "filename.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
      title: "Invoice No",
      dataIndex: "invoiceNo",
      key: "invoiceNo",
      width: "20%",
      ...getColumnSearchProps("invoiceNo"),
    },
    {
      title: "Client Name",
      dataIndex: "toCompanyName",
      key: "toCompanyName",
      width: "15%",
      ...getColumnSearchProps("toCompanyName"),
    },
    {
      title: "Client Email",
      dataIndex: "client",
      key: "client",
      render: (_, item) => {
        console.log(item, "lllllllllllllll");
        return <>{item?.client?.email || item?.toCompanyEmail}</>;
      },
      width: "20%",
    },
    {
      title: "Date",
      dataIndex: "invoiceDate",
      key: "invoiceDate",
      width: "10%",
    },
    {
      title: "Invoice Total",
      dataIndex: "invoiceTotal",
      key: "invoiceTotal",
      width: "13%",
      sorter: (a, b) => a.invoiceTotal - b.invoiceTotal,
      ...getColumnSearchProps("invoiceDate"),
      render: (_, item) => {
        console.log("fff", Number(item?.invoiceTotal).toFixed(2));
        return Number(item?.invoiceTotal).toFixed(2);
      },
    },
    {
      title: "Ref. No",
      dataIndex: "proposalNo",
      key: "proposalNo",
      // render: ((_, item) => (<>{Number(item?.invoiceTotal).toFixed(2)}</>)),
      width: "9%",
    },
    {
      title: <div className="text-center">Download</div>,
      dataIndex: "download",
      key: "download",
      render: (_, item) => (
        <div className="text-center">
          <CloudDownloadOutlined
            key="edit"
            style={{ color: "#3b82f6", fontSize: "18px", alignItems: "center" }}
            onClick={() => downloadPdf(item.id)}
          />
        </div>
      ),
      width: "9%",
    },
    {
      title: <div className="text-center">Delete</div>,
      dataIndex: "delete",
      key: "delete",
      render: (_, item) => {
        console.log(item);
        return (
          <>
            {userPermission === "Supervisor" ? (
              <div className="flex justify-center">
                <Popconfirm
                  title="Delete"
                  description={
                    userPermission == "Supervisor"
                      ? `Are you sure you want to delete ${item?.invoiceNo}?`
                      : "You don't have the permission to delete"
                  }
                  onConfirm={
                    userPermission == "Supervisor"
                      ? async () => {
                        await deleteAxios(
                          `${process.env.DIGITALOCEAN}/invoice/delete-invoices/${item?.id}`
                        );
                        setReloadData({});
                      }
                      : () => NotificationPermission()
                  }
                  icon={
                    <QuestionCircleOutlined
                      style={{
                        color: "red",
                      }}
                    />
                  }
                  okButtonProps={{
                    danger: true,
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke={userPermission === "Supervisor" ? "red" : "gray"}
                    className={
                      userPermission === "Supervisor"
                        ? "w-5 h-5 hover:cursor-pointer"
                        : "w-5 h-5 hover:cursor-not-allowed"
                    }
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                    />
                  </svg>
                </Popconfirm>
              </div>
            ) : (
              <div className="flex justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke={userPermission === "Supervisor" ? "red" : "gray"}
                  className={
                    userPermission === "Supervisor"
                      ? "w-5 h-5 hover:cursor-pointer"
                      : "w-5 h-5 hover:cursor-not-allowed"
                  }
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                  />
                </svg>
              </div>
            )}
          </>
        );
      },
      width: "7%",
    },
  ];

  return (
    <>
      <h1 className="text-2xl font-bold text-maincl mb-3">Company Invoices</h1>
      <div className="flex  justify-end mb-3">
        <button
          onClick={showModal}
          className="flex gap-x-2 bg-sidebarbg hover:bg-foreignBackground hover:text-white text-black rounded py-[0.4rem] px-3 mb-3"
        >
          <PlusOutlined className=" pt-1" />
          New Invoice
        </button>
      </div>
      <div className="mt-2">
        <TableANTD
          columns={columns}
          url={`${process.env.DIGITALOCEAN}/invoice/get-invoices/`}
          reloadData={reloadData}
        />
      </div>
    </>
  );
}
