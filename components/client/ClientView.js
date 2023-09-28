import React, { useRef, useState } from "react";
import { deleteAxios } from "@/functions/ApiCalls";
import { UserAddOutlined } from "@ant-design/icons";
import CreateModal from "./CreateModal";
import UpdateModal from "./UpdateModal";
import TableANTD from "../ANTD/TableANTD";
import { Button, Input, Popconfirm, Space } from "antd";
import {
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import ClientForm from "./ClientForm";

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
      record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()),
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
      title: "E-mail",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Full name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("firstName"),
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
      ...getColumnSearchProps("phoneNumber"),
    },
    {
      title: "Interest Level",
      dataIndex: "interestLevel",
      key: "interestLevel",
      ...getColumnSearchProps("interestLevel"),
    },
    {
      title: "Referral Source",
      dataIndex: "referralSource",
      key: "referralSource",
      render: (_, item) => {
        if (item.referralSource == "Friends&Family") {
          return <>Friends & Family</>;
        } else if (item.referralSource == "FacebookAds") {
          return <>Facebook Ads</>;
        } else if (item.referralSource == "InstagramAds") {
          return <>Instagram Ads</>;
        } else if (item.referralSource === "GoogleAds") {
          return <>Google Ads</>;
        } else if (item.referralSource === "StreetBanners") {
          return <>Street Banners</>;
        } else if (item.referralSource === "WordOfMouth") {
          return <>Word of Mouth</>;
        } else {
          return <>{item.referralSource}</>;
        }
      },
      ...getColumnSearchProps("referralSource"),
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
    console.log("item", item);
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
    <div>
      {/* <h1 className="text-3xl font-light tracking-tight text-black mb-3">Clients List</h1> */}
      <TableANTD
        columns={columns}
        getUrl={`${process.env.DIGITALOCEAN}/client/get-paginated-clients/`}
        multiDeleteUrl={`${process.env.DIGITALOCEAN}/client/multi-delete-clients/`}
        addButton={true}
        buttonTitle="Add Client"
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
    </div>
  );
}
