import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  PercentageOutlined,
  MoneyCollectOutlined,
  PlusOutlined,
  MinusCircleOutlined,
  ArrowLeftOutlined,
  LoadingOutlined,
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
import ProposalForm from "../proposal/ProposalForm";
import { getObjectsFromLocalStorage } from "@/functions/GeneralFunctions";

export default function InvoiceForm({ setReload, onClose, getAllInvoices = () => { } }) {
  const [disabledSelectCurrency, setDisabledCurrency] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [clientData, setClientData] = useState([]);
  const [proposalData, setProposalData] = useState([]);
  const [numberofItems, setNumberofItems] = useState(0);
  const [form] = Form.useForm();
  let logoPicList = [];
  let signaturePicList = [];
  const [clientsData, setClientsData] = useState([]);
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
    getAllProposal()
  }, []);

  const getUserInitialData = async () => {
    const url = `${process.env.DIGITALOCEAN}/company/company-preferences/`;
    let data = await getAxios(url);
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

  const getAllProposal = async () => {
    const url = `${process.env.DIGITALOCEAN}/invoice/get-proposals-all/`;
    const proposalSearchData = await getAxios(url);
    const arrData = proposalSearchData?.map((item) => ({
      value: item.id,
      label: `${item?.proposalNo} | ${Number(item?.proposalTotal).toFixed(2)}${getObjectsFromLocalStorage('companyPreferences')?.currency}`,
    }));
    setProposalData(arrData);
  };

  const searchProposal = async (value) => {
    const url = `${process.env.DIGITALOCEAN}/search/proposal/?search=${value}`;
    const proposalSearchData = await getAxios(url);
    const arrData = proposalSearchData?.map((item) => ({
      value: item.id,
      label: `${item?.proposalNo} | ${Number(item?.proposalTotal).toFixed(2)}${getObjectsFromLocalStorage('companyPreferences')?.currency}`,
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

  const onFinish = async (data) => {
    setIsLoading(true)
    data["invoiceDate"] = moment(new Date(data["invoiceDate"])).format(
      "YYYY-MM-DD"
    );

    const url = `${process.env.DIGITALOCEAN}/invoice/create-invoice/`;
    let res = await postAxios(url, data, true, true, () => { });
    getAllInvoices()
    setReload(res);
    onClose();
    setIsLoading(false)
  };
  return (
    <>
      {open1 ? (
        <div>
          <div
            onClick={() => {
              setOpen1(false);
            }}
            className="hover:cursor-pointer py-2 px-4 bg-[#282828] text-white rounded-lg flex justify-center items-center gap-x-3 mb-3"
          >
            <ArrowLeftOutlined />
            Back To Invoice Form
          </div>
          <ProposalForm
            setReload={setReload}
            onClose={() => {
              setOpen1(false);
            }}
          />
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
            <Form.Item label="Client" name="client" className="w-full" 
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
              rules={[
            {
              required: true,
              message: "This field must be filled"
            }
          ]}
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
              label="Client address"
              name="toCompanyLocation"
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
          </div>

          <Form.Item
            label={
              <div className="flex justify-between items-center gap-4">
                <p>Link to existing proposal</p>
              </div>
            }
            name="proposalNo"
            className="w-full"
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
                  form.setFieldValue("proposalNo", e);
                }}
                allowClear={true}
                filterOption={false}
                onSearch={searchProposal}
                options={proposalData}
              />
              <button
                  className="p-[0.75rem] flex rounded-lg items-center bg-foreignBackground hover:bg-mainBackground hover:dark:bg-[#141414] dark:bg-[#282828] text-white"
                onClick={() => {
                  setOpen1(true)
                }}
                title="Create new proposal"
              >
                <PlusOutlined />
              </button>
            </div>
          </Form.Item>

          <div className="flex gap-x-5 w-full mt-0">
            <Form.Item
              label="Invoice date"
              name="invoiceDate"
              className="w-full"
              required
              rules={[
            {
              required: true,
              message: "This field must be filled"
            }
          ]}
            >
              <DatePicker size="large" className="rounded-lg w-full" placeholder="" />
            </Form.Item>
          </div>
          <div className="flex gap-x-5 w-full mt-0">
            <Form.Item
              label="Discount value"
              name="discountAmount"
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
            <Form.Item
              label="Tax percentage"
              name="taxPercentage"
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
                addonAfter={<PercentageOutlined className="pb-1" />}
              />
            </Form.Item>
          </div>
          <Form.Item
            label="Invoice items"
            name="invoiceItems"
            className="w-full"
            required
          //   rules={[
          //   {
          //     required: true,
          //     message: "This field must be filled"
          //   }
          // ]}
          >
            <Form.List name="invoiceItems">
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
                          );
                        }}
                      />
                    </Space>
                  ))}
                  {numberofItems < 12 && (
                    <Form.Item>
                      <Button
                        size="large"
                        type="dashed"
                        onClick={() => {
                          return (
                            <>
                              {add()}
                              {setNumberofItems(numberofItems + 1)}
                            </>
                          );
                        }}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add field
                      </Button>
                    </Form.Item>
                  )}
                </>
              )}
            </Form.List>
          </Form.Item>
          <Divider />
          <div className="flex gap-x-5 w-full justify-end">
            <Form.Item>
                <FormButtons content="Save" isLoading={isLoading} />
              </Form.Item> 
          </div>
        </Form>
      )}
    </>
  );
}
