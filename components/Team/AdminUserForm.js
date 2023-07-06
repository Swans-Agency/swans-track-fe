import React, { useEffect, useState } from "react";
import moment from "moment";

import { Form } from "antd";
import dayjs from "dayjs";
import { patchAxios } from "@/functions/ApiCalls";
import DrawerANTD from "../ANTD/DrawerANTD";
import TeamForm from "./TeamForm";

export default function AdminUserForm({
  isModalOpenUpdate,
  setIsModalOpenUpdate,
  updateItem,
  setUpdateItem,
  reloadData,
  setReloadData,
}) {
  const [form] = Form.useForm();
  const [userData, setUserData] = useState();
  let initialPicList = [];

  useEffect(() => {
    getUserInitialData();
  }, [reloadData]);

  const getUserInitialData = () => {
    if (updateItem) {
      let initialData = {
        firstName: updateItem.userProfile.firstName,
        lastName: updateItem?.userProfile?.lastName,
        phoneNumber: updateItem?.userProfile?.phoneNumber,
        position: updateItem?.userProfile?.position,
        bio: updateItem?.userProfile?.bio,
        salary: updateItem?.userProfile?.salary,
        socialSecurityNumber: updateItem?.userProfile?.socialSecurityNumber,
        dob: updateItem?.userProfile?.dob
          ? dayjs(new Date(updateItem?.userProfile?.dob))
          : dayjs("1998-01-01"),
        pfp: updateItem?.userProfile?.pfp
          ? updateItem?.userProfile?.pfp.split("?")[0]
          : "",
      };
      if (initialPicList.length < 1) {
        initialPicList.push({
          uid: "-1",
          name: "image.png",
          status: "done",
          url: initialData?.pfp,
        });
      }
      form.setFieldsValue(initialData);
      setUserData(updateItem?.userProfile?.id);
    }
  };

  const handleOk = () => {
    setIsModalOpenUpdate(false);
    setUpdateItem(null);
  };

  const handleCancel = () => {
    setIsModalOpenUpdate(false);
    setUpdateItem(null);
  };

  const onFinish = async (data) => {
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("bio", data.bio);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("salary", data.salary);
    formData.append("socialSecurityNumber", data.socialSecurityNumber);
    formData.append("dob", moment(new Date(data.dob)).format("YYYY-MM-DD"));
    formData.append("position", data.position);
    if (data.pfp && data.pfp.file) {
      formData.append("pfp", data.pfp.file.originFileObj);
    }
    const url = `${process.env.DIGITALOCEAN}/account/user-profile/${userData}`;
    await patchAxios(url, formData, true, true, () => {});
    setUpdateItem(null);
    setReloadData({});
  };

  return (
    <DrawerANTD
      title="Update Member Profile"
      open={isModalOpenUpdate}
      onClose={handleCancel}
      children={
        <TeamForm
          form={form}
          onFinish={onFinish}
          initialPicList={initialPicList}
        />
      }
    />
  );
}
