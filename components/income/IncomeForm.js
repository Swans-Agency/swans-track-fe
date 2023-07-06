import React, { useState } from "react";
import moment from "moment";
import { MoneyCollectOutlined, PlusOutlined } from "@ant-design/icons";
import {
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
} from "antd";
import { postAxios } from "@/functions/ApiCalls";
import { getAxios } from "@/functions/ApiCalls";
import FormButtons from "../ANTD/FormButtons";

export default function IncomeForm({ setReloadData }) {
  const [form] = Form.useForm();
  const [proposalData, setProposalData] = useState([]);

  const searchProposal = async (value) => {
    const url = `${process.env.DIGITALOCEAN}/search/invoice?search=${value}`;
    const proposalSearchData = await getAxios(url);
    const arrData = proposalSearchData?.map((item) => ({
      value: item.id,
      label: `${item?.invoiceNo} | ${item?.toCompanyName} | ${
        item?.invoiceDate
      } | ${Number(item?.invoiceTotal).toFixed(2)} JD`,
    }));
    setProposalData(arrData);
  };

  const onFinish = async (data) => {
    const formData = new FormData();
    formData.append("description", data?.description);
    formData.append("invoice", data?.invoice);
    formData.append("paymentMethod", data?.paymentMethod);
    formData.append("date", moment(new Date(data?.date)).format("YYYY-MM-DD"));
    formData.append("amount", data?.amount);

    if (data.attachment && data.attachment.file) {
      formData.append("attachment", data.attachment.file.originFileObj);
    }

    const url = `${process.env.DIGITALOCEAN}/invoice/create-income/`;
    let res = await postAxios(url, formData, true, true, setReloadData);
    setReloadData(res);
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
      requiredMark={true}
    >
      <div className="flex gap-x-5 w-full mt-0">
        <Form.Item
          label="Income Description"
          name="description"
          className="w-full"
          required
        >
          <Input className="rounded" />
        </Form.Item>
        <Form.Item
          label="Payment Amount"
          name="amount"
          className="w-full"
          required
        >
          <InputNumber
            min={0}
            className="rounded w-full"
            addonAfter={<MoneyCollectOutlined className="pb-1" />}
          />
        </Form.Item>
      </div>
      <div className="flex gap-x-5 w-full mt-0">
        <Form.Item
          label="Payment Method"
          name="paymentMethod"
          className="w-full"
          required
        >
          <Select
            showSearch
            defaultValue=""
            style={{
              width: "100%",
            }}
            onChange={(e) => {
              form.setFieldValue("paymentMethod", e);
            }}
            allowClear={true}
            filterOption={true}
            options={[
              { label: "Cash", value: "Cash" },
              { label: "Cheque", value: "Cheque" },
              { label: "Bank Transfer", value: "Bank Transfer" },
              { label: "Money Transfer", value: "Money Transfer" },
              { label: "CLIQ", value: "CLIQ" },
              { label: "Paypal", value: "Paypal" },
              { label: "Stripe", value: "Stripe" },
              { label: "Crypto Currency", value: "Crypto Currency" },
              { label: "Bitcoin", value: "Bitcoin" },
              { label: "Ethereum", value: "Ethereum" },
            ]}
          />
        </Form.Item>
        <Form.Item label="Income Date" name="date" className="w-full" required>
          <DatePicker
            format="YYYY-MM-DD"
            className="rounded w-full"
            placeholder=""
          />
        </Form.Item>
      </div>
      <Form.Item label="Link to Invoice" name="invoice" className="w-full">
        <Select
          showSearch
          defaultValue=""
          style={{
            width: "100%",
          }}
          onChange={(e) => {
            form.setFieldValue("invoice", e);
          }}
          allowClear={true}
          filterOption={false}
          onSearch={searchProposal}
          options={proposalData}
        />
      </Form.Item>
      <Form.Item label="Attachment" className="" name={"attachment"}>
        <Upload listType="picture-card" maxCount={1} accept="image/*">
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
      <Divider />
      <div className="flex gap-x-5 w-full justify-end">
        <Form.Item>
          <FormButtons content="Save" />
        </Form.Item>
      </div>
    </Form>
  );
}
