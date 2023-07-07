import React from "react";
import { Form, Input, Select } from "antd";
import FormButtons from "../ANTD/FormButtons";

export default function CreateForm({ form, onFinish }) {
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
              type: "email",
            },
          ]}
          required
          className="w-full"
        >
          <Input className="rounded" />
        </Form.Item>
        <Form.Item
          label="Permission"
          name="permission"
          required
          className="w-full"
        >
          <Select
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
          <FormButtons content="Save" />
        </Form.Item>
      </div>
    </Form>
  );
}
