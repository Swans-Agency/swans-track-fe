import React from "react";
import { Button, Form, Input, InputNumber } from "antd";
import { NotificationSuccess } from "@/functions/Notifications";

/* eslint-disable no-template-curly-in-string */
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
/* eslint-enable no-template-curly-in-string */

const onFinish = (values) => {
  console.log(values);
  NotificationSuccess();
};

export default function SupportForm(props) {
  return (
    <>
      <div className="text-3xl font-light tracking-tight mb-3">
        <h1>Love to Hear from you</h1>
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
          name={["user", "name"]}
          label="Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["user", "email"]}
          label="Email"
          rules={[
            {
              type: "email",
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["user", "phone"]}
          label="Phone Number"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
        >
          <InputNumber min={0} className="rounded  w-full" />
        </Form.Item>

        <Form.Item
          name={["user", "Description"]}
          label="Description"
          rules={[
            { required: true, message: "Please input your Description!" },
          ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item
        //  className="flex flex-row-reverse"
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
        {/* <NotificationSuccess/> */}
      </Form>
    </>
  );
}
