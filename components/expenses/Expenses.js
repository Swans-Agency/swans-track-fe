import React, { useEffect, useRef, useState } from "react";
import {
  PlusOutlined,
  SearchOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Button, Input, Popconfirm, Space, Table } from "antd";
import {
  NotificationPermission,
  deleteAxios,
  getAxios,
} from "@/functions/ApiCalls";
import Highlighter from "react-highlight-words";

export default function Expenses({
  showModal,
  userPermission,
  reloadData,
  setReloadData,
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
    const url = `${process.env.DIGITALOCEAN}/company/company-expenses/`;
    let data = await getAxios(url);
    setAllProposals(data);
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
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: "25%",
      ...getColumnSearchProps("category"),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "23%",
      ...getColumnSearchProps("description"),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      width: "15%",
      sorter: (a, b) => a.amount - b.amount,
      ...getColumnSearchProps("amount"),
      render: (_, item) => <>{Number(item?.amount).toFixed(2)}</>,
    },
    {
      title: "Attachement",
      dataIndex: "attachement",
      key: "attachement",
      render: (_, item) => {
        console.log(item);
        return (
          <>
            {item?.attachement ? (
              <a
                className="text-blue-600 underline hover:underline hover:text-blue-500"
                href={item?.attachement.substring(
                  0,
                  item?.attachement.indexOf("?")
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
      width: "15%",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: "15%",
    },
    {
      title: "Delete",
      dataIndex: "delete",
      key: "delete",
      render: (_, item) => {
        console.log(item);
        return (
          <>
            {userPermission === "Supervisor" ? (
              <Popconfirm
                title="Delete"
                description={
                  userPermission == "Supervisor"
                    ? `Are you sure you want to delete?`
                    : "You don't have the permission to delete"
                }
                onConfirm={
                  userPermission == "Supervisor"
                    ? async () => {
                        await deleteAxios(
                          `${process.env.DIGITALOCEAN}/company/delete-expenses/${item?.id}`
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
            ) : (
              <>
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
              </>
            )}
          </>
        );
      },
      width: "7%",
    },
  ];

  return (
    <>
      <h1 className="text-2xl font-bold text-maincl mb-3">Company Expenses</h1>
      <div className="flex  justify-end mb-3">
        <button
          onClick={showModal}
          className="flex gap-x-2 bg-sidebarbg hover:bg-secondbg text-white rounded py-[0.4rem] px-3 hover:shadow-xl "
        >
          <PlusOutlined className=" pt-1" />
          Add Expense
        </button>
      </div>
      <div className="mt-2">
        <Table
          columns={columns}
          dataSource={allProposals}
          className="w-[100%]"
          scroll={{
            y: 390,
          }}
        />
      </div>
    </>
  );
}
