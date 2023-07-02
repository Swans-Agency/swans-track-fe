import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  PercentageOutlined,
  MoneyCollectOutlined,
  PlusOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
} from "antd";
import { getAxios, postAxios } from "@/functions/ApiCalls";

export default function InvoiceForm({ setReloadData }) {
  const [disabledSelectCurrency, setDisabledCurrency] = useState(false);
  const [discountPercentage, setDiscountPercentage] = useState(true);
  const [clientData, setClientData] = useState([]);
  const [proposalData, setProposalData] = useState([]);
  const [form] = Form.useForm();
  let logoPicList = [];
  let signaturePicList = [];

  useEffect(() => {
    getUserInitialData();
  }, []);

  const getUserInitialData = async () => {
    const url = `${process.env.DIGITALOCEAN}/company/company-preferences/`;
    let data = await getAxios(url);
    console.log(data);
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
      data[0].currency ? setDisabledCurrency(true) : setDisabledCurrency(false);
    }
  };

  const searchClient = async (value) => {
    const url = `${process.env.DIGITALOCEAN}/search/client?search=${value}`;
    const clientSearchData = await getAxios(url);
    const arrData = clientSearchData?.map((item) => ({
      value: item.id,
      label: `${item.firstName} ${item.lastName}`,
    }));
    setClientData(arrData);
  };

  const searchProposal = async (value) => {
    const url = `${process.env.DIGITALOCEAN}/search/proposal?search=${value}`;
    const proposalSearchData = await getAxios(url);
    const arrData = proposalSearchData?.map((item) => ({
      value: item.id,
      label: `${item?.proposalNo} | ${item?.toCompanyName} | ${
        item?.proposalDate
      } | ${Number(item?.proposalTotal).toFixed(2)} JD`,
    }));
    setProposalData(arrData);
  };

  const getSelectedClient = async (value) => {
    const url = `${process.env.DIGITALOCEAN}/client/get-client/${value}`;
    const clientData = await getAxios(url);
    form.setFieldValue(
      "toCompanyName",
      `${clientData?.firstName} ${clientData?.lastName}`
    );
    form.setFieldValue("toCompanyLocation", clientData?.lastName);
    form.setFieldValue("toCompanyEmail", clientData?.email);
  };

  const percentageSwitch = (checked) => {
    console.log(checked);
    setDiscountPercentage(checked);
  };

  const onFinish = async (data) => {
    console.log(data);
    data["invoiceDate"] = moment(new Date(data["invoiceDate"])).format(
      "YYYY-MM-DD"
    );

    const url = `${process.env.DIGITALOCEAN}/invoice/create-invoice/`;
    let res = await postAxios(url, data);
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
        <Form.Item label="Client" name="client" className="w-full" required>
          <Select
            showSearch
            defaultValue=""
            style={{
              width: "100%",
            }}
            onChange={(e) => {
              console.log(e, "<<<<<<<<<<<<<<<<");
              form.setFieldValue("client", e);
              getSelectedClient(e);
            }}
            filterOption={false}
            onSearch={searchClient}
            options={clientData}
          />
        </Form.Item>
        <Form.Item
          label="Client email"
          name="toCompanyEmail"
          className="w-full"
          required
        >
          <Input className="rounded" />
        </Form.Item>
      </div>

      <div className="flex gap-x-5 w-full mt-0">
        <Form.Item
          label="Client name"
          name="toCompanyName"
          className="w-full"
          required
        >
          <Input className="rounded" />
        </Form.Item>
        <Form.Item
          label="Client address"
          name="toCompanyLocation"
          className="w-full"
          required
        >
          <Input className="rounded" />
        </Form.Item>
      </div>

      <Form.Item
        label="Link to existing proposal"
        name="proposalNo"
        className="w-full"
      >
        <Select
          showSearch
          defaultValue=""
          style={{
            width: "100%",
          }}
          onChange={(e) => {
            console.log(e, "<<<<<<<<<<<<<<<<");
            form.setFieldValue("proposalNo", e);
          }}
          allowClear={true}
          filterOption={false}
          onSearch={searchProposal}
          options={proposalData}
        />
      </Form.Item>

      <div className="flex gap-x-5 w-full mt-0">
        {/* <Form.Item label="Invoice no" name="invoiceNo" className='w-full' required>
                    <Input className='rounded' />
                </Form.Item> */}
        <Form.Item
          label="Invoice date"
          name="invoiceDate"
          className="w-full"
          required
        >
          <DatePicker className="rounded w-full" placeholder="" />
        </Form.Item>
      </div>
      {/* <Form.Item label="Invoice description" name="projectDescription" className='w-full' required>
                <Input.TextArea className='rounded' />
            </Form.Item> */}
      {/* <Form.Item label="Terms conditions" name="termsConditions" className='w-full' required>
                <Input.TextArea className='rounded' />
            </Form.Item> */}
      {/* <div className='flex gap-x-5 w-full'>
          <Form.Item label="Discount Type" name="DiscountType" className='w-full' required>
            <Switch label="Discount Type" className='bg-gray-400' onChange={percentageSwitch} checkedChildren="Percentage" unCheckedChildren="Value" defaultChecked />
          </Form.Item>

              {discountPercentage ? <Form.Item label="Discount percentage" name="discountPercentage" className='w-full' required>
                  <Input className='rounded' addonAfter={<PercentageOutlined className='pb-1' />} />
          </Form.Item> :
        //   }
          </div> */}
      <div className="flex gap-x-5 w-full mt-0">
        <Form.Item
          label="Discount value"
          name="discountAmount"
          className="w-full"
          required
        >
          <InputNumber
            min={0}
            className="rounded w-full"
            addonAfter={<MoneyCollectOutlined className="pb-1" />}
          />
        </Form.Item>
        <Form.Item
          label="Tax percentage"
          name="taxPercentage"
          className="w-full"
          required
        >
          <InputNumber
            min={0}
            className="rounded w-full"
            addonAfter={<PercentageOutlined className="pb-1" />}
          />
        </Form.Item>
      </div>
      <Form.Item
        label="Invoice items"
        name="invoiceItems"
        className="w-full"
        required
      >
        <Form.List name="invoiceItems">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  //   align="baseline"
                  className="grid w-full"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "itemName"]}
                    rules={[
                      {
                        required: true,
                        message: "Missing item name",
                      },
                    ]}
                  >
                    <Input placeholder="Item name" />
                  </Form.Item>
                  {/* <Form.Item
                                        {...restField}
                                        name={[name, 'itemDescription']}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Missing item description',
                                            },
                                        ]}
                                    >
                                        <Input.TextArea placeholder="Item description" />
                                    </Form.Item> */}
                  <div className="flex gap-x-5 w-full">
                    <Form.Item
                      {...restField}
                      name={[name, "itemQuantity"]}
                      rules={[
                        {
                          required: true,
                          message: "Missing item quantity",
                        },
                      ]}
                      className="w-full"
                    >
                      <InputNumber
                        min={0}
                        placeholder="Item quantity"
                        className="w-full"
                      />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "itemRate"]}
                      rules={[
                        {
                          required: true,
                          message: "Missing item rate",
                        },
                      ]}
                      className="w-full"
                    >
                      <InputNumber
                        min={0}
                        className="w-full"
                        placeholder="Item rate"
                      />
                    </Form.Item>
                  </div>
                  <MinusCircleOutlined
                    className="mb-4"
                    onClick={() => remove(name)}
                  />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add field
                </Button>
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
            className="bg-sidebarbg hover:bg-secondbg text-white rounded py-[0.4rem] px-3 hover:shadow-xl"
          >
            Save
          </button>
        </Form.Item>
      </div>
    </Form>
  );
}
