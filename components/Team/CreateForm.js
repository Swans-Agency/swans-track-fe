import React, { useState } from "react";
import { Form, Input, Select } from "antd";
import FormButtons from "../ANTD/FormButtons";
import { postAxios } from "@/functions/ApiCalls";
import { NotificationError } from "@/functions/Notifications";
import { LoadingOutlined } from "@ant-design/icons";

export default function CreateForm({ setReload, onClose }) {
  const [isLoading, setIsLoading] = useState(false);

  const [form] = Form.useForm();


  const onFinish = async (data) => {
    setIsLoading(true);
    const url = `${process.env.DIGITALOCEAN}/account/signup/`;
    let res = await postAxios(url, data, true, true, () => { }, false);
    if (!res) {
      NotificationError({ detail: "User either already exists or you have reached the maximum number of users allowed." })
    }
    setReload({ data: "dataq" });
    onClose()
    setIsLoading(false);
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
      <div className="flex gap-x-5 w-full">
        <Form.Item
          label="E-mail"
          name="username"
          rules={[
            {
              required: true,
              type: "email",
            },
          ]}
          required
          className="w-full"
        >
          <Input size="large" className="rounded-lg" />
        </Form.Item>
        <Form.Item
          label="Permission"
          name="permission"
          required
          rules={[
            {
              required: true,
            },
          ]}
          className="w-full rounded-lg"
        >
          <Select
            size="large"
            className="!rounded-lg"
            options={[
              {
                value: "Employee",
                label: "Employee",
              },
              {
                value: "Supervisor",
                label: "Supervisor",
              },
            ]}
          />
        </Form.Item>
      </div>
      <div className="text-xs font-light tracking-wide text-black">
        <p>
          * Employee | Restricted access, can't edit company and account
          settings.
        </p>
        <p>
          * Supervisor | Full access, can edit company and account settings.
        </p>
      </div>

      <div className="flex gap-x-5 w-full justify-end">
        <Form.Item>
          <FormButtons content="Save" isLoading={isLoading} />
        </Form.Item>
      </div>
    </Form>
  );
}
