import { Popconfirm, Table } from "antd";
import {
  EditOutlined,
  UserDeleteOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import React from "react";
import moment from "moment";

export default function TableMembers({
  teamMembers,
  deleteTeamMember,
  showModal,
}) {
  const columns = [
    {
      title: "E-mail",
      dataIndex: "username",
      key: "username",
      width: "20%",
    },
    {
      title: "Full name",
      dataIndex: "name",
      key: "name",
      render: (_, item) => (
        <>
          {item?.userProfile?.firstName} {item?.userProfile?.lastName}
        </>
      ),
    },
    {
      title: "Phone number",
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
      title: "Edit",
      dataIndex: "edit",
      key: "edit",
      render: (_, item) => (
        <EditOutlined
          key="edit"
          style={{ color: "#3b82f6" }}
          onClick={() => showModal(item)}
        />
      ),
      width: "6.5%",
    },
    {
      title: "Delete",
      dataIndex: "delete",
      key: "delete",
      render: (_, item) => (
        <Popconfirm
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
      ),
      width: "6.5%",
    },
  ];

  return (
    <div className="mt-2">
      <Table
        columns={columns}
        dataSource={teamMembers}
        className="w-[100%]"
        scroll={{
          y: 390,
        }}
      />
    </div>
  );
}
