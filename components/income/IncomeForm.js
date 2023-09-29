import React, { useState } from "react";
import moment from "moment";
import {
  MoneyCollectOutlined,
  PlusOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import {
  Button,
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
import InvoiceForm from "../invoice/InvoiceForm";
import { NotificationError } from "@/functions/Notifications";

export default function IncomeForm({ setReload, onClose }) {
  const [form] = Form.useForm();
  const [proposalData, setProposalData] = useState([]);
  const [open, setOpen] = useState(false);
  const searchProposal = async (value) => {
    const url = `${process.env.DIGITALOCEAN}/search/invoice?search=${value}`;
    const proposalSearchData = await getAxios(url);
    const arrData = proposalSearchData?.map((item) => ({
      value: item.id,
      label: `${item?.invoiceNo} | ${item?.toCompanyName} | ${item?.invoiceDate
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
    let res = await postAxios(url, formData, true, true, () => { });
    setReload(res);
    form.resetFields();
    onClose();
  };

  const checkFileSize = (file) => {
    const maxSize = 1024 * 1024; // 1MB in bytes
    if (file.size > maxSize) {
      NotificationError("File size must be less than 1MB");
      // message.error('File size must be less than 1MB');
      return false; // Prevent upload
    }
    return true; // Allow upload
  };

  return (
    <>
      {open ? (
        <div>
          <button
            onClick={() => {
              setOpen(false);
            }}
            className="flex gap-3 items-center mb-5 bg-foreignBackground hover:bg-mainBackground text-white px-2 py-1 rounded-lg"
          >
            <ArrowLeftOutlined />
            Back To Income
          </button>
          <InvoiceForm setReload={setReload} onClose={() => setOpen(!open)} />
        </div>
      ) : (
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
                <Input size="large" className="rounded-lg" />
            </Form.Item>
            <Form.Item
              label="Payment Amount"
              name="amount"
              className="w-full"
              required
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
              label="Payment Method"
              name="paymentMethod"
              className="w-full"
              required
            >
              <Select
                  size="large"
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
            <Form.Item
              label="Income Date"
              name="date"
              className="w-full"
              required
            >
              <DatePicker
                  size="large"
                format="YYYY-MM-DD"
                className="rounded-lg w-full"
                placeholder=""
              />
            </Form.Item>
          </div>

          <Form.Item
            label={
              <div className="flex justify-between items-center gap-4 ">
                <p>Link To Invoice</p>

                {/* <button
                  className="font-bold p-1 flex rounded-full items-center hover:bg-mainBackground hover:text-white "
                  onClick={() => setOpen(!open)}
                >
                  <PlusOutlined />
                </button> */}
              </div>
            }
            name="invoice"
            className="w-full "
          >
            <div className="flex items-center gap-1">
              <Select
                  size="large"
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
              <button
                className="p-[0.75rem] flex rounded-lg items-center bg-foreignBackground hover:bg-mainBackground text-white"
                onClick={() => setOpen(!open)}
                title="Create New Invoice"
              >
                <PlusOutlined />
              </button>
            </div>
          </Form.Item>

          <Form.Item label="Attachment" className="" name={"attachment"}>
              <Upload listType="picture-card" maxCount={1} accept="image/*" beforeUpload={checkFileSize}>
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
      )}
    </>
  );
}
