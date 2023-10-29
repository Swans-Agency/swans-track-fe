import React, { useState } from "react";
import { Button, Form, Input, InputNumber } from "antd";
import { postAxios } from "@/functions/ApiCalls";
import FormButtons from "../ANTD/FormButtons";
import { LoadingOutlined } from "@ant-design/icons";

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};




export default function SupportForm() {
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values) => {
    setIsLoading(true);
    ;
    const url = `${process.env.DIGITALOCEAN}/company/support/`;
    let response = await postAxios(url, values, true, true, () => { }, true);
    ;
    setIsLoading(false);
  };
  return (
    <>
      <div className="text-3xl font-light tracking-tight mb-1 dark:text-white">
        <h1>Help Us Grow</h1>
        <h1>Get in touch👋</h1>
      </div>

      <Form
        layout="vertical"
        name="nest-messages"
        onFinish={onFinish}
        style={{
          maxWidth: 600,
        }}
        validateMessages={validateMessages}
      >
        <Form.Item
          className="mb-1"
          name={"name"}
          label="Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          className="mb-1"
          name={"email"}
          label="Email"
          rules={[
            {
              type: "email",
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          className="mb-1"
          name={"phone"}
          label="Phone Number"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item
          className="mb-1"
          name={"message"}
          label="Message"
          rules={[
            { required: true, message: "Please input your Description!" },
          ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <FormButtons content="Save" classNames="w-full py-2 font-semibold mt-2" isLoading={isLoading} />
        </Form.Item>
      </Form>
    </>
  );
}
