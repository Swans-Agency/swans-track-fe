import { DatePicker, Form, Input, Select } from 'antd';
import React from 'react';
import FormButtons from '../ANTD/FormButtons';


export default function ClientForm({ form, onFinish}) {
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
              <Form.Item label="First name" name="firstName" className="w-full">
                  <Input className="rounded" />
              </Form.Item>
              <Form.Item label="Last name" name="lastName" className="w-full">
                  <Input className="rounded" />
              </Form.Item>
          </div>
          <Form.Item
              label="Client address"
              name="clientAddress"
              className="w-full"
          >
              <Input className="rounded" />
          </Form.Item>
          <div className="flex gap-x-5 w-full">
              <Form.Item
                  label="E-mail"
                  name="email"
                  rules={[
                      {
                          type: "email",
                      },
                  ]}
                  className="w-full"
              >
                  <Input className="rounded" />
              </Form.Item>
              <Form.Item
                  label="Phone number"
                  name="phoneNumber"
                  className="w-full"
              >
                  <Input className="rounded" />
              </Form.Item>
          </div>
          <div className="flex gap-x-5 w-full">
              <Form.Item
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
          <Form.Item label="Acquire Date" name="createdAt">
              <DatePicker className="rounded w-full" placeholder="" />
          </Form.Item>
          <div className="flex gap-x-5 w-full justify-end">
              <Form.Item>
                  <FormButtons content="Save" />
              </Form.Item>
          </div>
      </Form>
  );
};