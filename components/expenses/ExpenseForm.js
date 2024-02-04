import React, { useState } from "react";
import moment from "moment";
import { LoadingOutlined, MoneyCollectOutlined, PlusOutlined } from "@ant-design/icons";
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
import { NotificationError } from "@/functions/Notifications";
import { expenseCategory } from "@/functions/GeneralFunctions";

export default function ExoenseForm({ setReload, onClose }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showUploadList, setShowUploadList] = useState(true);
  const [form] = Form.useForm();

  const onFinish = async (data) => {
    setIsLoading(true);
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
    let res = await postAxios(url, formData, true, true, () => { });
    setReload(res);
    form.resetFields();
    onClose()
    setIsLoading(false);
  };

  const checkFileSize = (file) => {
    const maxSize = 1024 * 1024 * 5; 
    if (file.size > maxSize) {
      NotificationError("File size must be less than 5MB");
      setShowUploadList(false);
      form.setFieldValue("attachement", null);
      return false; 
    }
    setShowUploadList(true);
    return true; 
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
          rules={[
            {
              required: true,
              message: "This field must be filled"
            }
          ]}

        >
          <Input size="large" className="rounded-lg" />
        </Form.Item>
        <Form.Item
          label="Expense Amount"
          name="amount"
          className="w-full"
          required
          rules={[
            {
              required: true,
              message: "This field must be filled"
            }
          ]}

        >
          <InputNumber
            size="large"
            min={0}
            className="rounded-lg w-full"
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
          rules={[
            {
              required: true,
              message: "This field must be filled"
            }
          ]}

        >
          <Select
            size="large"
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
            options={expenseCategory}
          />
        </Form.Item>
        <Form.Item label="Expense Date" name="date" className="w-full" required
          rules={[
            {
              required: true,
              message: "This field must be filled"
            }
          ]}
        >
          <DatePicker
            size="large"
            format="YYYY-MM-DD"
            className="rounded-lg w-full"
            placeholder=""
          />
        </Form.Item>
      </div>
      <Form.Item label="Attachement" className="" name={"attachement"}>
        <Upload listType="picture-card" maxCount={1} accept="image/*" beforeUpload={checkFileSize} showUploadList={showUploadList} >
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
          <FormButtons content="Save" isLoading={isLoading} />
        </Form.Item>
      </div>
    </Form>
  );
}
