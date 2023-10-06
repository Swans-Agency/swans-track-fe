import { DatePicker, Form, Input, InputNumber, Upload } from "antd";
import React, { useEffect, useState } from "react";
import FormButtons from "../ANTD/FormButtons";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import moment from "moment";
import { patchAxios } from "@/functions/ApiCalls";
import { NotificationError } from "@/functions/Notifications";

export default function TeamForm({ updateItem, setUpdateItem, setReload }) {
  const [form] = Form.useForm();
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  let initialPicList = [];

  useEffect(() => {
    getUserInitialData();
  }, []);

  const getUserInitialData = () => {
    if (updateItem) {
      console.log({updateItem})
      let initialData = {
        firstName: updateItem?.userProfile?.firstName || null,
        lastName: updateItem?.userProfile?.lastName || null,
        phoneNumber: updateItem?.userProfile?.phoneNumber || null,
        position: updateItem?.userProfile?.position || null,
        bio: updateItem?.userProfile?.bio || null,
        salary: updateItem?.userProfile?.salary || null,
        socialSecurityNumber: updateItem?.userProfile?.socialSecurityNumber || null,
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

  const onFinish = async (data) => {
    setIsLoading(true);
    const formData = new FormData();
    console.log({ data });
    data?.firstName && formData.append("firstName", data?.firstName)  
    data?.lastName && formData.append("lastName", data?.lastName);
    data?.bio && formData.append("bio", data?.bio);
    data?.phoneNumber && formData.append("phoneNumber", data?.phoneNumber);
    data?.salary && formData.append("salary", data?.salary);
    data?.socialSecurityNumber && formData.append("socialSecurityNumber", data?.socialSecurityNumber);
    data?.dob && formData.append("dob", moment(new Date(data?.dob)).format("YYYY-MM-DD"));
    data?.position && formData.append("position", data?.position);
    if (data.pfp && data?.pfp?.file) {
      formData.append("pfp", data?.pfp?.file?.originFileObj);
    }
    const url = `${process.env.DIGITALOCEAN}/account/user-profile/${userData}`;
    await patchAxios(url, formData, true, true, () => { });
    setUpdateItem(null);
    setReload({});
    setIsLoading(false);
  };

  const checkFileSize = (file) => {
    const maxSize = 1024 * 1024; // 1MB in bytes
    if (file.size > maxSize) {
      NotificationError("File size must be less than 1MB");
      // message.error('File size must be less than 1MB');
      return false; // Prevent upload
    }
    return true; // Allow upload
  };

  return (
    <Form
      onFinish={onFinish}
      layout="vertical"
      style={{
        alignContent: "center",
        maxWidth: 600,
      }}
      form={form}
    >
      <Form.Item label="Profile picture" className="mt-4" name={"pfp"}>
        <Upload
          beforeUpload={checkFileSize}
          listType="picture-card"
          maxCount={1}
          defaultFileList={initialPicList}
        >
          <div>
            <PlusOutlined />
            <div
              style={{
                marginTop: 8,
              }}
            >
              Upload
            </div>
          </div>
        </Upload>
      </Form.Item>
      <div className="flex gap-x-5 w-full">
        <Form.Item label="First name" name="firstName" className="w-full">
          <Input size="large" className="rounded-lg" />
        </Form.Item>
        <Form.Item label="Last name" name="lastName" className="w-full">
          <Input size="large" className="rounded-lg" />
        </Form.Item>
      </div>
      <Form.Item label="Bio" name="bio" className="w-full">
        <Input.TextArea rows={4} className="rounded-lg" />
      </Form.Item>
      <div className="flex gap-x-5 w-full">
        <Form.Item label="Phone number" name="phoneNumber" className="w-full">
          <Input size="large" className="rounded-lg" />
        </Form.Item>
        <Form.Item label="Date of birth" className="w-full" name="dob">
          <DatePicker size="large" className="rounded-lg w-full" placeholder="" />
        </Form.Item>
      </div>
      <div className="flex gap-x-5 w-full">
        <Form.Item label="Salary" name="salary" className="w-full">
          <InputNumber size="large" min={0} className="rounded-lg w-full" />
        </Form.Item>
        <Form.Item
          label="Social security Number"
          name="socialSecurityNumber"
          className="w-full"
        >
          <InputNumber size="large" min={0} className="rounded-lg w-full" />
        </Form.Item>
      </div>
      <Form.Item label="Position" name="position" className="w-full">
        <Input size="large" className="rounded-lg" />
      </Form.Item>
      <div className="flex gap-x-5 w-full justify-end">
        {/* <Form.Item>
          <FormButtons content="Save" />
        </Form.Item> */}
        {!isLoading ? <Form.Item>
          <FormButtons content="Save" />
        </Form.Item> :
          <div className='flex gap-3 bg-gray-200 p-4 rounded'>
            <LoadingOutlined />
          </div>
        }
      </div>
    </Form>
  );
}
