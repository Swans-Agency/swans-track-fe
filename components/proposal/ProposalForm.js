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
import FormButtons from "../ANTD/FormButtons";

export default function ProposalForm({ setReload, onClose, getAllProposals=()=>{}}) {
  const [disabledSelectCurrency, setDisabledCurrency] = useState(false);
  const [clientData, setClientData] = useState([]);
  const [numberofItems, setNumberofItems] = useState(0);
  const [form] = Form.useForm();
  let logoPicList = [];
  let signaturePicList = [];
  const [clientsData, setClientsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    GetAllClient()
  }, []);

  const GetAllClient = async () => {
    const url = `${process.env.DIGITALOCEAN}/client/get-clients/`;
    const clientSearchData = await getAxios(url);
    const arrData = clientSearchData?.map((item) => ({
      value: item.id,
      label: `${item.firstName} ${item.lastName}`,
    }));
    setClientsData(arrData);
  };

  useEffect(() => {
    getUserInitialData();
  }, []);

  const getUserInitialData = async () => {
    const url = `${process.env.DIGITALOCEAN}/company/company-preferences/`;
    let data = await getAxios(url);
    ;
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

  const onFinish = async (data) => {
    setIsLoading(true);
    data["proposalDate"] = moment(new Date(data["proposalDate"])).format(
      "YYYY-MM-DD"
    );

    const url = `${process.env.DIGITALOCEAN}/invoice/create-proposal/`;
    let res = await postAxios(url, data, true, true, ()=>{});
    getAllProposals()
    setReload(res);
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
      requiredMark={true}
    >
      <div className="flex gap-x-5 w-full mt-0">
        <Form.Item label="Client" name="client" className="w-full" required>
          <Select
            size="large"
            showSearch
            defaultValue=""
            style={{
              width: "100%",
            }}
            onChange={(e) => {
              form.setFieldValue("client", e);
              getSelectedClient(e);
            }}
            filterOption={false}
            onSearch={searchClient}
            options={clientsData}
          />
        </Form.Item>
        <Form.Item
          label="Client email"
          name="toCompanyEmail"
          className="w-full"
          required
        >
          <Input size="large" className="rounded-lg" />
        </Form.Item>
      </div>

      <div className="flex gap-x-5 w-full mt-0">
        <Form.Item
          label="Client name"
          name="toCompanyName"
          className="w-full"
          required
        >
          <Input size="large" className="rounded-lg" />
        </Form.Item>
        <Form.Item
          label="Client address"
          name="toCompanyLocation"
          className="w-full"
          required
        >
          <Input size="large" className="rounded-lg" />
        </Form.Item>
      </div>

      <div className="flex gap-x-5 w-full mt-0">
        <Form.Item
          label="Proposal date"
          name="proposalDate"
          className="w-full"
          required
        >
          <DatePicker size="large" className="rounded-lg w-full" placeholder="" />
        </Form.Item>
      </div>
      <Form.Item
        label="Proposal description"
        name="projectDescription"
        className="w-full"
        required
      >
        <Input.TextArea className="rounded-lg" />
      </Form.Item>

      <div className="flex gap-x-5 w-full mt-0">
        <Form.Item
          label="Discount value"
          name="discountAmount"
          className="w-full"
          required
        >
          <InputNumber
            size="large"
            min={0}
            className="rounded-lg  w-full"
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
            size="large"
            min={0}
            className="rounded-lg w-full"
            addonAfter={<PercentageOutlined className="pb-1" />}
          />
        </Form.Item>
      </div>
      <Form.Item
        label="Proposal items"
        name="proposalItems"
        className="w-full"
        required
      >
        <Form.List name="ProposalItems">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} className="grid w-full">
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
                    <Input size="large" placeholder="Item name" />
                  </Form.Item>

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
                        size="large"
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
                        size="large"
                        min={0}
                        className="w-full"
                        placeholder="Item rate"
                      />
                    </Form.Item>
                  </div>
                  <MinusCircleOutlined
                    className="mb-4"
                    onClick={() => {
                      return (
                        <>
                          {remove(name)}
                          {setNumberofItems(numberofItems - 1)}
                        </>
                      )
                    }}
                  />
                </Space>
              ))}
              {numberofItems < 12 && <Form.Item>
                <Button
                  size="large"
                  type="dashed"
                  onClick={() => {
                    return (
                      <>
                        {add()}
                        {setNumberofItems(numberofItems + 1)}
                      </>
                    )
                  }}
                  block
                  icon={<PlusOutlined />}
                >
                  Add field
                </Button>
              </Form.Item>}
            </>
          )}
        </Form.List>
      </Form.Item>
      <Divider />
      <div className="flex gap-x-5 w-full justify-end">
        {/* <Form.Item>
          <FormButtons content="Save" />
        </Form.Item> */}
        {!isLoading ? <Form.Item>
          <FormButtons content="Save" />
        </Form.Item> :
          <div className='flex gap-3 bg-gray-200 p-4 rounded'>
            <LoadingOutlined />
          </div>
        }
      </div>
    </Form>
  );
}
