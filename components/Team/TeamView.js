import React, { useState } from "react";
import ViewButtons from "./ViewButtons";
import TableMembers from "./TableMembers";
import CreateModal from "./CreateModel";
import AdminUserForm from "./AdminUserForm";
import { deleteAxios } from "@/functions/ApiCalls";
import moment from "moment";
import { Popconfirm } from "antd";
import {
  EditOutlined,
  UserDeleteOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

export default function TeamView() {
  const [reloadData, setReloadData] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
  const [updateItem, setUpdateItem] = useState();

  const columns = [
    {
      title: "E-mail",
      dataIndex: "username",
      key: "username",
      render: (_, item) => <div className="text-left">{item?.username}</div>,
      width: "20%",
    },
    {
      title: "First name",
      dataIndex: "name",
      key: "name",
      render: (_, item) => <div>{item?.userProfile?.firstName}</div>,
      width: "10%",
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      render: (_, item) => <>{item?.userProfile?.phoneNumber}</>,
      width: "10%",
    },
    {
      title: "DOB",
      dataIndex: "dob",
      key: "dob",
      render: (_, item) => <>{item?.userProfile?.dob}</>,
      width: "10%",
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
      render: (_, item) => <>{item?.userProfile?.position}</>,
      width: "20%",
    },
    {
      title: "Permission",
      dataIndex: "permission",
      key: "permission",
      width: "10%",
    },
    {
      title: "Join date",
      dataIndex: "date_joined",
      key: "date_joined",
      render: (_, item) => (
        <>{moment.utc(item?.date_joined).local().format("MMMM DD, YYYY")}</>
      ),
      width: "10%",
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
      width: "5%",
    },
    {
      title: <div className="flex justify-center">Delete</div>,
      dataIndex: "delete",
      key: "delete",
      render: (_, item) => {
        return (
          <div className="flex items-center justify-center">
            <Popconfirm
              className="custom-popconfirm"
              title="Delete"
              description={`Are you sure you want to delete ${item?.userProfile?.firstName}?`}
              onConfirm={() => deleteTeamMember(item)}
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
                style={{ color: "red" }}
                className="hover:cursor-pointer"
              />
            </Popconfirm>
          </div>
        );
      },
      width: "5%",
    },
  ];

  const showModalUpdate = (item) => {
    setTimeout(() => setUpdateItem(item), 100);
    setIsModalOpenUpdate(true);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const deleteTeamMember = async (data) => {
    const url = `${process.env.DIGITALOCEAN}/account/signup/${data.id}`;
    await deleteAxios(url);
    setReloadData(true);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-black mb-3">Team Members</h1>
      <ViewButtons showModal={showModal} />
      <TableMembers columns={columns} reloadData={reloadData} />
      <CreateModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setReloadData={setReloadData}
      />
      {updateItem && (
        <AdminUserForm
          isModalOpenUpdate={isModalOpenUpdate}
          setIsModalOpenUpdate={setIsModalOpenUpdate}
          updateItem={updateItem}
          setUpdateItem={setUpdateItem}
          setReloadData={setReloadData}
          reloadData={reloadData}
        />
      )}
    </div>
  );
}
