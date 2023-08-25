import React, { useState } from "react";
import { Form, Input, Select } from "antd";
import FormButtons from "../ANTD/FormButtons";

export default function CalendlyForm(props) {
  const onFinish = async (values) => {
    values.startTime =
      moment(date).format("YYYY-MM-DD") +
      moment(values.startTime).format("[T]HH:mm:ss");
    values.endTime =
      moment(date).format("YYYY-MM-DD") +
      moment(values.endTime).format("[T]HH:mm:ss");
    values.recurrenceTo = moment(values.recurrenceTo).format(
      "YYYY-MM-DD[T]HH:mm:ss"
    );
    let url = `${process.env.DIGITALOCEAN}/tasks/create-event/`;
    let res = await postAxios(url, values, true, true, () => { });
    router.reload();
  };
  return (
    <section>
      <h1 className="font-semibold pb-10 text-center -tracking-tighter">
        Book 30 min appointment on August 11th, 2023
      </h1>
      <Form
        onFinish={onFinish}
        layout="vertical"
        style={{
          alignContent: "center",
          maxWidth: 600,
        }}
        requiredMark={true}
      >
        <div className="flex gap-x-5 w-full mt-0">
          <Form.Item
            label="First name"
            name="firstName"
            className="w-full"
            required
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input className="rounded w-full" size="large" />
          </Form.Item>
          <Form.Item label="Last name" name="lastName" className="w-full">
            <Input className="rounded w-full" size="large" />
          </Form.Item>
        </div>

        <Form.Item
          label="Email"
          rules={[
            {
              required: true,
            },
            { type: "email" },
          ]}
          name="email"
          className="w-full"
        >
          <Input className="rounded w-full" size="large" />
        </Form.Item>

        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          name="appointmentSummary"
          label="Appointment Summary"
        >
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item
          name="timeRange"
          label="Time Range"
          rules={[{ required: true, message: "Province is required" }]}
        >
          <Select placeholder="Select province" size="large">
            {/* <Option value="Zhejiang">Zhejiang</Option> */}
            {/* <Option value="Jiangsu">Jiangsu</Option> */}
          </Select>
        </Form.Item>

        <div className="w-full">
          <Form.Item>
            <FormButtons classNames={"w-full py-[0.5rem]"} content="Book Appointment" />
          </Form.Item>
        </div>
      </Form>
    </section>
  )
}
