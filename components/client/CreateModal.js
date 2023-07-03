import { postAxios } from "@/functions/ApiCalls";
import { Form, Input, Select, Drawer, DatePicker } from "antd";
import moment from "moment";

export default function CreateModal({
  isModalOpen,
  setIsModalOpen,
  setReloadData,
}) {
  const [form] = Form.useForm();

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = async (data) => {
    console.log(data);
    data["createdAt"] = moment(new Date(data["createdAt"])).format(
      "YYYY-MM-DD"
    );
    const url = `${process.env.DIGITALOCEAN}/client/get-clients/`;
    let res = await postAxios(url, data);
    setReloadData(res);
  };

  return (
    <>
      <Drawer
        width="600"
        placement="right"
        title="Create New Client"
        onClose={handleCancel}
        open={isModalOpen}
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
      </Drawer>
    </>
  );
}
