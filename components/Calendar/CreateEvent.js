import moment from "moment";
import React, { useState } from "react";


import {
  Button,
  Divider,
  Form,
  Input,
  InputNumber,
  TimePicker,
  Space,
  Checkbox,
} from "antd";
import {
  FieldTimeOutlined,
  PlusOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

export default function CreateEvent({ form, onFinish }) {
  const [atendeesCount, setAtendeesCount] = useState(0);

  return (
    <Form
      onFinish={onFinish}
      layout="vertical"
      style={{
        alignContent: "center",
        maxWidth: 600,
      }}
      form={form}
      requiredMark={true}
    >
      <div className="flex gap-x-5 w-full mt-0">
        <Form.Item
          label="Event name"
          name="summary"
          className="w-full"
          required
          rules={[
            {
              required: true
            }
          ]}
        >
          <Input className="rounded w-full" />
        </Form.Item>
        <Form.Item label="Event Location" name="location" className="w-full">
          <Input className="rounded w-full" />
        </Form.Item>
      </div>
      <Form.Item
        label="Event description"
        name="description"
        className="w-full"
      >
        <Input.TextArea className="rounded w-full" />
      </Form.Item>
      <div className="flex gap-x-5 w-full mt-0">
        <Form.Item
          label="Start time"
          name="startTime"
          className="w-full"
          required
          rules={[
            {
              required: true
            }
          ]}
        >
          <TimePicker
            className="custom-button rounded text-black w-full"
            
          />
        </Form.Item>
        <Form.Item label="End time" name="endTime" className="w-full" required
          rules={[
            {
              required: true
            }
          ]}>
          <TimePicker
            className="custom-button rounded text-black w-full"
            
          />
        </Form.Item>
      </div>
      <div className="flex gap-x-5 w-full mt-0">
        <Form.Item
          label="Email reminder - minutes"
          name="emailReminder"
          className="w-full"
        >
          <InputNumber
            min={0}
            className="rounded  w-full"
            addonAfter={<FieldTimeOutlined className="p-1" />}
          />
        </Form.Item>
        <Form.Item
          label="Popup reminder - minutes"
          name="popupReminder"
          className="w-full"
        >
          <InputNumber
            min={0}
            className="rounded w-full"
            addonAfter={<FieldTimeOutlined className="p-1" />}
          />
        </Form.Item>
      </div>
      <Form.Item label="Conference meeting" name="meeting" className="w-full">
        <Checkbox
          onChange={(e) => {
            form.setFieldValue("meeting", e.target.checked);
          }}
        >
          Add Google Meet video conferencing
        </Checkbox>
      </Form.Item>
      <Form.Item label="Attendees" name="attendees" className="w-full">
        <Form.List name="attendees">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} className="grid w-full">
                  <Form.Item
                    {...restField}
                    name={[name, "email"]}
                    rules={[
                      {
                        required: true,
                        message: "Missing email",
                        type: "email",
                      },
                    ]}
                  >
                    <Input
                      placeholder="email"
                      addonAfter={
                        <MinusCircleOutlined
                          className="p-1 text-red-500"
                          onClick={() => {
                            remove(name)
                            setAtendeesCount(atendeesCount - 1);
                          }}
                        />
                      }
                    />
                  </Form.Item>
                </Space>
              ))}
              <Form.Item>
                {atendeesCount < 98 && <Button
                  type="dashed"
                  onClick={() => {
                    add()
                    setAtendeesCount(atendeesCount + 1);
                  }}
                  block
                  className="flex items-center justify-center"
                >
                  <PlusOutlined className="" /> Add attendee
                </Button>}
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Divider />
      <div className="flex gap-x-5 w-full justify-end">
        <Form.Item>
          <button
            htmlType="submit"
            type="primary"
            className="bg-mainBackground hover:bg-foreignBackground text-textButtons rounded py-[0.4rem] px-3 "
          >
            Create
          </button>
        </Form.Item>
      </div>
    </Form>
  );
}
