import React from "react";
import { DatePicker, Form, Input, Select } from "antd";
import moment from "moment";
import FormButtons from "../ANTD/FormButtons";
import { postAxios } from "@/functions/ApiCalls";

export default function ClientForm({ setReload, onClose }) {

  const [form] = Form.useForm();

  const onFinish = async (data) => {
    data["createdAt"] = moment(new Date(data["createdAt"])).format(
      "YYYY-MM-DD"
    );
    const url = `${process.env.DIGITALOCEAN}/client/get-clients/`;
    let res = await postAxios(url, data, true, true);
    setReload(res) 
    onClose()
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
          <Input className="rounded" />
        </Form.Item>
        <Form.Item 
        rules={[
          {
            required: true
          }
        ]} label="Last name" name="lastName" className="w-full">
          <Input className="rounded" />
        </Form.Item>
      </div>
      <Form.Item 
      rules={[
        {
          required: true
        }
      ]} label="Client address" name="clientAddress" className="w-full">
        <Input className="rounded" />
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
          <Input className="rounded" />
        </Form.Item>
        <Form.Item 
        rules={[
          {
            required: true
          }
        ]} label="Phone number" name="phoneNumber" className="w-full">
          <Input className="rounded" />
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
        <DatePicker className="rounded w-full" placeholder="" />
      </Form.Item>
      <div className="flex gap-x-5 w-full justify-end">
        <Form.Item 
        rules={[
          {
            required: true
          }
        ]}>
          <FormButtons content="Save" />
        </Form.Item>
      </div>
    </Form>
  );
}
