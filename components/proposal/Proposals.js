import React, {   useRef, useState } from "react";
import {
   CloudDownloadOutlined,
   SearchOutlined,
} from "@ant-design/icons";
import { Button, Input, Space } from "antd";
import { getAxios } from "@/functions/ApiCalls";
import Highlighter from "react-highlight-words";
import TableANTD from "../ANTD/TableANTD";
import {NotificationLoading} from "@/functions/Notifications";
import ProposalForm from "./ProposalForm";

export default function Proposals() {
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

  const downloadPdf = async (id) => {
    NotificationLoading();
    let response = await getAxios(
      `${process.env.DIGITALOCEAN}/invoice/download-proposal/${id}`
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
            type="primary"
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
      title: "Proposal No",
      dataIndex: "proposalNo",
      key: "proposalNo",
      width: "20%",
      ...getColumnSearchProps("proposalNo"),
    },
    {
      title: "Client Name",
      dataIndex: "toCompanyName",
      key: "toCompanyName",
      width: "20%",
      ...getColumnSearchProps("toCompanyName"),
    },
    {
      title: "Client Email",
      dataIndex: "toCompanyEmail",
      key: "toCompanyEmail",
      width: "20%",
    },
    {
      title: "Date",
      dataIndex: "proposalDate",
      key: "proposalDate",
      width: "10%",
    },
    {
      title: "Proposal Total",
      dataIndex: "proposalTotal",
      key: "proposalTotal",
      width: "20%",
      sorter: (a, b) => a.proposalTotal - b.proposalTotal,
      ...getColumnSearchProps("proposalTotal"),
      render: (_, item) => <>{Number(item?.proposalTotal).toFixed(2)}</>,
    },
    {
      title: <div className="text-center">Download</div>,
      dataIndex: "download",
      key: "download",
      width: "10%",
      render: (_, item) => (
        <div className="text-center">
          <CloudDownloadOutlined
            key="edit"
            style={{ color: "#3b82f6", fontSize: "18px", alignItems: "center" }}
            onClick={() => downloadPdf(item.id)}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      {/* <h1 className="text-3xl font-light tracking-tight text-black mb-3">Company Proposals</h1> */}
      <TableANTD
        columns={columns}
        getUrl={`${process.env.DIGITALOCEAN}/invoice/get-proposals/`}
        multiDeleteUrl={`${process.env.DIGITALOCEAN}/invoice/delete-multi-proposals/`}
        addButton={true}
        buttonTitle="New Proposal"
        addDrawer={true}
        drawerTitle="Add New Proposal"
        drawerContent={(setReload, onClose) => <ProposalForm setReload={setReload} onClose={onClose} />}

      />
    </>
  );
}
