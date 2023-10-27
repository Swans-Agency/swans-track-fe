import React, { useRef, useState } from "react";
import TableANTD from "../ANTD/TableANTD";
import ExoenseForm from "./ExpenseForm";
import { categoryColors, getColumnSearchProps } from "@/functions/GeneralFunctions";

export default function Expenses() {
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

  const columns = [
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ...getColumnSearchProps("description", searchInput, searchedColumn, searchText, handleSearch, handleReset, setSearchText, setSearchedColumn),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      ...getColumnSearchProps("category", searchInput, searchedColumn, searchText, handleSearch, handleReset, setSearchText, setSearchedColumn),
      // render: (_, item) => <div style={{ backgroundColor: `${categoryColors[item?.category]}` }} className="w-fit text-white px-2 py-[0.15rem] rounded-full ">{item?.category}</div>,
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
      title: "Attachement",
      dataIndex: "attachement",
      key: "attachement",
      render: (_, item) => {
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
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      ...getColumnSearchProps("date", searchInput, searchedColumn, searchText, handleSearch, handleReset, setSearchText, setSearchedColumn),
    },
  ];

  return (
    <>
      <TableANTD
        columns={columns}
        getUrl={`${process.env.DIGITALOCEAN}/company/company-paginated-expenses/`}
        multiDeleteUrl={`${process.env.DIGITALOCEAN}/company/delete-multi-expenses/`}
        addButton={true}
        buttonTitle="Add Expense"
        addDrawer={true}
        drawerTitle="Add New Expense"
        drawerContent={(setReload, onClose) => (
          <ExoenseForm setReload={setReload} onClose={onClose} />
        )}
      />
    </>
  );
}
