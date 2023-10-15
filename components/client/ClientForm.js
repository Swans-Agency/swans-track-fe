import React, { useState } from "react";
import { DatePicker, Form, Input, Select } from "antd";
import moment from "moment";
import FormButtons from "../ANTD/FormButtons";
import { postAxios } from "@/functions/ApiCalls";
import { LoadingOutlined } from "@ant-design/icons";

export default function ClientForm({ setReload, onClose }) {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (data) => {
    setIsLoading(true);
    data["createdAt"] = moment(new Date(data["createdAt"])).format(
      "YYYY-MM-DD"
    );
    const url = `${process.env.DIGITALOCEAN}/client/get-clients/`;
    let res = await postAxios(url, data, true, true);
    form.resetFields()
    setReload(res)
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
      className="custom-form"
      form={form}
    >
      <div className="flex gap-x-5 w-full">
        <Form.Item
          rules={[
            {
              required: true
            }
          ]} label="First name" name="firstName" className="w-full">
          <Input size="large" className="rounded-lg" />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true
            }
          ]} label="Last name" name="lastName" className="w-full">
          <Input size="large" className="rounded-lg" />
        </Form.Item>
      </div>
      <Form.Item
        rules={[
          {
            required: true
          }
        ]} label="Client address" name="clientAddress" className="w-full">
        <Input size="large" className="rounded-lg" />
      </Form.Item>
      <div className="flex gap-x-5 w-full">
        <Form.Item
          rules={[
            {
              required: true
            }
          ]}
          label="E-mail"
          name="email"
          className="w-full"
        >
          <Input size="large" className="rounded-lg" />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true
            }
          ]} label="Phone number" name="phoneNumber" className="w-full">
          <Input size="large" className="rounded-lg" />
        </Form.Item>
      </div>
      <div className="flex gap-x-5 w-full">
        <Form.Item
          rules={[
            {
              required: true
            }
          ]}
          label="Ineterest level"
          name="interestLevel"
          className="w-full"
        >
          <Select
            size="large"
            options={[
              {
                value: "Low",
                label: "Low",
              },
              {
                value: "Medium",
                label: "Medium",
              },
              {
                value: "High",
                label: "High",
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true
            }
          ]}
          label="Referral source"
          name="referralSource"
          className="w-full"
        >
          <Select
            size="large"
            options={[
              {
                value: "Friends&Family",
                label: "Friends & Family",
              },
              {
                value: "FacebookAds",
                label: "Facebook Ads",
              },
              {
                value: "InstagramAds",
                label: "Instagram Ads",
              },
              {
                value: "GoogleAds",
                label: "Google Ads",
              },
              {
                value: "StreetBanners",
                label: "Street Banners",
              },
              {
                value: "WordOfMouth",
                label: "Word of Mouth",
              },
            ]}
          />
        </Form.Item>
      </div>
      <Form.Item
        rules={[
          {
            required: true
          }
        ]} label="Acquire Date" name="createdAt">
        <DatePicker size="large" className="rounded-lg w-full" placeholder="" />
      </Form.Item>
      <div className="flex gap-x-5 w-full justify-end">
        <Form.Item>
          <FormButtons content="Save" isLoading={isLoading} />
        </Form.Item>
      </div>
    </Form>
  );
}
