import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  EditOutlined,
} from "@ant-design/icons";
import TableANTD from "../ANTD/TableANTD";
import CreateForm from "./CreateForm";
import TeamForm from "./TeamForm";

export default function TeamView({ userPermission }) {
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
  const [updateItem, setUpdateItem] = useState();


  const columns = [
    {
      title: "E-mail",
      dataIndex: "username",
      key: "username",
      render: (_, item) => <div className="text-left">{item?.username}</div>,
    },
    {
      title: "First name",
      dataIndex: "name",
      key: "name",
      render: (_, item) => <div>{item?.userProfile?.firstName}</div>,
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      render: (_, item) => <>{item?.userProfile?.phoneNumber}</>,
    },
    {
      title: "DOB",
      dataIndex: "dob",
      key: "dob",
      render: (_, item) => <>{item?.userProfile?.dob}</>,
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
      render: (_, item) => <>{item?.userProfile?.position}</>,
    },
    {
      title: "Permission",
      dataIndex: "permission",
      key: "permission",
    },
    {
      title: "Join date",
      dataIndex: "date_joined",
      key: "date_joined",
      render: (_, item) => (
        <>{moment.utc(item?.date_joined).local().format("MMMM DD, YYYY")}</>
      ),
    },
    {
      title: <div className="flex justify-center">Edit</div>,
      dataIndex: "edit",
      key: "edit",
      render: (_, item) => {
        return (
          <div className="flex items-center justify-center">
            <EditOutlined
              key="edit"
              style={{ color: "#3b82f6" }}
              onClick={() => showModalUpdate(item)}
            />
          </div>
        );
      },
    },
  ];

  const showModalUpdate = (item) => {
    setTimeout(() => setUpdateItem(item), 100);
    setIsModalOpenUpdate(true);
  };

  const handleOk = () => {
    setIsModalOpenUpdate(false);
    setUpdateItem(null)
  };
  const handleCancel = () => {
    setIsModalOpenUpdate(false);
    setUpdateItem(null)
  };

  return (
    <TableANTD
      columns={columns}
      getUrl={`${process.env.DIGITALOCEAN}/account/list-employees/`}
      multiDeleteUrl={`${process.env.DIGITALOCEAN}/account/delete-multi-employees/`}
      addButton={true}
      buttonTitle="Add Member"
      addDrawer={true}
      drawerTitle="Add New Member"
      drawerContent={(setReload, onClose) => <CreateForm setReload={setReload} onClose={onClose} />}
      updateModal={true}
      updateTitle="Update Member"
      updateFooter={null}
      handleOkUpdate={handleOk}
      handleCancelUpdate={handleCancel}
      isModalOpenUpdate={isModalOpenUpdate}
      passedItem={updateItem}
      modalContent={(setReload) => <TeamForm updateItem={updateItem} setUpdateItem={setUpdateItem} handleOk={handleOk} setReload={setReload} />}
    />
  );
}
