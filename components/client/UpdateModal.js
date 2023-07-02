import { patchData } from "@/functions/ApiCalls";
import { Form, Input, Modal, Select, DatePicker } from "antd";
import dayjs from "dayjs";
import moment from "moment";
import { useEffect, useState } from "react";

export default function UpdateModal({
  isModalOpen,
  setIsModalOpen,
  updateClient,
  setUpdateClient,
  setReloadData,
}) {
  const [clientId, setClientId] = useState();
  const [form] = Form.useForm();

  const handleOk = () => {
    setIsModalOpen(false);
    setUpdateClient(null);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setUpdateClient(null);
  };

  useEffect(() => {
    updateClient["createdAt"] = dayjs(new Date(updateClient["createdAt"]));
    form.setFieldsValue(updateClient);
    setClientId(updateClient["id"]);
  }, []);

  const onFinish = async (data) => {
    console.log(data);
    data["createdAt"] = moment(new Date(data["createdAt"])).format(
      "YYYY-MM-DD"
    );
    const url = `${process.env.DIGITALOCEAN}/client/edit-client/${clientId}`;
    let res = await patchData(url, data);
    setReloadData(res);
  };

  return (
    <>
      <Modal
        title="Edit Client"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
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
          <div className="flex gap-x-5 w-full">
            <Form.Item
              label="Client Address"
              name="clientAddress"
              className="w-full"
            >
              <Input className="rounded" />
            </Form.Item>

            <Form.Item label="Acquire Date" name="createdAt" className="w-full">
              <DatePicker placeholder="" className="w-full" />
            </Form.Item>
          </div>
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
      </Modal>
    </>
  );
}
