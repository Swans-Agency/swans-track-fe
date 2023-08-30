import React, { useState } from "react";
import { format } from "date-fns";
import { useRouter } from "next/router";
import moment from "moment";
import { postAxios } from "@/functions/ApiCalls";
import CreateJoinEvent from "./CreateJoinEvent";
import ModalANTD from "../ANTD/ModalANTD";
import { Form } from "antd";

export default function DayHeader({ date, isConnected }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = async (values) => {
    values.startTime =
      moment(date).format("YYYY-MM-DD") +
      moment(values.startTime).format("[T]HH:mm:ss");
    values.endTime =
      moment(date).format("YYYY-MM-DD") +
      moment(values.endTime).format("[T]HH:mm:ss");
    values.recurrenceTo = moment(values.recurrenceTo).format(
      "YYYY-MM-DD[T]HH:mm:ss"
    );
    let url = `${process.env.DIGITALOCEAN}/tasks/create-event/`;
    let res = await postAxios(url, values, true, true, () => {});
    router.reload();
  };

  return (
    <>
      <div
        onClick={showModal}
        className="sticky top-0 left-0 w-full hover:cursor-pointer"
      >
        {format(new Date(), "dd/MM/yyyy") ==
        format(new Date(date), "dd/MM/yyyy") ? (
          <div className="sticky top-0 left-0 w-full bg-gray-100">
            <p className="text-blue-500 font-bold pt-1">{format(date, "dd")}</p>
            {/* <p className="text-black text-xs font-light">
              {format(date, "EEE")}
            </p> */}
          </div>
        ) : (
          <div className=" bg-gray-100">
            <p className="text-black pt-1">{format(date, "dd")}</p>
            {/* <p className="text-black text-xs font-light">
              {format(date, "EEE")}
            </p> */}
          </div>
        )}
      </div>
      <ModalANTD
        title={
          isConnected?.details
            ? `Create event on ${moment(date).format("ddd")} ${format(
                date,
                "MMM dd, yyyy "
              )}`
            : ""
        }
        footer={null}
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        renderComponent={
          <CreateJoinEvent
            isConnected={isConnected}
            form={form}
            onFinish={onFinish}
          />
        }
      />
    </>
  );
}
