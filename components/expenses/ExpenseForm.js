import React from "react";
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
import FormButtons from "../ANTD/FormButtons";

export default function ExoenseForm({ setReload, onClose }) {
  const [form] = Form.useForm();

  const onFinish = async (data) => {
    let obj = {
      description: data?.description,
      amount: data?.amount,
      category: data?.category,
      date: moment(new Date(data?.date)).format("YYYY-MM-DD"),
    };
    const formData = new FormData();
    formData.append("description", data?.description);
    formData.append("amount", data?.amount);
    formData.append("category", data?.category);
    formData.append("date", moment(new Date(data?.date)).format("YYYY-MM-DD"));

    if (data.attachement && data.attachement.file) {
      formData.append("attachement", data.attachement.file.originFileObj);
    }

    const url = `${process.env.DIGITALOCEAN}/company/company-expenses/`;
    let res = await postAxios(url, formData, true, true, ()=>{});
    setReload(res);
    form.resetFields();
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
      requiredMark={true}
    >
      <div className="flex gap-x-5 w-full mt-0">
        <Form.Item
          label="Expense Description"
          name="description"
          className="w-full"
          required
        >
          <Input className="rounded" />
        </Form.Item>
        <Form.Item
          label="Expense Amount"
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
          label="Expense Category"
          name="category"
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
              form.setFieldValue("category", e);
            }}
            allowClear={true}
            filterOption={true}
            options={[
              {
                label: "Advertising/Marketing",
                value: "Advertising/Marketing",
              },
              { label: "Banking Fees", value: "Banking Fees" },
              { label: "Bonus/Gifts", value: "Bonus/Gifts" },
              { label: "Business Insurance", value: "Business Insurance" },
              { label: "Business meetings", value: "Business meetings" },
              { label: "Consulting Fees", value: "Consulting Fees" },
              { label: "Courses/Education", value: "Courses/Education" },
              { label: "Design/Designer", value: "Design/Designer" },
              { label: "Electronics", value: "Electronics" },
              { label: "Employee Benefits", value: "Employee Benefits" },
              { label: "Freelancing job", value: "Freelancing job" },
              { label: "Hosting", value: "Hosting" },
              {
                label: "Insurance/Health insurance",
                value: "Insurance/Health insurance",
              },
              { label: "Interest fees", value: "Interest fees" },
              { label: "Internet bill", value: "Internet bill" },
              { label: "Legal Fees", value: "Legal Fees" },
              { label: "Mailing services", value: "Mailing services" },
              { label: "Maintenance/Repairs", value: "Maintenance/Repairs" },
              { label: "Office equipment", value: "Office equipment" },
              { label: "Office Rent", value: "Office Rent" },
              { label: "Office supplies", value: "Office supplies" },
              { label: "Payroll/Salary", value: "Payroll/Salary" },
              { label: "Rent/Accommodation", value: "Rent/Accommodation" },
              { label: "Servers", value: "Servers" },
              {
                label: "Software Subscriptions",
                value: "Software Subscriptions",
              },
              {
                label: "Storage/Cloud storage",
                value: "Storage/Cloud storage",
              },
              { label: "Tax/Federal tax", value: "Tax/Federal tax" },
              {
                label: "Training and Development",
                value: "Training and Development",
              },
              { label: "Transportation", value: "Transportation" },
              { label: "Travel", value: "Travel" },
              { label: "Utility bills", value: "Utility bills" },
              { label: "Website Development", value: "Website Development" },
            ]}
          />
        </Form.Item>
        <Form.Item label="Expense Date" name="date" className="w-full" required>
          <DatePicker
            format="YYYY-MM-DD"
            className="rounded w-full"
            placeholder=""
          />
        </Form.Item>
      </div>
      <Form.Item label="Attachement" className="" name={"attachement"}>
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
