import { postAxios } from "@/functions/ApiCalls";
import { Form, Input, Select, Drawer, DatePicker } from "antd";
import moment from "moment";
import FormButtons from "../ANTD/FormButtons";
import DrawerANTD from "../ANTD/DrawerANTD";
import ClientForm from "./ClientForm";

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
    let res = await postAxios(url, data, true, true, setReloadData);
    setReloadData(res);
  };

  return (
    <DrawerANTD
      title={"Create New Client"}
      onClose={handleCancel}
      open={isModalOpen}
      children={
        <ClientForm
          form={form}
          onFinish={onFinish}
        />
      }
    />
  );
}
