import React, { useRef, useState } from "react";
import UpdateModal from "./UpdateModal";
import TableANTD from "../ANTD/TableANTD";
import { EditOutlined } from "@ant-design/icons";
import ClientForm from "./ClientForm";
import { getColumnSearchProps } from "@/functions/GeneralFunctions";

export default function ClientView() {
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
  const [updateClient, setUpdateClient] = useState();
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
      title: "E-mail",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email", searchInput, searchedColumn, searchText, handleSearch, handleReset, setSearchText, setSearchedColumn),
    },
    {
      title: "Full name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("firstName", searchInput, searchedColumn, searchText, handleSearch, handleReset, setSearchText, setSearchedColumn),
      render: (_, item) => (
        <>
          {item?.firstName} {item?.lastName}
        </>
      ),
    },
    {
      title: "Phone number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      ...getColumnSearchProps("phoneNumber", searchInput, searchedColumn, searchText, handleSearch, handleReset, setSearchText, setSearchedColumn),
    },
    {
      title: "Interest Level",
      dataIndex: "interestLevel",
      key: "interestLevel",
      ...getColumnSearchProps("interestLevel", searchInput, searchedColumn, searchText, handleSearch, handleReset, setSearchText, setSearchedColumn),
    },
    {
      title: "Referral Source",
      dataIndex: "referralSource",
      key: "referralSource",
      ...getColumnSearchProps("referralSource", searchInput, searchedColumn, searchText, handleSearch, handleReset, setSearchText, setSearchedColumn),
      // render: (_, item) => {
      //   return referralDources[item.referralSource]
      // },
    },
    {
      title: <div className="text-center">Edit</div>,
      dataIndex: "edit",
      key: "edit",
      render: (_, item) => (
        <div className="text-center">
          <EditOutlined
            key="edit"
            style={{ color: "#3b82f6" }}
            onClick={() => showModalUpdate(item)}
          />
        </div>
      ),
    },
  ];

  const showModalUpdate = (item) => {
    setTimeout(() => setUpdateClient(item), 100);
    setIsModalOpenUpdate(true);
    ;
  };

  const handleOk = () => {
    setIsModalOpenUpdate(false);
    setUpdateClient(null)
  };
  const handleCancel = () => {
    setIsModalOpenUpdate(false);
    setUpdateClient(null)
  };

  return (
    <TableANTD
      columns={columns}
      getUrl={`${process.env.DIGITALOCEAN}/client/get-paginated-clients/`}
      multiDeleteUrl={`${process.env.DIGITALOCEAN}/client/multi-delete-clients/`}
      addButton={true}
      buttonTitle="Add Lead"
      addDrawer={true}
      drawerTitle="Add New Client"
      drawerContent={(setReload, onClose) => <ClientForm setReload={setReload} onClose={onClose} />}
      updateModal={true}
      updateTitle="Update Client"
      updateFooter={null}
      handleOkUpdate={handleOk}
      handleCancelUpdate={handleCancel}
      isModalOpenUpdate={isModalOpenUpdate}
      passedItem={updateClient}
      modalContent={(setReload) => <UpdateModal updateClient={updateClient} handleOk={handleOk} setUpdateClient={setUpdateClient} setReload={setReload} />}
    />
  );
}
