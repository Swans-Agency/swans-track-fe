import React, { useEffect, useState } from "react";
import moment from "moment";
import cookie from "react-cookies";
import { LoadingOutlined, PlusOutlined, QuestionOutlined } from "@ant-design/icons";
import { DatePicker, Divider, FloatButton, Form, Input, Upload, notification } from "antd";

import dayjs from "dayjs";
import { getAxios, patchAxios, postAxios } from "@/functions/ApiCalls";
import FormButtons from "../ANTD/FormButtons";
import FloatButtonJS from "../ANTD/FloatButton";
import { NotificationError } from "@/functions/Notifications";


export default function Profile() {
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [userData, setUserData] = useState();
  const [userCreateDate, setUserCreateDate] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  let initialPicList = [];

  useEffect(() => {
    getUserInitialData();
  }, []);

  const getUserInitialData = async () => {
    const url = `${process.env.DIGITALOCEAN}/account/get-profile/`;
    let data = await getAxios(url);
    console.log({ data })
    
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        if (typeof data[key] === 'string' && data[key].toLowerCase() === 'null') {
          // If the value is a string "null", convert it to null
          data[key] = null;
        }
      }
    }
    console.log({ data })
    
    if (data) {
      data.dob = data?.dob ? dayjs(new Date(data?.dob)) : dayjs("2000-01-01");
      data.pfp = data?.pfp?.split("?")[0];
      if (initialPicList.length < 1) {
        initialPicList.push({
          uid: "-1",
          name: "image.png",
          status: "done",
          url: data?.pfp,
        });
      }
      setUserCreateDate(
        moment
          .utc(data?.createdAt[0]?.date_joined)
          .local()
          .format("MMMM DD, YYYY, h:mm A")
      );
      form.setFieldsValue(data);
      setUserData(data);
    }
  };

  const onFinish = async (data) => {
    setIsLoading1(true)
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("bio", data.bio);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("dob", moment(new Date(data?.dob)).format("YYYY-MM-DD"));
    formData.append("position", data.position);

    formData.append("website", data.website);
    formData.append("linkedin", data.linkedin);
    formData.append("facebook", data.facebook);
    formData.append("instagram", data.instagram);
    formData.append("twitter", data.twitter);
    
    
    if (data.pfp && data.pfp.file) {
      formData.append("pfp", data.pfp.file.originFileObj);
    }
    const url = `${process.env.DIGITALOCEAN}/account/user-profile/${userData.id}`;
    await patchAxios(url, formData, true, true, () => { });
    getUserInitialData();
    setIsLoading1(false)
  };

  const onFinishPassword = async (data) => {
    setIsLoading(true)
    const url = `${process.env.DIGITALOCEAN}/account/update-password/`;
    await postAxios(url, data, true, true, () => { });
    passwordForm.resetFields();
    setIsLoading(false)
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
    <div className="text-black">
      {/* <h1 className="text-3xl font-light tracking-tight text-black">Profile</h1> */}
      <Form
        onFinish={onFinish}
        layout="vertical"
        style={{
          alignContent: "center",
        }}
        className="desktop:max-w-[600px]"
        form={form}
        initialValues={userData}
      >
        <Form.Item label="Profile picture" className="mt-4" name={"pfp"}>
          <Upload
            beforeUpload={checkFileSize}
            listType="picture-card"
            maxCount={1}
            defaultFileList={initialPicList}
          >
            <div>
              <PlusOutlined className="text-black" />
              <div
                className="text-black"
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </div>
          </Upload>
        </Form.Item>
        <div className="laptop:flex gap-x-5 w-full">
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
        <div className="laptop:flex gap-x-5 w-full">
          <Form.Item label="Phone number" name="phoneNumber" className="w-full">
            <Input size="large" className="rounded-lg" />
          </Form.Item>
          <Form.Item label="Date of birth" className="w-full" name="dob">
            <DatePicker
              size="large"
              className="rounded-lg w-full custom-date-picker"
              placeholder=""
              popupClassName="custom-date-picker"
              getPopupContainer={(trigger) => {
                const parent = trigger.parentElement;
                parent.classList.add("custom-date-picker");
                return parent;
              }}
            />
          </Form.Item>
        </div>
        <div className="laptop:flex gap-x-5 w-full">
          <Form.Item label="Instagram Username" name="instagram" className="w-full">
            <Input addonBefore="https://instagram.com/" size="large" className="rounded-lg" />
          </Form.Item>
          <Form.Item label="Facebook Username" name="facebook" className="w-full">
            <Input addonBefore="https://facebook.com/" size="large" className="rounded-lg" />
          </Form.Item>
        </div>
        <div className="laptop:flex gap-x-5 w-full">
          <Form.Item label="Linkedin Username" name="linkedin" className="w-full">
            <Input addonBefore="https://linkedin.com/in/" size="large" className="rounded-lg" />
          </Form.Item>
          <Form.Item label="Twitter Username" name="twitter" className="w-full">
            <Input addonBefore="https://twitter.com/" size="large" className="rounded-lg" />
          </Form.Item>
        </div>
          <Form.Item label="Website Link" name="website" className="w-full">
            <Input size="large" className="rounded-lg" />
          </Form.Item>
        <Form.Item label="Position" name="position" className="w-full">
          <Input size="large" className="rounded-lg" disabled />
        </Form.Item>
        <p className="text-gray-400">
          This account was created on {userCreateDate}
        </p>
        <Divider />
        <div className="laptop:flex gap-x-5 w-full justify-end">
          {/* <Form.Item>
            <FormButtons content="Save" />
          </Form.Item> */}
          {!isLoading1 ? <Form.Item>
            <FormButtons content="Save" />
          </Form.Item> :
            <div className='flex gap-3 bg-gray-200 p-4 rounded'>
              <LoadingOutlined />
            </div>
          }
        </div>
      </Form>
      <Divider />
      <h1 className="text-2xl font-bold text-maincl">Login Credentials</h1>
      <Form
        onFinish={onFinishPassword}
        layout="vertical"
        style={{
          alignContent: "center",
        }}
        className="desktop:max-w-[600px]"
        form={passwordForm}
        requiredMark={true}
      >
        <Form.Item label="New password" name="password" className="w-full mt-4" required
          rules={[
            {
              required: true
            }
          ]}>
          <Input required size="large"  type="password" className="rounded-lg" />
        </Form.Item>
        <Form.Item label="Confirm password" name="password2" className="w-full" required
          rules={[
            {
              required: true
            }
          ]}>
          <Input size="large" type="password" className="rounded-lg" />
        </Form.Item>
        <Divider />
        <div className="laptop:flex gap-x-5 w-full justify-end">
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
      <FloatButton
        type="primary"
        icon={<QuestionOutlined />}
        style={{ bottom: 20 }}
        onClick={() => {
          return (
            notification.info({
              message: "Public Profile",
              description: <div>Share your profile with others by using this link: <a
                href={`https://www.swanstrack.com/shared-profile/${cookie.load("username", { path: "/" })}/`}
                className="text-blue-500 hover:text-blue-400 "
              >{`https://www.swanstrack.com/shared-profile/${cookie.load("username", { path: "/" })}/`}</a></div>,
              key: "api",
            }))
        }}
      />
    </div>
  );
}
