import { DatePicker, Form, Input, InputNumber, Upload } from "antd";
import React from "react";
import FormButtons from "../ANTD/FormButtons";
import { PlusOutlined } from "@ant-design/icons";

export default function TeamForm({ form, onFinish, initialPicList }) {
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
          listType="picture-circle"
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
          <Input className="rounded" />
        </Form.Item>
        <Form.Item label="Last name" name="lastName" className="w-full">
          <Input className="rounded" />
        </Form.Item>
      </div>
      <Form.Item label="Bio" name="bio" className="w-full">
        <Input.TextArea rows={3} className="rounded" />
      </Form.Item>
      <div className="flex gap-x-5 w-full">
        <Form.Item label="Phone number" name="phoneNumber" className="w-full">
          <Input className="rounded" />
        </Form.Item>
        <Form.Item label="Date of birth" className="w-full" name="dob">
          <DatePicker className="rounded w-full" placeholder="" />
        </Form.Item>
      </div>
      <div className="flex gap-x-5 w-full">
        <Form.Item label="Salary" name="salary" className="w-full">
          <InputNumber min={0} className="rounded w-full" />
        </Form.Item>
        <Form.Item
          label="Social security Number"
          name="socialSecurityNumber"
          className="w-full"
        >
          <InputNumber min={0} className="rounded w-full" />
        </Form.Item>
      </div>
      <Form.Item label="Position" name="position" className="w-full">
        <Input className="rounded" />
      </Form.Item>
      <div className="flex gap-x-5 w-full justify-end">
        <Form.Item>
          <FormButtons content="Save" />
        </Form.Item>
      </div>
    </Form>
  );
}
