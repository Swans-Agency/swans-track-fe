import React, { useRef, useState } from "react";
import { deleteAxios } from "@/functions/ApiCalls";
import { UserAddOutlined } from "@ant-design/icons";
import CreateModal from "./CreateModal";
import UpdateModal from "./UpdateModal";
import TableANTD from "../ANTD/TableANTD";
import { Button, Input, Popconfirm, Space } from "antd";
import { EditOutlined,UserDeleteOutlined,QuestionCircleOutlined, SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";


export default function ClientView({ userPermission }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
  const [updateClient, setUpdateClient] = useState();
  const [reloadData, setReloadData] = useState();
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
      width: "20%",
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
      width: "20%",
    },
    {
      title: "Phone number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      width: "15%",
      ...getColumnSearchProps("phoneNumber"),
    },
    {
      title: "Interest Level",
      dataIndex: "interestLevel",
      key: "interestLevel",
      width: "15%",
      ...getColumnSearchProps("interestLevel"),
    },
    {
      title: "Referral Source",
      dataIndex: "referralSource",
      key: "referralSource",
      width: "15%",
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
        <div className = "text-center">
        <EditOutlined
          key="edit"
          style={{ color: "#3b82f6" }}
          onClick={() => showModalUpdate(item)}
        />
        </div>
      ),
      width: "5%",
    },
    {
      title: <div className="text-center">Delete</div>,
      dataIndex: "delete",
      key: "delete",
      render: (_, item) => (
        <div className="text-center">
          {userPermission == "Supervisor" ? (
            <Popconfirm
              title="Delete"
              description={
                userPermission == "Supervisor"
                  ? `Are you sure you want to delete ${item?.firstName}?`
                  : "You don't have the permission to delete"
              }
              onConfirm={
                userPermission == "Supervisor"
                  ? () => deleteTeamMember(item)
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
              <UserDeleteOutlined
                key="delete"
                style={
                  userPermission === "Supervisor"
                    ? { color: "red" }
                    : { color: "gray" }
                }
                className={
                  userPermission === "Supervisor"
                    ? "hover:cursor-pointer"
                    : "hover:cursor-not-allowed"
                }
              />
            </Popconfirm>
          ) : (
            <>
              <UserDeleteOutlined
                key="delete"
                style={
                  userPermission === "Supervisor"
                    ? { color: "red" }
                    : { color: "gray" }
                }
                className={
                  userPermission === "Supervisor"
                    ? "hover:cursor-pointer"
                    : "hover:cursor-not-allowed"
                }
              />
            </>
          )}
        </div>
      ),
      width: "5%",
    },
  ];

  const showModal = () => {
    setIsModalOpen(true);
  };

  const showModalUpdate = (item) => {
    setTimeout(() => setUpdateClient(item), 100);
    setIsModalOpenUpdate(true);
  };

  const deleteTeamMember = async (data) => {
    const url = `${process.env.DIGITALOCEAN}/client/edit-client/${data.id}`;
    await deleteAxios(url, true, true);
    setReloadData({});
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-maincl mb-3">Clients List</h1>
      <div className="flex justify-end">
        <button
          onClick={showModal}
          className="flex gap-x-2 hover:bg-mainBackground hover:text-white text-black rounded py-[0.4rem] px-3  mb-3"
        >
          <UserAddOutlined className=" pt-1" />
          Add client
        </button>
      </div>
      <TableANTD
        columns={columns}
        url={`${process.env.DIGITALOCEAN}/client/get-paginated-clients/`}
        reloadData={reloadData}
      />
      <CreateModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setReloadData={setReloadData}
      />
      {updateClient && (
        <UpdateModal
          isModalOpen={isModalOpenUpdate}
          setIsModalOpen={setIsModalOpenUpdate}
          updateClient={updateClient}
          setUpdateClient={setUpdateClient}
          setReloadData={setReloadData}
        />
      )}
    </div>
  );
}
