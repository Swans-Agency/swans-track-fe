import React, { useEffect, useState } from "react";
import { Form, Input, Select } from "antd";
import FormButtons from "../ANTD/FormButtons";
import { postAxios } from "@/functions/ApiCalls";
import { useRouter } from "next/router";
import dayjs from "dayjs";

export default function CalendlyForm({ data, selectedDay, companyId }) {
  const [options, setOptions] = useState([]);
  const router = useRouter();

  const onFinish = async (values) => {

    const Data = 
      {...values,
        appointmentDate:dayjs(selectedDay).format("YYYY-MM-DD")}
      console.log(Data);

    let url = `${process.env.DIGITALOCEAN}/calendy/sched/public/book/${companyId}/`;
    let res = await postAxios(url, Data, true, true, () => {});
    router.reload();
  };

  const getOptions = async () => {
    let res = await postAxios(
      `${process.env.DIGITALOCEAN}/calendy/sched/public/${companyId}/`,
      { day: selectedDay },
      false,
      false,
      () => {}
    );
    let arr = [];
    res?.map((item) => {
      return arr.push({
        label: `${item?.fromHour.replace(".", ":")} - ${item?.toHour.replace(
          ".",
          ":"
        )}`,
        value: item?.id,
      });
    });
    setOptions(arr);
  };

  useEffect(() => {
    if (companyId) {
      getOptions();
    }
  }, [selectedDay]);

  return (
    <section>
      <h1 className="font-semibold pb-10 text-start -tracking-tighter">
        Book your {data?.duration * 100} min appointment
      </h1>
      <Form
        onFinish={onFinish}
        layout="vertical"
        style={{
          alignContent: "center",
          maxWidth: 600,
        }}
        requiredMark={true}
      >
        <div className="flex gap-x-5 w-full mt-0">
          <Form.Item
            label="First name"
            name="firstName"
            className="w-full"
            required
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input className="rounded w-full" size="large" />
          </Form.Item>
          <Form.Item label="Last name" name="lastName" className="w-full">
            <Input className="rounded w-full" size="large" />
          </Form.Item>
        </div>

        <Form.Item
          label="Email"
          rules={[
            {
              required: true,
            },
            { type: "email" },
          ]}
          name="email"
          className="w-full"
        >
          <Input className="rounded w-full" size="large" />
        </Form.Item>

        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          name="summary"
          label="Appointment Summary"
        >
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item
          name="id"
          label="Time Range"
          rules={[{ required: true, message: "Province is required" }]}
        >
          <Select
            placeholder="Select province"
            size="large"
            options={options}
          />
        </Form.Item>

        <div className="w-full">
          <Form.Item>
            <FormButtons
              classNames={"w-full py-[0.5rem]"}
              content="Book Appointment"
            />
          </Form.Item>
        </div>
      </Form>
    </section>
  );
}
