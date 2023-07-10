import { postAxios } from "@/functions/ApiCalls";
import { Form } from "antd";
import DrawerANTD from "../ANTD/DrawerANTD";
import CreateForm from "./CreateForm";

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
    ;
    const url = `${process.env.DIGITALOCEAN}/account/signup/`;
    await postAxios(url, data, true, true);
    setReloadData({ data: "dataq" });
  };

  return (
    <>
      <DrawerANTD
        title="Create New Team Member"
        open={isModalOpen}
        onOk={handleOk}
        onClose={handleCancel}
        children={<CreateForm form={form} onFinish={onFinish} />}
      />
    </>
  );
}
