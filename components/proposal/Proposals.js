import React, { useRef, useState } from "react";
import {CloudDownloadOutlined } from "@ant-design/icons";
import { getAxios } from "@/functions/ApiCalls";
import TableANTD from "../ANTD/TableANTD";
import {NotificationLoading} from "@/functions/Notifications";
import ProposalForm from "./ProposalForm";
import { getColumnSearchProps } from "@/functions/GeneralFunctions";

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
    console.log({ response })
    let base64Data = response?.invoice;
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


  const columns = [
    {
      title: "Proposal No",
      dataIndex: "proposalNo",
      key: "proposalNo",
      width: "20%",
      ...getColumnSearchProps("proposalNo", searchInput, searchedColumn, searchText, handleSearch, handleReset, setSearchText, setSearchedColumn),
    },
    {
      title: "Client Name",
      dataIndex: "toCompanyName",
      key: "toCompanyName",
      width: "20%",
      ...getColumnSearchProps("toCompanyName", searchInput, searchedColumn, searchText, handleSearch, handleReset, setSearchText, setSearchedColumn),
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
      ...getColumnSearchProps("proposalTotal", searchInput, searchedColumn, searchText, handleSearch, handleReset, setSearchText, setSearchedColumn),
      render: (_, item) => <>{Number(item?.proposalTotal).toFixed(2)}</>,
    },
    {
      title: <div className="">Download</div>,
      dataIndex: "download",
      key: "download",
      width: "10%",
      render: (_, item) => (
        <div className="">
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
