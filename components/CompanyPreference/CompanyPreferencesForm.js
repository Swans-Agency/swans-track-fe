import React, { useEffect, useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Divider, Form, Input, Select, Upload, notification } from "antd";
import FormButtons from "../ANTD/FormButtons";
import { getAxios, postAxios } from "@/functions/ApiCalls";
import { currencies, getObjectsFromLocalStorage, saveToLocal, timeZones } from "@/functions/GeneralFunctions";
import cookie, { remove } from "react-cookies";
import { NotificationError } from "@/functions/Notifications";

export default function CompanyPreferencesForm() {
  const [invoiceTemplates, setInvoiceTemplates] = useState([]);
  const [quotationTemplates, setQuotationTemplates] = useState([]);
  const [disabledSelectCurrency, setDisabledCurrency] = useState(false);
  const [reloadData, setReloadData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [showUploadList, setShowUploadList] = useState(true);
  const [showUploadList2, setShowUploadList2] = useState(true);
  const [form] = Form.useForm();
  let logoPicList = [];
  let signaturePicList = [];
  const { TextArea } = Input;

  useEffect(() => {
    getUserInitialData();
    getInvoiceTemplates();
  }, [reloadData]);

  useEffect(() => {
    checkforCompanyPreferences()
  }, [])

  const getUserInitialData = async () => {
    const url = `${process.env.DIGITALOCEAN}/company/company-preferences/`;
    let data = await getAxios(url);
    ;
    if (data) {
      if (data[0]) {
        data[0].logo = data[0]?.logo?.split("?")[0];
        if (logoPicList?.length < 1) {
          logoPicList?.push({
            uid: "-1",
            name: "image.png",
            status: "done",
            url: data[0]?.logo,
          });
        }
        data[0].signature = data[0]?.signature?.split("?")[0];
        if (signaturePicList?.length < 1) {
          signaturePicList.push({
            uid: "-1",
            name: "image.png",
            status: "done",
            url: data[0]?.signature,
          });
        }
        form.setFieldsValue(data[0]);
        data[0].currency
          ? setDisabledCurrency(true)
          : setDisabledCurrency(false);
      }
    }
  };

  const checkforCompanyPreferences = async () => {
    let preferences = getObjectsFromLocalStorage("companyPreferences");
    if (!preferences) {
      customNotification();
    }
  }

  const customNotification = (type, message) => {
    notification.info({
      message: "Missing Company Preferences!",
      description: "To ensure that your invoices and quotations are generated correctly, and to ensure best experience, please fill in your company preferences to continue.",
      key: "api",
    })
  }

  const getInvoiceTemplates = async () => {
    const invoiceURL = `${process.env.DIGITALOCEAN}/account/invoice-templates/`;
    const quotationURL = `${process.env.DIGITALOCEAN}/account/quotation-templates/`;
    let invoiceData = await getAxios(invoiceURL);
    let quotationData = await getAxios(quotationURL);
    setInvoiceTemplates(invoiceData);
    setQuotationTemplates(quotationData);
  };

  const formData = new FormData();

  const onFinish = async (data) => {
    setIsLoading(true)
    formData.append("bankIban", data?.bankIban);
    formData.append("timeZone", data?.timeZone);
    formData.append("currency", data?.currency);
    formData.append("position", data?.position);
    formData.append("companyName", data?.companyName);
    formData.append("companyLocation", data?.companyLocation);
    formData.append("companyNumber", data?.companyNumber);
    formData.append("companyEmail", data?.companyEmail);
    formData.append("PTermsConditions", data?.PTermsConditions);
    formData.append("ITermsConditions", data?.ITermsConditions);
    formData.append("CLIQ", data?.CLIQ);

    if (data.logo && data.logo.file) {
      formData.append("logo", data.logo.file.originFileObj);
    }
    if (data.signature && data.signature.file) {
      formData.append("signature", data.signature.file.originFileObj);
    }
    const url = `${process.env.DIGITALOCEAN}/company/company-preferences/`;
    let companyPrefernceSavedData = await postAxios(url, formData, true, true, () => { });
    saveToLocal("companyPreferences", companyPrefernceSavedData);
    setReloadData({});
    setIsLoading(false)
  };

  const checkFileSize = (file) => {
    const maxSize = 1024 * 1024 * 5; // 1MB in bytes
    if (file.size > maxSize) {
      NotificationError("File size must be less than 5MB");
      setShowUploadList(false);
      form.setFieldValue("logo", []);
      // message.error('File size must be less than 5MB');
      return false; // Prevent upload
    }
    setShowUploadList(true);
    return true; // Allow upload
  };

  const checkFileSize2 = (file) => {
    const maxSize = 1024 * 1024 * 5; // 5MB in bytes
    if (file.size > maxSize) {
      NotificationError("File size must be less than 5MB");
      setShowUploadList2(false);
      form.setFieldValue("signature", []);
      // message.error('File size must be less than 5MB');
      return false; // Prevent upload
    }
    setShowUploadList2(true);
    return true; // Allow upload
  };


  return (
    <div className="text-black">
      <Form
        onFinish={onFinish}
        layout="vertical"
        style={{
          alignContent: "center",
        }}
        className="desktop:max-w-[600px]"
        form={form}
        requiredMark={true}
      >
        <div className="flex gap-x-5 w-full ">
          <Form.Item
            label="Company logo"
            className="mt-4"
            name={"logo"}
            required
            rules={[
              {
                required: true
              }
            ]}
          >
            <Upload
              listType="picture-card"
              maxCount={1}
              defaultFileList={logoPicList}
              // fileList={logoPicList}
              beforeUpload={checkFileSize}
              showUploadList={showUploadList}
            >
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
          <Form.Item
            label="Signature"
            className="mt-4"
            name={"signature"}
            required
            rules={[
              {
                required: true
              }
            ]}
          >
            <Upload
              listType="picture-card"
              maxCount={1}
              defaultFileList={signaturePicList}
              beforeUpload={checkFileSize2}
              showUploadList={showUploadList2}
            >
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
        </div>
        <div className="laptop:flex gap-x-5 w-full">
          <Form.Item
            label="Company name"
            name="companyName"
            className="w-full"
            required
            rules={[
              {
                required: true
              }
            ]}
          >
            <Input size="large" className="rounded-lg" />
          </Form.Item>
          <Form.Item
            label="Company address"
            name="companyLocation"
            className="w-full"
            required
            rules={[
              {
                required: true
              }
            ]}
          >
            <Input size="large" className="rounded-lg" />
          </Form.Item>
        </div>
        <div className="laptop:flex gap-x-5 w-full">
          <Form.Item
            label="Company email"
            name="companyEmail"
            className="w-full"
            required
            rules={[
              {
                required: true
              }
            ]}
          >
            <Input size="large" className="rounded-lg" />
          </Form.Item>
          <Form.Item
            label="Company number"
            name="companyNumber"
            className="w-full"
            required
            rules={[
              {
                required: true
              }
            ]}
          >
            <Input size="large" className="rounded-lg" />
          </Form.Item>
        </div>
        <div className="laptop:flex gap-x-5 w-full">
          <Form.Item
            label="Currency"
            name="currency"
            className="w-full"
            required
            rules={[
              {
                required: true
              }
            ]}
          >
            <Select
              size="large"
              disabled={disabledSelectCurrency}
              showSearch
              defaultValue=""
              style={{
                width: "100%",
              }}
              onChange={(e) => {
                ;
                form.setFieldValue("currency", e);
              }}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={currencies}
            />
          </Form.Item>
          <Form.Item
            label="Time zone"
            name="timeZone"
            className="w-full"
            required
            rules={[
              {
                required: true
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
                ;
                form.setFieldValue("timeZone", e);
              }}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={timeZones}
            />
          </Form.Item>
        </div>
        <div className="flex gap-x-5 w-full">
          <Form.Item label={<div><p>Payment Info <span className="text-[0.7rem] text-gray-500">this might be the IBAN, paypal or anything</span></p> </div>} name="bankIban" className="w-full" required
            rules={[
              {
                required: true
              }
            ]}>
            <Input size="large" className="rounded-lg" />
          </Form.Item>
        </div>
        <Form.Item
          label="Proposals Terms & Conditons"
          name="PTermsConditions"
          className="w-full"
          required
          rules={[
            {
              required: true
            }
          ]}
        >
          <TextArea rows={4} className="rounded-lg" />
        </Form.Item>
        <Form.Item
          label="Invoices Terms & Conditons"
          name="ITermsConditions"
          className="w-full"
          required
          rules={[
            {
              required: true
            }
          ]}
        >
          <TextArea rows={4} className="rounded-lg" />
        </Form.Item>
        <Divider />
        <div className="flex gap-x-5 w-full justify-end">
          <Form.Item>
            <FormButtons content="Save" isLoading={isLoading} />
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}
